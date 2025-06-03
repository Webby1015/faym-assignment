import express from 'express';
import dotenv from 'dotenv';
import events from './Routes/eventRoutes.js';
import analytics from './Routes/analyticsRoutes.js';
import errorHandler from './middleware/errorhandler.js';
import connectDB from './Config/dbConnection.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));


app.use(express.json());
app.use('/events', events);
app.use('/analytics', analytics);

app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});


app.use((req, res, next) => {
  res.status(404).json({ error: 'Undefined route' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
