import expressAsyncHandler from "express-async-handler";
import { Event } from "../models/eventModel.js";

export const TotalEventCounts = expressAsyncHandler(async (req, res) => {

  const totalCount = await Event.countDocuments();
  if (totalCount === null) {
    return res.status(404).json({ message: "No events found" });
  }

  res.json({ total_events: totalCount });
});

export const EventCountsByType = expressAsyncHandler(async (req, res) => {
  const eventCounts = await Event.aggregate([
    {
      $group: {
        _id: "$event_type",
        count: { $sum: 1 },
      },
    },
  ]);

  const countsByType = {};
  eventCounts.forEach(item => {
    countsByType[item._id] = item.count;
  });

  res.json(countsByType);
});
