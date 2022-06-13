const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
// GET '/api/fighters'
// GET '/api/fighters/:id
// POST '/api/fighters
// PUT '/api/fighters /: id
// DELETE '/api/fighters /: id

router.get('/', FighterService.getAll(), responseMiddleware);
router.get('/:id', FighterService.getById(), responseMiddleware)

module.exports = router;