const { fighter } = require('../models/fighter');

const checkExtraValue = (req, res) => {
    for (let key in req) {
        if (!res.error && !fighter.hasOwnProperty(key)) {
            res = { error: true, status: 400, message: 'There are extra values' };
            return res
        }
    }
    return res
}

const checkRequiredFields = (req, res) => {
    for (let key in fighter) {
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
        if (fighter.hasOwnProperty(key)) { isField = true; }
        return res
    }
    res = { error: true, status: 400, message: 'No fields for update' }
    return res
}

const checkScill = (req, res, skill, min, max) => {
    if (!res.error && (req[skill] < min || req[skill] > max || typeof req[skill] !== 'number')) {
        res = { error: true, status: 400, message: `${skill} must be in range ${min}... ${max}` };
        return res
    }
    return res
}

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    delete fighter.id;
    delete fighter.health;
    res.locals = checkExtraValue(req.body, res.locals);
    res.locals = checkRequiredFields(req.body, res.locals);
    res.locals = checkScill(req.body, res.locals, 'power', 1, 100);
    res.locals = checkScill(req.body, res.locals, 'defense', 1, 10);
    if (req.body.hasOwnProperty('health')) res.locals = checkScill(req.body, res.locals, 'health', 80, 120)
    else req.body['health'] = 100;
    next();
}

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    delete fighter.id;
    res.locals = checkExtraValue(req.body, res.locals);
    res.locals = checkIsFieldPresent(req.body, res.locals);
    if (req.body.hasOwnProperty('power')) res.locals = checkScill(req.body, res.locals, 'power', 1, 100)
    if (req.body.hasOwnProperty('defense')) res.locals = checkScill(req.body, res.locals, 'defense', 1, 10)
    if (req.body.hasOwnProperty('health')) res.locals = checkScill(req.body, res.locals, 'health', 80, 120)
    next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;