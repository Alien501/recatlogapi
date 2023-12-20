const mongoose = require('mongoose')
const { Schema } = mongoose

const uploadSchema = new Schema({
  title: {
    type: String,
    require: true
  }, 
  user: {
    type: String,
    require: true
  },
  link: {
    type: String,
    require: true
  },
  year: {
    type: String,
    require: true
  },
  sem: {
    type: String,
    require: true
  },  
  type: {
    type: String,
    require: true
  },
})

module.exports = mongoose.model('Upload', uploadSchema)

