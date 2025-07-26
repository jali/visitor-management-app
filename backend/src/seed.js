require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const Visit = require('./models/visit');
const { v4: uuidv4 } = require('uuid');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Visit.deleteMany({});

    // Seed users
    await User.create({
      username: 'admin1',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Inserted admin user: admin1');

    await User.create({
      username: 'security1',
      password: 'security123',
      role: 'security',
    });
    console.log('Inserted security user: security1');

    const resident = await User.create({
      username: 'resident1',
      password: 'resident123',
      role: 'resident',
      flatNumber: '101',
      buildingNumber: 'A',
    });
    console.log('Inserted resident user: resident1');

    // Seed a visit for resident
    await Visit.create({
      residentId: resident._id,
      visitorName: 'John Doe',
      visitTime: new Date(),
      visitDuration: 2,
      flatNumber: '101',
      buildingNumber: 'A',
      carDetails: 'Blue Sedan, XYZ-1234',
      visitId: uuidv4(),
    });
    console.log('Inserted test visit');

    console.log('Test data seeded');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
