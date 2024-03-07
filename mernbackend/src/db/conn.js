const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/youtubeRegistration", {
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true,
}).then(()=>{
    console.log(`connection succesfull`);
}).catch((e)=>{
    console.log(e.message);
    console.log(`no connection`);
}); 