require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/admin');
const Resident = require('./models/resident');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await Admin.deleteMany({});
    await Resident.deleteMany({});

    // Map collection names to Mongoose models
    const collectionMap = {
      admins: Admin,
      residents: Resident,
    };

    // Seed admins and residents
    const users = [
      { username: 'admin1', password: 'admin123', role: 'admin', collection: 'admins' },
      { username: 'resident1', password: 'resident123', flatNumber: '101', buildingNumber: 'A', role: 'resident', collection: 'residents' },
    ];

    for (const user of users) {
      const userDoc = {
        username: user.username,
        password: user.password,
      };
      if (user.role === 'resident') {
        userDoc.flatNumber = user.flatNumber;
        userDoc.buildingNumber = user.buildingNumber;
      }
      await collectionMap[user.collection].create(userDoc);
      console.log(`Inserted ${user.role} user: ${user.username}`);
    }

    console.log('Test data seeded');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
