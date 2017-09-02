'use strict';

module.exports = function(req, res, next){
  res.append('Access-Controll-Allow-Origin','*');
  res.append('Access-Controll-Allow-Headers','*');
  next();
};
