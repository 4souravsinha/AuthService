const { User } = require('../models/index');

class UserRepository {

    async create(data) {
        try {
            console.log("inside create");
            const user = await User.create(data);
            console.log("exiting create");
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;
