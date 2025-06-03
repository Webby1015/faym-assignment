## Setup Instructions

To get started, follow these steps:

1. **Clone the repository:**

```bash
    git clone "https://github.com/Webby1015/faym-assignment.git"
```

2. **Install dependencies:**

```bash
    npm i
```
3. **Set Up Your `.env` file:**

Make a `.env` in the root directory of your project and add the following varibales with valid data.

```
PORT = 5001
MONGO_URI = "mongodb+srv://<username>:<password>@<clusterName>.r653d9x.mongodb.net/?retryWrites=true&w=majority&appName=<clustername>"
```

4. **Run the server:**

**_Development mode (with nodemon):_**

```bash
    npm run dev
```

**_Regular mode:_**

```bash
    npm start
```

5. **Populate the database (optional):**

```bash
    npm run seed
```

6. **Visit http://localhost:5001/ for test frontend page**


***<h5>The test frontend page will be running at the Same POST as Backend server.</h5>***

## API Endpoints

`POST /events`
`GET /analytics/event-counts`
`GET /analytics/event-counts-by-type`

### POST Events

`POST /events`

**Example Request Body (for a 'view' event):**

```json
{
  "event_id": "unique-view-id-123",
  "timestamp": "2023-01-01T12:00:00Z",
  "user_id": "user-abc",
  "event_type": "view",
  "payload": {
    "url": "https://example.com/page1",
    "title": "Example Page One"
  }
}
```

**Example Request Body (for a 'click' event):**

```json
{
  "event_id": "unique-click-id-456",
  "timestamp": "2023-01-01T12:05:00Z",
  "user_id": "user-abc",
  "event_type": "click",
  "payload": {
    "element_id": "button-submit",
    "text": "Submit Form",
    "xpath": "/html/body/div/button"
  }
}
```

**Example Request Body (for a 'location' event):**

```json
{
  "event_id": "unique-location-id-789",
  "timestamp": "2023-01-01T12:10:00Z",
  "user_id": "user-def",
  "event_type": "location",
  "payload": {
    "latitude": 34.052235,
    "longitude": -118.243683,
    "accuracy": 10
  }
}
```

**Example Response:**

```json
{
  "status": "Accepted"
}
```

### Get Event Counts

#### Query Parameters:

**event_type (optional): "view", "click", or "location**
**start_date (optional): ISO 8601 formatted start date (e.g., 2025-05-27)**
**end_date (optional): ISO 8601 formatted end date (e.g., 2025-06-01)**

`GET /analytics/event-counts`

**Example Response:**

```json
{
  "total_events": 5000
}
```

`GET /analytics/event-counts?event_type=view`

**Example Response:**

```json
{
  "count": 1667
}
```

`GET /analytics/event-counts?start_date=2025-05-28`

**Example Response:**

```json
{
  "count": 1860
}
```

`GET /analytics/event-counts?start_date=2025-05-28&end_date=2025-06-01`

**Example Response:**

```json
{
  "count": 1660
}
```

### Get Event Count by Type

#### Query Parameters:

**start_date (optional): ISO 8601 formatted start date (e.g., 2025-05-27)**
**end_date (optional): ISO 8601 formatted end date (e.g., 2025-06-01)**

`GET /analytics/event-count?by=type`

**Example Response:**

```json
{
  "view": 1640,
  "click": 1704,
  "location": 1656
}
```

`GET /analytics/event-type-counts?start_date=2025-05-28`

**Example Response:**

```json
{
  "view": 615,
  "click": 622,
  "location": 597
}
```

`GET /analytics/event-type-counts?start_date=2025-05-28&end_date=2025-06-02`

**Example Response:**

```json
{
  "view": 615,
  "click": 622,
  "location": 597
}
```

## Database Schema

### The database stores events with the following structure:

```json
{
  "events": [
    {
      "event_id": {
        "type": "String",
        "unique": true,
        "required": true
      },
      "timestamp": {
        "type": "Date",
        "required": true
      },
      "user_id": {
        "type": "String",
        "required": true
      },
      "event_type": {
        "type": "String",
        "required": true,
        "enum": ["view", "click", "location"]
      },
      "payload": {
        "type": "Object",
        "required": true,
        "oneOf": [
          {
            "if": { "properties": { "event_type": { "const": "view" } } },
            "then": {
              "properties": {
                "url": { "type": "String", "required": true },
                "title": { "type": "String" }
              },
              "required": ["url"]
            }
          },
          {
            "if": { "properties": { "event_type": { "const": "click" } } },
            "then": {
              "properties": {
                "element_id": { "type": "String" },
                "text": { "type": "String" },
                "xpath": { "type": "String" }
              }
            }
          },
          {
            "if": { "properties": { "event_type": { "const": "location" } } },
            "then": {
              "properties": {
                "latitude": { "type": "Number", "required": true },
                "longitude": { "type": "Number", "required": true },
                "accuracy": { "type": "Number" }
              },
              "required": ["latitude", "longitude"]
            }
          }
        ]
      }
    }
  ]
}
```

## Error Responses

### The API can return the following error structures:

```json
{
  "title": "Bad Request",
  "message": "Error message here",
  "stack": null
}
```

```json
{
  "title": "Unauthorized",
  "message": "Error message here",
  "stack": null
}
```

```json
{
  "title": "Forbidden",
  "message": "Error message here",
  "stack": null
}
```

```json
{
  "title": "Not Found",
  "message": "Error message here",
  "stack": null
}
```

```json
{
  "title": "Server Error",
  "message": "Error message here",
  "stack": null
}
```

```json
{
  "title": "Error",
  "message": "Error message here",
  "stack": null
}
```
