import express from 'express';
import { TotalEventCounts,  EventCountsByType } from '../Controllers/analyticsController.js';

export const analytics = express.Router();

analytics.get('/event-counts', TotalEventCounts);
analytics.get('/event-counts-by-type', EventCountsByType);


export default analytics;