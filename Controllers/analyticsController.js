import expressAsyncHandler from "express-async-handler";
import { Event } from "../models/eventModel.js";

export const TotalEventCounts =expressAsyncHandler(async (req, res) => {
  const { event_type, start_date, end_date } = req.query;

  const query = {};

  if (event_type) {
    query.event_type = event_type;
  }

  if (start_date || end_date) {
    query.timestamp = {};
    if (start_date) {
      query.timestamp.$gte = new Date(start_date);
    }
    if (end_date) {
      query.timestamp.$lte = new Date(end_date);
    }
  }

  const count = await Event.countDocuments(query);
  res.status(200).json({ count });
});

export const EventCountsByType = expressAsyncHandler(async (req, res) => {
  const { start_date, end_date } = req.query;

  const matchStage = {};

  if (start_date || end_date) {
    matchStage.timestamp = {};
    if (start_date) {
      matchStage.timestamp.$gte = new Date(start_date);
    }
    if (end_date) {
      matchStage.timestamp.$lte = new Date(end_date);
    }
  }

  const pipeline = [];

  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  pipeline.push({
    $group: {
      _id: "$event_type",
      count: { $sum: 1 },
    },
  });

  const eventCounts = await Event.aggregate(pipeline);

  const countsByType = {};
  eventCounts.forEach(item => {
    countsByType[item._id] = item.count;
  });

  res.json(countsByType);
});
