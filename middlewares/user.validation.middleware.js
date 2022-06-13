const { user } = require('../models/user');

const checkExtraValue = (req, res) => {
    for (let key in req) {
        if (!res.error && !user.hasOwnProperty(key)) {
            res = { error: true, status: 400, message: 'There are extra values' };
            return res
        }
    }
    return res
}

const checkRequiredFields = (req, res) => {
    for (let key in user) {
        if (!res.error && !req.hasOwnProperty(key)) {
            res = { error: true, status: 400, message: 'All fields are required' };
            return res
        }
        if (!res.error && req[key] === '') {
            res = { error: true, status: 400, message: 'All fields are required' };
            return res
        }
    }
    return res
}

const checkIsFieldPresent = (req, res) => {
    let isField = false;
    for (let key in req) {
        if (user.hasOwnProperty(key)) { isField = true; }
        return res
    }
    res = { error: true, status: 400, message: 'No fields for update' }
    return res
}

const checkEmail = (req, res) => {
    const regEmail = /^[a-zA-Z0-9_.+-]+@gmail.com$/
    if (!res.error && !regEmail.test(req.email)) {
        res = { error: true, status: 400, message: 'Email address must be gmail.com' };
    }
    return res
}

const checkPhone = (req, res) => {
    const regPhone = /^\+380\d{9}$/
    if (!res.error && !regPhone.test(req.phoneNumber)) {
        res = { error: true, status: 400, message: 'Phone number must be +380XXXXXXXXX' };
    }
    return res
}

const checkPassword = (req, res) => {
    if (!res.error && req.password.length < 3) {
        res = { error: true, status: 400, message: 'Password must be 3 symbols or more' };
    }
    return res
}

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    delete user.id;
    res.locals = checkExtraValue(req.body, res.locals);
    res.locals = checkRequiredFields(req.body, res.locals);
    res.locals = checkEmail(req.body, res.locals);
    res.locals = checkPhone(req.body, res.locals);
    res.locals = checkPassword(req.body, res.locals)
    next();
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    delete user.id;
    res.locals = checkExtraValue(req.body, res.locals);
    res.locals = checkIsFieldPresent(req.body, res.locals);
    if (req.body.hasOwnProperty('email')) res.locals = checkEmail(req.body, res.locals);
    if (req.body.hasOwnProperty('phoneNumber')) res.locals = checkPhone(req.body, res.locals);
    if (req.body.hasOwnProperty('password')) res.locals = checkPassword(req.body, res.locals);
    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;