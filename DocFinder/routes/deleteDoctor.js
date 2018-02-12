/**
 * Created by harshmeet on 4/18/17.
 */

var underscore = require('Underscore')
var DB = require('./doctorProfileSchema');
var doctor = DB.getModel();

module.exports =
    function deleteDoctor(req, res, next) {
        //var contact = req.body.doc_Contact;
        var id=req.body.doc_id.toString().substr(1);
        doctor.remove({_id: id}, function (err) {
            if (err)
                console.log("Error deleting : %s ", err);
            else res.redirect('/deleteView');})


    };

