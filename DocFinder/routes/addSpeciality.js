/**
 * Created by harshmeet on 4/9/17.
 */
module.exports =
    function addAilment(req , res , next){
        res.render('addSpecialityView',
            {title:"Add a speciality"});
    };
