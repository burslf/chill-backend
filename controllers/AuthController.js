const User = require('../queries/User');
const UserModel = require('../models/UserModel');
const Validation = require('../validation/Validator')
const jwt = require('jsonwebtoken')

exports.signUp = async (req,res) => {
    const user = req.body;
    const validationResult = Validation.validateSignUp(user);
    if(validationResult===true){
        const userFromDb = await User.getUserByEmail(user.email);
        if(userFromDb){
            //User exists
            res.status(409).json({error: true, message: 'User with this email already exists'})
        }else{
            Validation.escapeCharsForSignUpForm(user);
            const insertedUser = await UserModel.addUserToDb(user);
            if(insertedUser){
                //Create jwt
                delete insertedUser.password; //We don't want to send password to client
                const token = jwt.sign(
                    {
                        _id: insertedUser._id
                    },
                    process.env.TOKEN_SECRET);
                res.json({user: insertedUser,token: token});
            }else{
                res.status(500).send("Server error!")
            }
        }
    }else{
        //If not valid, send error object to client
        res.status(409).json(validationResult);
    }
}

exports.login = async (req,res) => {
    let user = req.body;
    const validationResult = Validation.validateLogin(user);
    if(validationResult===true){
        const userFromDb = await User.getUserByEmail(user.email);
        if(userFromDb){
            if(UserModel.compareUserPassword(user.password,userFromDb.password)){
                delete userFromDb.password; //We don't want to send password to client
                const token = jwt.sign(
                    {
                        _id: userFromDb._id
                    },
                    process.env.TOKEN_SECRET);
                res.json({user: userFromDb,token: token});
            }else{
                //Password incorrect
                res.status(409).json({error: true, message: 'Email or Password are incorrect!'})
            }
        }else{
            //Email doesn't exist in db
            res.status(409).json({error: true, message: 'Email or Password are incorrect!'})
        }
    }else{
        //If not valid, send error object to client
        res.status(409).json(validationResult);
    }
}