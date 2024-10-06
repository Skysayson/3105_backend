const fs = require('fs')
const path = require('path')
const dataFilePath = path.join("C:/Users/jonaz/Desktop/3105-ASSIGNMENT/data", 'data.json')
const Joi = require('joi');

// Registration Schema
const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// Login Schema
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Gets data from data.json, parses it and returns it to the calling function for further use
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

// Model for user registration
const registerUser = (userData) => {

    const { error } = registerSchema.validate(userData);
    if (error) throw new Error(error.details[0].message);

    const currentData = readData();
    const checkExistingEmail = currentData.users.find(user => user.email === userData.email)
    const checkExistingUsername = currentData.users.find(user => user.username === userData.username)


    if (checkExistingEmail) {
        throw new Error("Email already has account associated with it")
    } else if (checkExistingUsername) {
        throw new Error("Username already exists")
    }

    userData.id = currentData.users.length + 1;
    currentData.users.push(userData);

    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(currentData, 2))
    } catch (error) {
        throw new Error(`Failed to write to JSON ${error}`)
    }
}

// Model to get data of a specified ID
const getUserByID = (id) => {
    const currentData = readData();
    return currentData.users.find(user => user.id === id); // find user via id
};

//Model for login
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

module.exports = { readData, registerUser, loginUser, getUserByID }