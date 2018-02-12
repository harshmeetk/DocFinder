/**
 * Created by harshmeet on 4/13/17.
 */
var displayDoctorByCity=require("./doctorProfileSchema");
var  city=displayDoctorByCity.getModel();

module.exports=function displayDoctorByCity(req,res,next) {

    city.find({doc_city:req.query.city},function (err,talent) {
        if (err)
            console.log("Error: %s", err);
        else {
            var results=talent.map(function (tal) {
                tal.patiendId = req.query.patindId;
                return tal;
            })
            res.render('displaySpecialityView',{title:"Doc By City", data:results})
        }


    })



};