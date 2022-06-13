const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter

router.get('/', FighterService.getAll);
router.get('/:id', FighterService.getFighterById);
router.post('/', createFighterValid, responseMiddleware, FighterService.createFighter);
router.put('/:id', updateFighterValid, responseMiddleware, FighterService.updateFighterById);
router.delete('/:id', FighterService.deleteFighter);

module.exports = router;