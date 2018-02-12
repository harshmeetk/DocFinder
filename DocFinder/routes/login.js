/**
 * Created by harshmeet on 4/16/17.
 */
var myConnection = require('./patientSchema');
var userDetails = myConnection.getModel();
module.exports =
    function checkCreedentials(req, res, next) {

        var userName = req.body.username;
        var password = req.body.password;

        userDetails.find({
            patient_Email: userName,
            patient_Password:password

        },function (err,talent) {
            if (err)
                console.log("Error: %s", err);
            if(talent.length>0){
                if(talent[0]._doc.patient_Email=="kaur28@gmail.com"){
                    res.render('adminLanding',{title:"Doc By City", data:talent})
                }
                else
                res.render('userLandingPage',{title:"Doc By City", data:talent})
                    // [0]._doc})
            }
            // if(talent._doc[3]=="kaur28@gmail.com"&&talent._doc[4]=='k'){
            //     res.render('adminLanding');
            //     // title:"Doc By City", data:talent}
            //
            // }
            else{
                res.render('not',{title:"Doc By City", data:talent})
            }

        })

    };

