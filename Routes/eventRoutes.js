import express from 'express';
import SaveEvent from '../Controllers/eventController.js';

export const events = express.Router();


events.post('/', SaveEvent);

export default events;