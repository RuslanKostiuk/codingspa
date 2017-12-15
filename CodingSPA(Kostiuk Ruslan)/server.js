const express = require("express");
const app = express();
const db = require("mysql");
const bodyParser=require('body-parser');
const cors = require("cors");
const employee = require('./routes/employee');
const department = require('./routes/department');
var config = require("./config");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
global.connection = db.createConnection(config["connection"]);
app.use(cors());
  

connection.connect(function(err){
	if(err){
		console.log('error connection'+err.stack);
		return;
	}
	console.log('connection as id:'+connection.threadId)
});

app.get('/',(req, res) =>{
	res.sendFile(__dirname + '/public/index.html');
})

app.use("/employee",employee);
app.use("/department",department);

var port = process.env.PORT | config["port"];

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
