const User = require('../queries/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.addUserToDb = async (user) => {
    const passwordHash = getPasswordHash(user.password);
    user.password = passwordHash;
    const userToInsert = await createUserObjectToInsert(user);
    if(user.role) {
        userToInsert.role = user.role;
    }
    const insertionResult = await User.addUser(userToInsert)
    if (insertionResult) {
        const insertedUser = insertionResult.ops[0]
        return insertedUser
    }else {
        return null
    }
}

exports.compareUserPassword = (passwordFromLoginForm, passwordFromDb) => {
    if(bcrypt.compareSync(passwordFromLoginForm, passwordFromDb)){
        return true;
    }else{
        return false;
    }
}

const getPasswordHash = (password) => {
    return bcrypt.hashSync(password, saltRounds);
}

const createUserObjectToInsert = (user) => {
    return {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        role: 'user',
    }
}

exports.getAllUsers = async () => { 
    const allUsers = await User.getAllUsers();
    return allUsers;
}

exports.getUserByEmail = async (email) => { 
    const user = await User.getUserByEmail(email);
    return user;
}


exports.getUserById = async (_id) => { 
    const user = await User.getUserById(_id);
    return user;
}
