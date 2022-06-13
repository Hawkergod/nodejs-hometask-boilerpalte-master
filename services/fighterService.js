const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
    // TODO: Implement methods to work with fighters
    async getAll(req, res, next) {
        try {
            const fighters = FighterRepository.getAll()
            res.status(200).json({
                data: fighters,
            })
        }
        catch (err) { }
        next();
    }
    async getFighterById(req, res, next) {
        try {
            const { id } = req.params;
            const list = await FighterRepository.getAll();
            const fighter = list.find(({ id: idDb }) => idDb === id)
            if (!fighter) {
                return res.status(404).json({
                    error: true,
                    status: 404,
                    message: `Fighter with id ${id} not found`,
                })
            }
            res.status(200).json({
                data: fighter
            })
        } catch (err) { }
        next();
    }
    async createFighter(req, res, next) {
        try {
            const fighters = FighterRepository.getAll();
            const checkName = fighters.find(({ name }) => name.toLowerCase().trim() === req.body.name.toLowerCase().trim())
            if (checkName) {
                return res.status(400).json({
                    error: true,
                    status: 400,
                    message: `This name ${req.body.name} already exists.`,
                })
            }
            const fighter = FighterRepository.create(req.body);
            console.log(fighter);
            res.status(200).json({
                data: fighter
            })

        }
        catch (err) { res.err = err; }
        next();
    }
    async updateFighterById(req, res, next) {
        const { id } = req.params;
        const list = await FighterRepository.getAll();
        const fighter = list.find(({ id: idDb }) => idDb === id);
        if (!fighter) {
            return res.status(404).json({
                error: true,
                status: 404,
                message: `Fighter with id ${id} not found`,
            })
        }
        if (req.body.hasOwnProperty('name')) {
            const checkName = list.find(({ name }) => name.toLowerCase().trim() === req.body.name.toLowerCase().trim());
            if (checkName && checkName.id !== id) {
                return res.status(400).json({
                    error: true,
                    status: 400,
                    message: 'This Name already exists.',
                })
            }
        }
        let isFieldChange = false;
        for (let key in req.body) {
            if (req.body[key] !== fighter[key]) {
                fighter[key] = req.body[key];
                isFieldChange = true;
            }
        }
        if (!isFieldChange) {
            return res.status(400).json({
                error: true,
                status: 400,
                message: 'No new field values.',
            })
        }
        await FighterRepository.update(id, fighter);
        res.status(200).json({
            data: fighter
        })
        next();
    }

    async deleteFighter(req, res, next) {
        const { id } = req.params;
        const list = await FighterRepository.getAll();
        const fighter = list.find(({ id: idDb }) => idDb === id);
        if (!fighter) {
            return res.status(404).json({
                error: true,
                status: 404,
                message: `Fighter with id ${id} not found`,
            })
        }
        await FighterRepository.delete(id);
        res.status(200).json({
            data: fighter
        })
        next();
    }
}

module.exports = new FighterService();
