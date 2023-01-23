const express = require('express')
const bodyParser = require('body-parser')

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const userService = require('./services/user-service');

const app = express();

const prepareAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);
    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);

        // const service = new userService();
        // const newToken = service.createToken({email : "sourav@admin.com" , id : 1});
        // console.log(typeof newToken);
        // console.log("newToken is" , newToken);
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvdXJhdkBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNjc0NDU2NDE0LCJleHAiOjE2NzQ0NTY0MTl9.RR5YrbhhqFx5aEAjvg5zdlj5i4DiurDOD-ZAwnJHq94";
        // const response = service.verifyToken(token);
        // console.log(response);
    })
}


prepareAndStartServer();
