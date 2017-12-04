"use strict";
var Sequelize = require('sequelize');
var config = require('../config').database;
var fs = require("fs");
var path = require("path");
var ampDb = new Sequelize(
    config.name,
    config.username,
    config.password,
    config.options
);
var db = {};

fs.readdirSync(__dirname)
    .filter(function(file) {
      console.log(file)
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model;
        var model = ampDb["import"](path.join(__dirname, file));
        db[model.name] = model;
        db[model.name].sync({ force: false });
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

ampDb
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully to AMP Database.');
    })
    .catch(function(err) {
        console.log('Unable to connect to AMP Database:', err);
    });

db.ampDb = ampDb;
db.Sequelize = Sequelize;

//db['Contact'].hasMany('contactNumbers', {foreignKey: 'id_contact', constraints: false})
module.exports = db;
