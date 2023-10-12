const mongoose = require('mongoose')
const uri = ""; //input your own MongoDB connection link

const models = {
  user: {
    'user': { 'type': String, 'required': true },
    'pwd': { 'type': String, 'required': true },
    'type': { 'type': String, 'required': true },
    'avatar': { 'type': String },
    "description": { 'type': String },
    'title': { 'type': String },
    'company': { 'type': String },
    'salary': { 'type': String }
  },
  chat: {
    'chatid': { 'type': String, 'required': true },
    'from': { 'type': String, 'required': true },
    'to': { 'type': String, 'required': true },
    'read': { 'type': Boolean, 'default': false },
    'content': { 'type': String, 'required': true, 'default': '' },
    'create_time': { 'type': Number, 'default': Date.now }
  }
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.error('connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m], { collection: m + "s" }))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}