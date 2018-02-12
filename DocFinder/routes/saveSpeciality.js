/**
 * Created by harshmeet on 4/9/17.
 */
var Myconnection = require('./docSpecialitySchema');
var speciality=Myconnection.getModel();
module.exports =
    function saveSpeciality(req , res , next){

        var forte = new speciality({


            speciality_id:req.body.snumber,
            speciality_Name:req.body.sname






        });

        forte.save(function (err){
            if(err)
                console.log("Error : %s ",err);
            res.redirect('/specialityDoctor');
        });

    };
