"use strict";

var twitter = include("api/twitter");

module.exports = function(app){
	app.get('/meList',function(req,res){
		twitter.search({
			q : "#meList"
		},accessToken,accessSecret
	).then(function(data){
		res.send(data);
	}).catch(function(){
		res.status(500).send(err);
	});
});
};
