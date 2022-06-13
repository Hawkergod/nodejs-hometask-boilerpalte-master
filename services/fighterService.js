const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    async getAll(req, res, next) {
        try {
            const fighters = FighterRepository.getAll()
            res.data = fighters;
        }
        catch (err) { }

    }
}

module.exports = new FighterService();