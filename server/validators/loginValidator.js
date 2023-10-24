let validator = require('validator');

function loginValidtor(){

    const messages = [];

    function getMessages(){
        return messages;
    }


    function validatorEmail(email){

        if(!validator.isEmail(email))
            messages.push('The email is invalid')
    }

    function comparePasswords(password1,password2){

        if(!(password1 === password2))
            messages.push('The passwords do not match')
    
    }
    return {
        getMessages,
        validatorEmail,
        comparePasswords,
    };

    
}

module.exports = loginValidtor;