"use strict";

var Twitter = require("node-twitter-api");
var accessToken = "1097843203-GCw9YRSNvtQQzetFm0ZKNtYZTxmBwTVBbxcfvo8";
var accessSecret = "xxsonUnPMT5myAvRwKNsBrdtFBVULcxt2db5dRYSzojtL";
var twitter = new Twitter({
    consumerKey: "5ONlZ1ETeodDPpdawDLa3o7yO",
    consumerSecret: "1VRjUoF6vCZoviVSK1zQKW38sEL4YKdPUOuGobytcZTUS2fwlU",
    callback: "https://me-twitter.herokuapp.com/access-token"
});
twitter.search({q:"#meList"},accessToken,accessSecret,function(err,data,resp){
  console.log(data);
});
