"use strict";

var Twitter = require("node-twitter-api"),
	Promise = require("bluebird");
var config = {
	consumerKey : "5ONlZ1ETeodDPpdawDLa3o7yO",
	consumerSecret : "1VRjUoF6vCZoviVSK1zQKW38sEL4YKdPUOuGobytcZTUS2fwlU",
	// accessToken : "1097843203-GCw9YRSNvtQQzetFm0ZKNtYZTxmBwTVBbxcfvo8",
	// accessSecret : " xxsonUnPMT5myAvRwKNsBrdtFBVULcxt2db5dRYSzojtL"
};

module.exports = new function(){
	this._twitter = new Twitter(config);

	this.requestToken = function(){
		return new Promise(function(resolve,reject){
			this._twitter.getRequestToken(function(err,requestToken,requestSecret){
				console.log(resolve.name);
				console.log(reject.name);
				if(err){
					reject(err);
				}else{
					this._requestToken = requestToken;
					this._requestSecret = requestSecret;
					resolve(requestToken);
				}
			}.bind(this));
		}.bind(this));
	};
	this.accessToken = function(token,verifier){
		var secret = this._requestSecret;
		this._verifier = verifier;

		return new Promise(function(resolve,reject){

			this._twitter.getAccessToken(token,secret,verifier,function(err,accessToken,accessSecret){
				if(err){
					reject(err);
				}else{
					this._accessToken = accessToken;
					this._accessSecret = accessSecret;
					resolve(accessToken);
				}
			})
		}.bind(this));
	};

	this.verifyCredentials = function(accessToken){
		var accessSecret = this._accessSecret;

		return new Promise(function(resolve,reject){
			this._twitter.verifyCredentials(accessToken,accessSecret,function(err,user){
				if(err) reject(err);
				else resolve(user);
			})
		}.bind(this));
	};

	this.search = function(type,params,accessToken,accessSecret){
		return new Promise(function(resolve,reject){
			this._twitter.search(type,params,accessToken,accessSecret,function(err,data,response){
				if(err){
					reject(err);
				}else{
					resolve(data);
				}
			}.bind(this));
		}.bind(this));
	}
}