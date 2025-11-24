const bcrypt = require('bcryptjs');

const password = 'admin123';
console.log('Hash untuk "' + password + '":');
console.log(bcrypt.hashSync(password, 10));