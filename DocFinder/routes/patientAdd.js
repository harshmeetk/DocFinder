/**
 * Created by harshmeet on 4/15/17.
 */
var myConnection = require('./patientSchema');
var patient = myConnection.getModel();
// var newWindow=window.open("", null, "height=200,width=400")
module.exports =
    function savePatient(req, res, next) {
        patient.find({patient_Email: req.body.pemail}, function (err, data) {
            if (data.length>0) {
res.redirect('/exists')
            }
            else
                if (err)
                console.log("Error: %s", err);

            else {
                var newPatient = new patient({


                    patient_first_name: req.body.pfirst,
                    patient_middle_name: req.body.pmiddle,
                    patient_last_name: req.body.plast,
                    patient_Email: req.body.pemail,
                    patient_Password: req.body.pcode,
                    patient_DateOfBirthMonth: req.body.pmonth,
                    patient_DateOfBirthDay: req.body.pday,
                    patient_DateOfBirthYear: req.body.pyear,

                    patient_Sex: req.body.pgender,
                    patient_Insurance: req.body.pinsurance


                });
                newPatient.save(function (err) {
                    if (err)
                        console.log("Error : %s ", err);
                    res.redirect('/newSignUp');

                });
            }
        })
    };


