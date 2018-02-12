/**
 * Created by harshmeet on 4/10/17.
 */
var displaySpeciality=require("./doctorProfileSchema");
var  speciality=displaySpeciality.getModel();

module.exports=function displaySpeciality(req,res,next) {
   console.log(req.query.patiendId);
    speciality.find({doc_speciality:req.query.doc_speciality1},function (err,talent) {
        if (err)
            console.log("Error: %s", err);

        var results=talent.map(function (tal) {
            tal.patiendId=req.query.patiendId
        return tal;
        });

        res.render('displaySpecialityView',{data:results, patiendId:req.query.patiendId})
    })



};