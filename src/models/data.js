const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({

    name:{
        type: String    
    },
    address:{
        type:String
    }
 
})

const Data = mongoose.model('Data', dataSchema)


module.exports = Data

