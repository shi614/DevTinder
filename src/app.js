const express = require('express');
const app = express();

// app.use((req, res)=>{
//     res.send("Hello from server");
// });

app.get("/user/:userId",(req,res)=>{
    // console.log(req.query);
    console.log(req.params);
    res.send({"firstName":"John","lastName":"Doe"})
})
// app.post("/user",(req,res)=>{
//     res.send("saved user");
// });
// app.delete("/user",(req,res)=>{
//     res.send("deleted user");
// });


// app.get("/ab+c",(req,res)=>{
//     res.send({"firstName":"John","lastName":"Doe"})
// })

// app.use("/hello",(req,res)=>{
//     res.send("Hello from hello route");
// });

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});