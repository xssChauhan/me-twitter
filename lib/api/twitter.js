"use strict";

var Twitter = require("node-twitter-api"),
	Promise = require("bluebird"),
	secret = include("secret"),
	lodash = require("lodash");

module.exports = new function(){
	console.log("From main function",this);
	this._twitter = new Twitter(secret.twitter);

	this.requestToken = function(){
		return new Promise(function(resolve,reject){
			this._twitter.getRequestToken(function(err,requestToken,requestSecret){
				console.log("From twitter lib",this);
				if(err){
					reject(err);
				}else{
					this._requestToken = requestToken;
					this._requestSecret = requestSecret;
					resolve(requestToken);
				}
			}.bind(this)); //binding this here allows me to store the variables in the Object
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
			}.bind(this));
		}.bind(this));
	};

	this.verifyCredentials = function(accessToken){
		var accessSecret = this._accessSecret;

		return new Promise(function(resolve,reject){
			this._twitter.verifyCredentials(accessToken,accessSecret,function(err,user){
				if(err) reject(err);
				else{
					var data = {
						user : user,
						accessToken : accessToken,
						accessSecret : accessSecret
					};
					resolve(data);
				}
			})
		}.bind(this));
	};

	this.search = function(params,accessToken,accessSecret){
		return new Promise(function(resolve,reject){
			this._twitter.search(params,accessToken,accessSecret,function(err,data,response){
				if(err){
					reject(err);
				}else{
					resolve(data);
				}
			}.bind(this));
		}.bind(this));
	};

	this.getTweet = function(params,accessToken,accessSecret){
		return new Promise(function(resolve,reject){
			this._twitter.statuses("show",params,accessToken,accessSecret,function(err,data,response){
				if(err){
					reject(err);
				}else{
					console.log("From Get tweet",data.user);
					resolve(data);
				}
			}.bind(this));
		}.bind(this));
	};

	this.embedTweet = function(params,accessToken,accessSecret){
		return new Promise(function(resolve,reject){
			this._twitter.statuses("oembed",params,accessToken,accessSecret,function(err,data,response){
				if(err){
					reject(err)
				}else{
					resolve(data)
				}
			}.bind(this));
		}.bind(this));
	};

  this.timeLine = function(params,accessToken,accessSecret){
    return new Promise(function(resolve,reject){
      this._twitter.getTimeline("user_timeline",params,accessToken,accessSecret,(err,data,response) => {
        if(err){
          reject(err)
        }else{
          resolve(data)
        }
      });
    }.bind(this));
  }
}
