require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

// Connect to database
connectDB();

const users = [
  { username: 'admin1', password: 'admin123', role: 'admin', collection: 'admins' },
  { username: 'resident1', password: 'resident123', flatNumber: '101', buildingNumber: 'A', role: 'resident', collection: 'residents' },
];

users.forEach(async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userDoc = {
      username: user.username,
      password: hashedPassword,
    };
    if (user.role === 'resident') {
      userDoc.flatNumber = user.flatNumber;
      userDoc.buildingNumber = user.buildingNumber;
    }
    await mongoose.connection.db.collection(user.collection).insertOne(userDoc);
    console.log(`Inserted ${user.role} user: ${user.username} into ${user.collection}`);
  } catch (err) {
    console.error(`Error inserting ${user.username}:`, err);
  }
});

// Close connection after seeding
setTimeout(() => {
  mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
}, 1000);


// const connectDB = require('./config/db');
// const bcrypt = require('bcryptjs');

// // Connect to database
// db = connectDB();

// db.admins.drop();
// db.residents.drop();

// const users = [
//   { username: 'admin1', password: 'admin123', role: 'admin', collection: 'admins' },
//   { username: 'resident1', password: 'resident123', flatNumber: '101', buildingNumber: 'A', role: 'resident', collection: 'residents' },
// ];

// users.forEach((user) => {
//   const hashedPassword = bcrypt.hashSync(user.password, 10);
//   const userDoc = {
//     username: user.username,
//     password: hashedPassword,
//   };
//   if (user.role === 'resident') {
//     userDoc.flatNumber = user.flatNumber;
//     userDoc.buildingNumber = user.buildingNumber;
//   }
//   db[user.collection].insertOne(userDoc);
//   print(`Inserted ${user.role} user: ${user.username} into ${user.collection}`);
// });

// db = db.getSiblingDB('residentdb');
// db.createCollection('admins');
// db.createCollection('residents');
// db.createCollection('visits');
// print('MongoDB initialized');