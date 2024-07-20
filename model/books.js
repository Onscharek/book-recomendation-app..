//  req mongoose
const mongoose = require('mongoose');
// scheme
const{Schema, model} =mongoose;
//  create a schema

const BooksSchema = new Schema({
    
    title: {type:String, require:true},
    author: {type:String, require:true},
    description: {type:String, require:true},
    image: {type:String, require:true},
    rate: Number,
 
    })
   
    // export
    module.exports = Books = model ("books",BooksSchema);