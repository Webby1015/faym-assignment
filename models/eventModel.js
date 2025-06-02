import mongoose from "mongoose";


const viewPayloadSchema = new mongoose.Schema({
  url: { type: String, required: [true, "URL is required for view event"] },
  title: { type: String },
}, { _id: false });

const clickPayloadSchema = new mongoose.Schema({
  element_id: { type: String },
  text: { type: String },
  xpath: { type: String },
}, { _id: false });

const locationPayloadSchema = new mongoose.Schema({
  latitude: { type: Number, required: [true, "Latitude is required for location event"] },
  longitude: { type: Number, required: [true, "Longitude is required for location event"] },
  accuracy: { type: Number },
}, { _id: false });


const baseEventSchema = new mongoose.Schema(
  {
    event_id: { type: String, unique: true, required: [true, "Event ID is required"] },
    timestamp: { type: Date, required: [true, "Timestamp is required"] },
    user_id: { type: String, required: [true, "User ID is required"] },
    event_type: { type: String, required: [true, "Event type is required"] },
  },
  {
    discriminatorKey: "event_type",
    collection: "events",
    versionKey: false,
  }
);


const Event = mongoose.model("Event", baseEventSchema);


const ViewEvent = Event.discriminator(
  "view",
  new mongoose.Schema({
    payload: {
      type: viewPayloadSchema,
      required: [true, "Payload is required for view event"]
    }
  })
);

const ClickEvent = Event.discriminator(
  "click",
  new mongoose.Schema({
    payload: {
      type: clickPayloadSchema,
      required: [true, "Payload is required for click event"]
    }
  })
);

const LocationEvent = Event.discriminator(
  "location",
  new mongoose.Schema({
    payload: {
      type: locationPayloadSchema,
      required: [true, "Payload is required for location event"]
    }
  })
);

export { Event, ViewEvent, ClickEvent, LocationEvent };
