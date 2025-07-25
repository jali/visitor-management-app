const bcrypt = require('bcryptjs');

const passwords = ['resident123', 'admin123'];

passwords.forEach((password) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }
    console.log(`Password: ${password}`);
    console.log(`Hashed: ${hash}\n`);
  });
});
