/**
 * Created by harshmeet on 4/5/17.
 */
var express = require('express');
var router = express.Router();
var adminDisplay=require("./adminDisplay")
var delDocView=require("./delDisplay")
var viewAppointment=require('./confirmAppointment')
var docSpeciality=require("./addSpeciality");
var saveSpeciality=require("./saveSpeciality");
var docInfo=require("./addDoctorProfile");
var saveDoctor=require("./saveDoctor");
var displaySpeciality=require("./displaySpeciality");
var displayCity=require("./displayDoctorByCity");
var displayDoctorByInsurance=require('./displayByInsurance');
var newSignUp=require('./newSignUp');
var patientAdd=require('./patientAdd')
var login = require('./login');
var deleteDoctor=require('./deleteDoctor');
var confirmAppointment=require('./confirmAppointment')
router.get('/', function(req, res, next) {
    res.render('loginPage');
});

router.get('/login', function(req, res, next) {
    res.render('loginPage');
});

router.get('/userLandingPage', function(req, res, next) {
    res.render('userLandingPage');
});


router.get('/Main_Page', function(req, res, next) {
    res.render('Main_Page');
});


router.get('/admin', function(req, res, next) {
    res.render('adminLanding');
});

router.get('/adminFindDoctor', function(req, res, next) {
    res.render('adminFindDoctorView');


});

router.get('/exists', function(req, res, next) {
    res.render('exists');


});
router.get('/therapyCareView', function(req, res, next) {
    res.render('therapyCareView');
});

router.get('/elderlyCareView', function(req, res, next) {
    res.render('elderlyCareView');
});

router.get('/findSupportGroup', function(req, res, next) {
    res.render('findSupportGroup');
});

router.get('/baby', function(req, res, next) {
    res.render('babyView');
});

router.get('/vaccine', function(req, res, next) {
    res.render('haepititisView');
});
router.get('/resources', function(req, res, next) {
    res.render('resourcesView');
});

router.get('/adminDisplay', adminDisplay);


router.get('/deleteView',delDocView);


router.get('/specialityDoctor',docSpeciality);
router.post('/saveSpeciality',saveSpeciality);
router.get('/doctor', docInfo);
router.post('/saveDoctor',saveDoctor);
router.get('/newSignUp',newSignUp);
router.post('/patientAdd',patientAdd);
router.post('/delete',deleteDoctor);
router.post('/checkCredentials',login);
router.get('/speciality',displaySpeciality );
//router.get('/speciality/:patiendId',displaySpeciality );
router.get('/city',displayCity);
router.get('/insurance', displayDoctorByInsurance);
router.post('/confirmAppointment',confirmAppointment);
router.get('/:patientId',function (req,res,next)
{res.render('Main_Page')
})


module.exports = router;



