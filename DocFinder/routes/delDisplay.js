/**
 * Created by harshmeet on 5/3/17.
 */
var display=require("./doctorProfileSchema");
var  doctor=display.getModel();

module.exports=function displaySpeciality(req,res,next) {
    doctor.find({},function (err,results) {
        if (err)
            console.log("Error: %s", err);

//res.send(200);
        res.render('deleteDoctorView',{data:results})
    })



};