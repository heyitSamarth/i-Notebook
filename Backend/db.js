const mongoose = require('mongoose')
const mongoURI="mongodb://localhost:27017/inotebook"
// const mongoURI="mongodb+srv://Heyitsamarth:Password1@inotebook.5garq7c.mongodb.net/inotebook"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>
    {
        console.log("connected to mongo succesfull")
    })
}

module.exports=connectToMongo;