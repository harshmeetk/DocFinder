/**
 * Created by harshmeet on 4/15/17.
 */
module.exports =
    function addNewPatient(req , res , next){
        res.render('signUp',
            {title:"New Patient SignUp"});
    };