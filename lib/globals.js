"use strict";

global.include = function(location){
	return require(__dirname + "/" + location);
};

global.userData = [];
global.sortData = [
  {a:1,b:2},
  {a:2,b:3},
  {a:3,b:4}
]
