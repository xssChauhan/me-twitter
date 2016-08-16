"use strict";

require("./lib/globals");

var express = require("express"),
	controllers = include("controllers");

var app = express();

controllers(app);

app.listen(3000,function(){
	console.log("Listening on 8000");
})