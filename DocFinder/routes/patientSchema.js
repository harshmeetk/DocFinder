/**
 * Created by harshmeet on 4/7/17.
 */
var mongoose=require('mongoose')


var Schema = mongoose.Schema;
var connection = null;
var model = null;
var credentials = require("./credentials.js");
var dbUrl = 'mongodb://'+ credentials.username+ credentials.password+credentials.host + credentials.database;
mongoose.Promise = global.Promise;


var patientProfileSchema=new Schema({
    patient_first_name:String,
    patient_middle_name:String,
    patient_last_name:String,
    patient_Email:String,

    patient_Password:String,
    patient_DateOfBirthMonth:String,
    patient_DateOfBirthDay:String,
    patient_DateOfBirthYear:String,

    patient_Sex:String,
    patient_Insurance:String,
    patient_appointment:[{

        doc_name: String,
        doc_contact: Number,
        doc_city: String,
        doc_state: String,
        doc_street: String,
        doc_zip: Number,
        doc_speciality: String,
        doc_image: String,

        slot:String



    }]




});
module.exports = {
    getModel: function getModel() {
        if (connection == null) {
            // console.log("Creating connection and model...");
            connection = mongoose.createConnection(dbUrl);
            model = connection.model("patientProfileSchema",
                patientProfileSchema);
        }
        return model;
    }
};
