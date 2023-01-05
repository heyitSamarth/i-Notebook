const mongoose = require('mongoose')
// const mongoURI="mongodb://localhost:27017/inotebook"
const mongoURI="mongodb+srv://Heyitsamarth:Password1@inotebook.5garq7c.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo=()=>{
    // mongoose.connect(mongoURI,()=>
    // {
    //     console.log("connected to mongo succesfull")
    // })
    mongoose.connect(
        mongoURI,
        // options,
        (err) => {
         if(err) console.log(err) 
         else console.log("connected to mongo succesfull");
        }
      );
}

module.exports=connectToMongo;