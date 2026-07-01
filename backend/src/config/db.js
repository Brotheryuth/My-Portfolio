const mongoose = require('mongoose');
const connectionDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo conenction successfully ${conn.connection.port}`);
    }catch(e){
        console.error(`Connection failed ${e.getMessage}`);
        process.exit(1); // shut down the server 
    }
}
module.export= connectionDB;