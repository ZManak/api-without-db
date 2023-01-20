const fs = require('fs');
const usersPath = "db/users.json";

const getUsers = (req, res) => {
    if (req.params.username) {
        console.log(req.params)
        let usersJSON = fs.readFileSync(usersPath, 'utf-8');
        let users = JSON.parse(usersJSON);
        users.forEach((user) => {
            if (req.params.username == user.username) {
                res.status(200).json(user)
        }
        })
    } else {
        let usersJSON = fs.readFileSync(usersPath, 'utf-8');
        let users = JSON.parse(usersJSON);
        res.status(200).json(users)
    }
}

const getByCountry = (req, res) => {
    if (req.params) {
        console.log(req.params)
        let usersJSON = fs.readFileSync(usersPath, 'utf-8');
        let users = JSON.parse(usersJSON);
        let byCountry = users.filter((user)=> user.address.country === req.params.country)
        res.status(200).json(byCountry)          
        }
        
}

const getTotal = (req, res) => {
        let usersJSON = fs.readFileSync(usersPath, 'utf-8');
        let users = JSON.parse(usersJSON);
        let total = users.length
        let result = {"Total Users: ": total}
        res.status(200).json(result)          
        }
        


module.exports = {
    getUsers,
    getByCountry,
    getTotal
}