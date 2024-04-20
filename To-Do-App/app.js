const express = require('express');
const mongoose = require("mongoose");

const app = express();
port = 3000;
mongoose.connect('mongodb://localhost:27017/Todo',{

}).then(()=>{
    console.log('database created')
}).catch(()=>{
    console.log(err="database not created",err)
})

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.use(require("./routes/index"))
app.use(require("./routes/todo"))
app.use(require("./models/Todo"))





app.listen(port,()=>{
    console.log(`sever listen on port http://localhost:${port}`)
})