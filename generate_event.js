import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { ViewEvent, ClickEvent, LocationEvent } from "./models/eventModel.js";

dotenv.config();

const NUM_EVENTS = 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

const generateRandomEvent = () => {
  const event_type = faker.helpers.arrayElement(["view", "click", "location"]);
  const event_id = uuidv4();
  const timestamp = faker.date.recent({ days: 14 });
  const user_id = faker.string.alphanumeric(8);

  let payload;

  switch (event_type) {
    case "view":
      payload = {
        url: faker.internet.url(),
        title: faker.lorem.words(3),
      };
      return new ViewEvent({ event_id, timestamp, user_id, event_type, payload });

    case "click":
      payload = {
        element_id: faker.string.alpha(6),
        text: faker.lorem.word(),
        xpath: `/html/body/div[${faker.number.int({ min: 1, max: 10 })}]`,
      };
      return new ClickEvent({ event_id, timestamp, user_id, event_type, payload });

    case "location":
      payload = {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        accuracy: faker.number.float({ min: 1, max: 100 }),
      };
      return new LocationEvent({ event_id, timestamp, user_id, event_type, payload });
  }
};

const seedEvents = async () => {
  await connectDB();
  await mongoose.connection.db.collection("events").deleteMany({});
  console.log("Old events deleted.");

  const events = [];

  for (let i = 0; i < NUM_EVENTS; i++) {
    events.push(generateRandomEvent());
  }

  try {
    await Promise.all(events.map(event => event.save()));
    console.log(`${NUM_EVENTS} events seeded successfully`);
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedEvents();
