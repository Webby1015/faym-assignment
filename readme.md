# Analytics Event Tracker

This project provides a simple API for tracking and analyzing user events.

---

## Setup Instructions

To get started, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone "[https://github.com/Webby1015/faym-assignment.git](https://github.com/Webby1015/faym-assignment.git)"
    ```
2.  **Install dependencies:**
    ```bash
    npm i
    ```
3.  **Run the server:**
    * **Development mode (with nodemon):**
        ```bash
        npm run dev
        ```
    * **Regular mode:**
        ```bash
        npm start
        ```
4.  **Populate the database (optional):**
    ```bash
    npm run seed
    ```

---

## API Endpoints

### Get Total Event Count

`GET /analytics/event-count`

**Example Response:**

```json
{
  "total_events": 12345
}

```

### Get Event Count by Type

`GET /event-counts-by-type`

**Example Response:**

```json
{
  "view": 1640,
  "click": 1704,
  "location": 1656
}
```

### Submit Events

`POST /events`

**Example Response:**

```json
{
  "event_id": "unique-view-id-123",
  "timestamp": "2023-01-01T12:00:00Z",
  "user_id": "user-abc",
  "event_type": "view",
  "payload": {
    "url": "[https://example.com/page1](https://example.com/page1)",
    "title": "Example Page One"
  }
}
```

Example Request Body (for a 'click' event):
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

Example Request Body (for a 'location' event):
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

Example Request Body (for a 'view' event):
```json
{
  "event_id": "unique-view-id-123",
  "timestamp": "2023-01-01T12:00:00Z",
  "user_id": "user-abc",
  "event_type": "view",
  "payload": {
    "url": "[https://example.com/page1](https://example.com/page1)",
    "title": "Example Page One"
  }
}
```

Markdown

# Analytics Event Tracker

This project provides a simple API for tracking and analyzing user events.

---

## Setup Instructions

To get started, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone "[https://github.com/Webby1015/faym-assignment.git](https://github.com/Webby1015/faym-assignment.git)"
    ```
2.  **Install dependencies:**
    ```bash
    npm i
    ```
3.  **Run the server:**
    * **Development mode (with nodemon):**
        ```bash
        npm run dev
        ```
    * **Regular mode:**
        ```bash
        npm start
        ```
4.  **Populate the database (optional):**
    ```bash
    npm run seed
    ```

---

## API Endpoints

### Get Total Event Count

`GET /analytics/event-count`

**Example Response:**

```json
{
  "total_events": 12345
}
Get Event Count by Type
GET /analytics/event-count?by=type

Example Response:

JSON

{
  "view": 1640,
  "click": 1704,
  "location": 1656
}
Submit Events
POST /events

Example Request Body (for a 'view' event):

JSON

{
  "event_id": "unique-view-id-123",
  "timestamp": "2023-01-01T12:00:00Z",
  "user_id": "user-abc",
  "event_type": "view",
  "payload": {
    "url": "[https://example.com/page1](https://example.com/page1)",
    "title": "Example Page One"
  }
}
Example Request Body (for a 'click' event):

JSON

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
Example Request Body (for a 'location' event):

JSON

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

Example Success Response:
```json

{
  "status": "Accepted"
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


{
  "title": "Unauthorized",
  "message": "Error message here",
  "stack": null
}


{
  "title": "Forbidden",
  "message": "Error message here",
  "stack": null
}


{
  "title": "Not Found",
  "message": "Error message here",
  "stack": null
}


{
  "title": "Server Error",
  "message": "Error message here",
  "stack": null
}


{
  "title": "Error",
  "message": "Error message here",
  "stack": null
}

```