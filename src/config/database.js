const mongoose = require('mongoose');
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB=async()=>{
  await mongoose.connect(
    "mongodb+srv://chauhanshivi887_db_user:II1FFNitQMdTVLGj@cluster0.a6cqlrx.mongodb.net/devTinder"
 )
}
module.exports=connectDB;
