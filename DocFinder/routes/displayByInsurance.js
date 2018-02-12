/**
 * Created by harshmeet on 4/14/17.
 */
var displayDoctorByIns=require("./doctorProfileSchema");
var  ins=displayDoctorByIns.getModel();

module.exports=function displayDoctorByInsurance(req,res,next) {


    ins.find({doc_insurance:req.query.ins},function (err,talent) {
        if (err)
            console.log("Error: %s", err);
        else {
            var results = talent.map(function (tal) {
                tal.patiendId = req.query.patindId;
                return tal;
            })
            res.render('displaySpecialityView',{title:"Doc By Insurance", data:talent})
        }

    })



};