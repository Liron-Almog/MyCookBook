let validator = require('validator');

function AuthValidtor(){

    let message = '';

    function getMessage(){
        return message;
    }

    function isEmpty(...variables){
        
        for (const variable of variables)
            if(variable === undefined  || variable === ''){
                message = `There is a required field that is empty`
                return true;
            }
        return false
    }
    function isThereError() {
        return message.length > 0;
    }
      
    function validatorEmail(email){

        if(!validator.isEmail(email))
            message = 'The email is invalid';
    }

    function arePasswordsEqual(...passwords){

        for(let i = 0; i < passwords.length -1;i++)
            if(!(passwords[i] === passwords[i + 1])){
                message = 'The passwords do not match';
                return true;
            }
        return false;
    }
    return {
        getMessage,
        validatorEmail,
        arePasswordsEqual,
        isEmpty,
        isThereError,
    };

    
}

module.exports = AuthValidtor;