import express from 'express';
import dotenv from 'dotenv';
import events from './Routes/eventRoutes.js';
import analytics from './Routes/analyticsRoutes.js';
import errorHander from './middleware/errorhandler.js';
import connectDB from './Config/dbConnection.js';
dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/events', events);
app.use('/analytics', analytics);
app.use(errorHander);


app.get('/', (req, res) => {
  res.json({message: 'Server is working!'});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

