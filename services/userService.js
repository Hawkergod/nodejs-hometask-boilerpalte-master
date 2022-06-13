const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user
    //-----
    async getAllUsers(req, res) {
        const list = await UserRepository.getAll();
        res.status(200).json({
            data: list
        })
    }

    async getUserById(req, res) {
        const { id } = req.params;
        console.log(req.params);
        const list = await UserRepository.getAll();
        const user = list.find(({ id: idDb }) => idDb === id)
        console.log('user', user);
        if (!user) {
            return res.status(404).json({
                error: true,
                status: 404,
                message: `User with id ${id} not found`,
            })
        }
        res.status(200).json({
            data: { ...user }
        })
    }

    async createUser(req, res) {
        const list = await UserRepository.getAll();
        const checkEmail = list.find(({ email }) => email.toLowerCase().trim() === req.body.email.toLowerCase().trim());
        const checkPhone = list.find(({ phoneNumber }) => phoneNumber === req.body.phoneNumber);
        if (checkEmail) {
            return res.status(400).json({
                error: true,
                status: 400,
                message: 'This mail already exists.',
            })
        }
        if (checkPhone) {
            return res.status(400).json({
                error: true,
                status: 400,
                message: 'This phone number already exists.',
            })
        }

        const user = await UserRepository.create(req.body);

        res.status(200).json({
            data: { ...user }
        })
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const list = await UserRepository.getAll();

        const user = list.find(({ id: idDb }) => idDb === id);

        if (!user) {
            return res.status(404).json({
                error: true,
                status: 404,
                message: `User with id ${id} not found`,
            })
        }

        if (req.body.hasOwnProperty('email')) {
            const checkEmail = list.find(({ email }) => email.toLowerCase().trim() === req.body.email.toLowerCase().trim());
            if (checkEmail && checkEmail.id !== id) {
                return res.status(400).json({
                    error: true,
                    status: 400,
                    message: 'This mail already exists.',
                })
            }
        }

        if (req.body.hasOwnProperty('phoneNumber')) {
            const checkPhone = list.find(({ phoneNumber }) => phoneNumber === req.body.phoneNumber);
            if (checkPhone && checkPhone.id !== id) {
                return res.status(400).json({
                    error: true,
                    status: 400,
                    message: 'This phone number already exists.',
                })
            }
        }

        let isFieldChange = false;
        for (let key in req.body) {
            if (req.body[key] !== user[key]) {
                user[key] = req.body[key];
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
        await UserRepository.update(id, user);
        res.status(200).json({
            data: { ...user }
        })
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        const list = await UserRepository.getAll();
        const user = list.find(({ id: idDb }) => idDb === id);
        if (!user) {
            return res.status(404).json({
                error: true,
                status: 404,
                message: `User with id ${id} not found`,
            })
        }
        await UserRepository.delete(id);
        res.status(200).json({
            data: { ...user }
        })
    }
    //------

    search(search) {
        const item = UserRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }
}

module.exports = new UserService();