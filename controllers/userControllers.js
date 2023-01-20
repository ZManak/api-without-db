const fs = require('fs');
const usersPath = "db/users.json";

const getUsers = (req, res) => {
    if (req.params.username) {
        let usersJSON = fs.readFileSync(usersPath, 'utf-8');
        let users = JSON.parse(usersJSON);
        let user = users.filter(function (user) {
            return user.username === req.params.username})[0];
        res.status(200).json(user)
    } else {
        const usersJSON = fs.readFileSync(usersPath, 'utf-8');
        const users = JSON.parse(usersJSON);
        res.status(200).json(users);
    }
}

module.exports = getUsers;