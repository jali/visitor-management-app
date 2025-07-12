const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

// Connect to database
db = connectDB();

db.admins.drop();
db.residents.drop();

const users = [
  { username: 'admin1', password: 'admin123', role: 'admin', collection: 'admins' },
  { username: 'resident1', password: 'resident123', flatNumber: '101', buildingNumber: 'A', role: 'resident', collection: 'residents' },
];

users.forEach((user) => {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const userDoc = {
    username: user.username,
    password: hashedPassword,
  };
  if (user.role === 'resident') {
    userDoc.flatNumber = user.flatNumber;
    userDoc.buildingNumber = user.buildingNumber;
  }
  db[user.collection].insertOne(userDoc);
  print(`Inserted ${user.role} user: ${user.username} into ${user.collection}`);
});