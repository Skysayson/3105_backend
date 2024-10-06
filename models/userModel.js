const fs = require('fs')
const path = require('path')
const dataFilePath = path.join("C:/Users/jonaz/Desktop/3105-ASSIGNMENT/data", 'data.json')
const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');

        if (!data) {
            return { users: [] };
        }

        // parse the JSON data
        const parsedData = JSON.parse(data);

        return parsedData;

    } catch (error) {
        // return empty array
        return { users: [] };
    }
};

const registerUser = (userData) => {

    const { error } = registerSchema.validate(userData);
    if (error) throw new Error(error.details[0].message);

    const currentData = readData();
    const checkExisting = currentData.users.find(user => user.email === userData.email)

    if (checkExisting) {
        throw new Error("Email already has account associated with it")
    }

    userData.id = currentData.users.length + 1;
    currentData.users.push(userData);

    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(currentData, 2))
    } catch (error) {
        throw new Error(`Failed to write to JSON ${error}`)
    }
}

const getUserByID = (id) => {
    const currentData = readData();
    return currentData.users.find(user => user.id === id); // find user via id
};

const loginUser = (loginData) => {

    const { error } = loginSchema.validate(loginData);
    if (error) throw new Error(error.details[0].message);

    const getUsers = readData()
    const checkUser = getUsers.users.find(user => user.username === loginData.username && user.password === loginData.password)

    if (!checkUser) {
        throw new Error('Invalid username or password')
    }
    return {id: checkUser.id, username: checkUser.username}
}

// mock registration
const newUser = {
    username: 'Sky',
    email: 'Skysayson@gmail.com',
    password: 'myPassword'
}

// mock login
const testLogin = {
    username: 'Sky',
    password: 'myPassword'
}

//registerUser(newUser)
//console.log(loginUser(testLogin));

module.exports = { readData, registerUser, loginUser, getUserByID }