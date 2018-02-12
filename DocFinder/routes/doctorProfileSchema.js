/**
 * Created by harshmeet on 4/7/17.
 */
var mongoose = require('mongoose');
// var url=require('mongoose-type-url');
var Schema = mongoose.Schema;
var connection = null;
var model = null;
var credentials = require("./credentials.js");

// var dbUrl = 'mongodb://' + credentials.host + ':27017/' + credentials.database;
var dbUrl = 'mongodb://' + credentials.username + credentials.password + credentials.host + credentials.database;

mongoose.Promise = global.Promise;

var docProfileSchema = new Schema({

    doc_name: String,
    doc_title: String,
    doc_rating: String,
    doc_contact: Number,
    doc_timing_slots: {

        slot1:{type:String,default:'visible'},
        slot2:{type:String,default:'visible'} ,
        slot3:{type:String,default:'visible'},
        slot4:{type:String,default:'visible'} ,
        slot5:{type:String,default:'visible'},

    },

    doc_city: String,
    doc_state: String,
    doc_street: String,
    doc_zip: Number,
    doc_speciality: String,
    doc_image: String,
    doc_edu: String,
    doc_insurance: String,
    doc_days: String,
    doc_rating_number: String


});
module.exports = {
    getModel: function getModel() {
        if (connection == null) {
            // console.log("Creating connection and model...");
            connection = mongoose.createConnection(dbUrl);
            model = connection.model("docProfileSchema",
                docProfileSchema);
        }
        return model;
    }
};
