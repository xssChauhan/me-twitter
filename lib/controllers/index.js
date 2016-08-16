"use strict";

var _ = require('lodash');

module.exports = function(app){
	_.each([
		"request-token",
		"access-token"
	],function(controller){
		require("./sign-in/" + controller)(app);
	});
	_.each(["meList"],function(controller){
		require('./search/' + controller)(app);
	})
};