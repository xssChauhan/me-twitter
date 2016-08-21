"use strict";

require("./lib/globals");

var express = require("express"),
    controllers = include("controllers"),
    app = express(),
    Promise = require("bluebird"),
    cookieParser = require("cookie-parser"),
    path = require("path"),
    disk = include("api/disk"),
    me = include("api/_meList"),
    _ = require("lodash");

app.use(cookieParser());

controllers(app);

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+"/index.html"));
});

app.get("/files",function(req,res){
	disk.loadUsers().then((a) => {
		res.send(userData);
	});
});

app.get('/cookies',(req,res) => {
  res.send(req.cookies);
});

app.get("/users",(req,res) =>{
    disk.loadUsers().then((a) => {
      res.send(a);
    })
});

app.get("/test",(req,res) => {
  disk.loadUsers(true).then((a)=>{
    Promise.map(a,(e,i,l) => {
        return me.getSearchData(e);
    }).map((a) => {
        return _.set(a,"signed","xss");
    }).then((a) => {
      res.send(a);
    });
  });
});

app.get("/:user",(req,res) => {
  console.log("Users");
  let user = req.params.user;
  disk.loadUser(user).then((a) => {
    res.send(a);
  })
});


app.listen(process.env.PORT || 3000,function(){
	console.log("Listening on " + process.env.port);
});
