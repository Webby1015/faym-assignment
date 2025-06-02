import expressAsyncHandler from "express-async-handler";
import { ViewEvent, ClickEvent, LocationEvent } from "../models/eventModel.js";
import { v4 as uuidv4 } from "uuid";

export const SaveEvent = expressAsyncHandler(async (req, res) => {
  const { user_id, event_type, payload } = req.body;

  if (!user_id || !event_type || !payload) {
    res.status(400);
    throw new Error("user_id, event_type, and payload are required fields");
  }

  // Helper function to create an event instance based on event_type
  const createEventInstance = (event_id, timestampToUse) => {
    const commonData = {
      event_id,
      timestamp: timestampToUse, // Use the determined timestamp
      user_id,
      event_type,
      payload,
    };

    switch (event_type) {
      case "view":
        return new ViewEvent(commonData);
      case "click":
        return new ClickEvent(commonData);
      case "location":
        return new LocationEvent(commonData);
      default:
        throw new Error(
          `Invalid event_type: ${event_type}. Must be one of 'view', 'click', 'location'`
        );
    }
  };

  let savedEvent;
  const maxRetries = 5;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const event_id = uuidv4();

    // Determine the timestamp to use:
    // If payload contains a timestamp, use it (and convert to Date object if necessary).
    // Otherwise, create a new Date object.
    const effectiveTimestamp = payload.timestamp
      ? new Date(payload.timestamp)
      : new Date();

    const event = createEventInstance(event_id, effectiveTimestamp); // Pass the effective timestamp

    try {
      savedEvent = await event.save();
      break; // Exit loop on successful save
    } catch (error) {
      if (error.code === 11000 && error.keyPattern?.event_id) {
        // Handle duplicate event_id error
        if (attempt === maxRetries - 1) {
          res.status(409);
          throw new Error("Duplicate event_id after multiple attempts. Try again later.");
        }
        // If not the last attempt, continue to retry with a new UUID
      } else {
        // Handle other saving errors
        res.status(500);
        throw new Error("Failed to save event: " + error.message);
      }
    }
  }

  res.status(202).json({
    message: "Accepted",
  });
});

export default SaveEvent;
