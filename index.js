"use strict";

require("./lib/globals");

var express = require("express"),
	controllers = include("controllers");

var app = express();
var path = require("path");

controllers(app);

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+"/index.html"));
});
app.listen(process.env.PORT || 3000,function(){
	console.log("Listening on " + process.env.port);
});