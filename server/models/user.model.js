const {Schema, pluralize, model} = require('mongoose');
const bcrypt = require('bcrypt')
pluralize(null);


const userSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  access_token: {
    type: String
  }
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 7);
  next();
})

const User = model('user', userSchema);

module.exports = User;

