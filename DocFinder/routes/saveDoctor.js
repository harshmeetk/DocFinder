/**
 * Created by harshmeet on 4/9/17.
 */
var Myconnection = require('./doctorProfileSchema');
var newProfile=Myconnection.getModel();

module.exports =
    function doctor(req , res , next){
    var dratingUrl="";
        if(req.body.drating=="4.5") dratingUrl='https://asset2.betterdoctor.com/assets/consumer/stars/stars-large-4.5@2x.png'
            else dratingUrl='https://asset2.betterdoctor.com/assets/consumer/stars/stars-large-5.0@2x.png'
        var profile = new newProfile({


            doc_name:req.body.dname,
            doc_title:req.body.dtitle,
            doc_rating:dratingUrl,
            doc_contact:req.body.docnumber,
            doc_timing:req.body.dtime,
            doc_rating_number:req.body.dnumber,
            doc_city:req.body.city,
            doc_state:req.body.state1,
            doc_street:req.body.street,
            doc_zip:req.body.zip,
            doc_speciality:req.body.speciality,
            doc_image:req.body.image,
            doc_edu:req.body.dedu,
            doc_insurance:req.body.dinsurance,
            doc_payment:req.body.dpayment,
            doc_days:req.body.ddays





        });

        profile.save(function (err){
            if(err)
                console.log("Error : %s ",err);
            res.redirect('/doctor');
        });

    };
