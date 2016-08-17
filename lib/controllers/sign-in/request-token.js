"use strict";

var twitter = include("api/twitter");

module.exports = function(app){
	app.get("/request-token",function(req,res){
		twitter.requestToken().then(function(requestToken){
			res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token="+requestToken);
		}).catch(function(err){
			res.status(500).send(err);
		})
	})
}