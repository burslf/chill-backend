const validator = require('validator');

exports.validateSignUp = (user) => {
    const errorObject = {};
    let errorOccurred = false;
    if(!user){
        errorObject.error = true;
        errorObject.message = "Please fill out required fields!"
        return errorObject;
    }
    if(!user.email){
        errorObject.email = "Please fill out email field";
        errorObject.error = true;
        errorOccurred = true;
    }else{
        if(!validator.isEmail(user.email)){
            errorObject.email = "Invalid email";
            errorObject.error = true;
            errorOccurred = true;
        }
    }
    if(!user.firstName || validator.isEmpty(user.firstName)){
        errorObject.firstName = "Required field";
        errorObject.error = true;
        errorOccurred = true;
    }else{
        //Check if Maximum length exceeded
        if(user.firstName.length>32){
            errorObject.firstName = "Maximum length exceeded";
            errorObject.error = true;
            errorOccurred = true;
        }
    }
    if(!user.lastName || validator.isEmpty(user.lastName)){
        errorObject.lastName = "Required field";
        errorObject.error = true;
        errorOccurred = true;
    }else{
        //Check if Maximum length exceeded
        if(user.lastName.length>32){
            errorObject.lastName = "Maximum length exceeded";
            errorObject.error = true;
            errorOccurred = true;
        }
    }
    if(!user.password){
        errorObject.password = "Required field";
        errorObject.error = true;
        errorOccurred = true;
    }else{
        if(user.password.length<6 || user.password.length>32){
            errorObject.password = "Password minimum 6, maximum 32";
            errorObject.error = true;
            errorOccurred = true;
        }
    }
    if(!user.confirmPassword){
        errorObject.confirmPassword = "Required field";
        errorObject.error = true;
        errorOccurred = true;
    }
    if(user.confirmPassword!==user.password){
        errorObject.message = "The password confirmation does not match";
        errorObject.error = true;
        errorOccurred = true;
    }
    //Return true if form is valid, else return error object.
    return errorOccurred ? errorObject : true;
}
exports.validateLogin = (user) => {
    const errorObject = {};
    let errorOccurred = false;
    if(!user){
        errorObject.error = true;
        errorObject.message = "Please fill out required fields!"
        return errorObject;
    }
    if(!user.email){
        errorObject.email = "Please fill out email field";
        errorObject.error = true;
        errorOccurred = true;
    }else{
        if(!validator.isEmail(user.email)){
            errorObject.email = "Invalid email";
            errorObject.error = true;
            errorOccurred = true;
        }
    }
    if(!user.password){
        errorObject.password = "Required field";
        errorObject.error = true;
        errorOccurred = true;
    }else{
        if(user.password.length<6 || user.password.length>32){
            errorObject.password = "Password minimum 6, maximum 32";
            errorObject.error = true;
            errorOccurred = true;
        }
    }
    //Return true if form is valid, else return error object.
    return errorOccurred ? errorObject : true;
}

//Escape special chars
exports.escapeCharsForSignUpForm = (user) => {
    user.email = validator.escape(user.email);
    user.firstName = validator.escape(user.firstName);
    user.lastName = validator.escape(user.lastName);
}