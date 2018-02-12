/**
 * Created by harshmeet on 4/7/17.
 */
var mongoose=require('mongoose')
var Schema = mongoose.Schema;
var connection = null;
var model = null;
var credentials = require("./credentials.js");

// var dbUrl = 'mongodb://' + credentials.host + ':27017/' + credentials.database;
var dbUrl = 'mongodb://'+ credentials.username+ credentials.password+credentials.host + credentials.database;

mongoose.Promise = global.Promise;

var docSpeciality=new Schema({

    speciality_id:String,
    speciality_Name:String



});
module.exports = {
    getModel: function getModel() {
        if (connection == null) {
            // console.log("Creating connection and model...");
            connection = mongoose.createConnection(dbUrl);
            model = connection.model("specialitySchema",
                docSpeciality);
        }
        return model;
    }
};
