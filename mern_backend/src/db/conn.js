const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ayuRegistration' , {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log(`Connection Successful`);
}).catch((e)=>{
    console.log(`no connection ${e}`);
})


