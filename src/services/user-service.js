const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            console.log("inside service");
            const user = await this.userRepository.create(data);
            console.log("exiting service");
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
            return result;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            //1. find user
            const user = await this.userRepository.getByEmail(email);
            //2. compare plain password with encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if (!passwordMatch) {
                console.log("password doesn't match");
                throw { error: "incorrect password" };
            }
            //3. create token and send it to user
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;

        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            throw error;
        }
    }
}

module.exports = UserService;
