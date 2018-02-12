/**
 * Created by harshmeet on 4/28/17.
 */
/**
 * Created by harshmeet on 4/18/17.
 */

var underscore = require('Underscore')
var DB = require('./doctorProfileSchema');
var doctor = DB.getModel();
var DBPatient = require('./patientSchema');
var patient = DBPatient.getModel();
var slot = '';
var timing='';
// slot is the appointment time being booked by the user. Initially the visibility of all slots is kept as visible. All slots are initialized by visible value in the schema which denotes the availability of the slots. This is the default characteristic of the appointment module
module.exports =
    function updateDoctor(req, res, next) {
        var ID = req.body.doc_name;
        var patindId = req.body.patiendId;
        console.log("id in CA" + patindId);
        doctor.findById(ID, function (err, doc) {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (!doc)
                return res.render('404');

             console.log('slot is'+req.body.slot);
            if (req.body.slot=='slot1') {
                slot = 'slot1'
                //doc[0]._doc.doc_timing_slots.slot1='hidden';
                doc.doc_timing_slots.slot1 = 'hidden';
                doc.save(function (err) {
                    if (err)
                        console.log("Error : %s ", err);
                    //res.redirect('/');
                })
            }
            if (req.body.slot=='slot2') {
                slot = 'slot2'

                //doc[0]._doc.doc_timing_slots.slot1='hidden';
                doc.doc_timing_slots.slot2 = 'hidden';
                doc.save(function (err) {
                    if (err)
                        console.log("Error : %s ", err);
                   // res.redirect('/');
                })
            }
            if (req.body.slot=='slot3') {
                slot = 'slot3'

                //doc[0]._doc.doc_timing_slots.slot1='hidden';
                doc.doc_timing_slots.slot3 = 'hidden';
                doc.save(function (err) {
                    if (err)
                        console.log("Error : %s ", err);
                   // res.redirect('/');
                })
            }
            if (req.body.slot=='slot4') {
                slot = 'slot4'

                //doc[0]._doc.doc_timing_slots.slot1='hidden';
                doc.doc_timing_slots.slot4 = 'hidden';
                doc.save(function (err) {
                    if (err)
                        console.log("Error : %s ", err);
                   // res.redirect('/');
                })
            }
            if (req.body.slot=='slot5') {
                slot = 'slot5'

                //doc[0]._doc.doc_timing_slots.slot1='hidden';
                doc.doc_timing_slots.slot5 = 'hidden';
                doc.save(function (err) {
                    if (err)
                        console.log("Error : %s ", err);
                    // res.redirect('/');
                })

            }
            if (slot == 'slot1') {

                timing = '1100 HRS-1200HRS Monday'
            }
            if (slot == 'slot2') {
                timing = '1200HRS-1300HRS Tuesday'

            }
            if (slot == 'slot3') {
                timing = '1400HRS-1500HRS Wednesday'

            }
            if (slot == 'slot4') {
                timing = '1500HRS-1600HRS Thursady'

            }
            if (slot == 'slot5') {
                timing = '1600HRS-1700HRS Friday'

            }

            patient.findById(patindId, function (err, patient) {
                if (err)
                    console.log("Error Selecting : %s ", err);
                if (!doc)
                    return res.render('404');

                var temp = {
                    doc_name: doc.doc_name,
                    doc_contact: doc.doc_contact,
                    doc_city: doc.doc_city,
                    doc_state: doc.doc_state,
                    doc_street: doc.doc_street,
                    doc_zip: doc.doc_zip,
                    doc_speciality: doc.doc_speciality,
                    doc_image: doc.doc_image,
                    slot: timing

                }
                patient.patient_appointment.push(temp)
                patient.save(function (err) {
                    if (err) {
console.log('error')
                    }
                    else {
                        res.render('booked',{ data:patient})
                    }
                })
            });
        });
    };
