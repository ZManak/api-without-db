const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, "../db/users.json");
const { v4: uuidv4 } = require('uuid')

function parseData() {
    let usersJSON = fs.readFileSync(usersPath, 'utf-8');
    let users = JSON.parse(usersJSON);
    return users
}

const getUsers = (req, res) => {
    if (req.params.username) {
        let users = parseData();
        users.forEach((user) => {
            if (req.params.username == user.username) {
                res.status(200).json(user)
            }
        })
    } else {
        let users = parseData();
        res.status(200).json(users);
    }
}

const getByCountry = (req, res) => {
    if (req.params) {
        console.log(req.params)
        let usersJSON = fs.readFileSync(usersPath, 'utf-8');
        let users = JSON.parse(usersJSON);
        let byCountry = users.filter((user) => user.address.country === req.params.country)
        res.status(200).json(byCountry)
    }

}

const getTotal = (req, res) => {
    let usersJSON = fs.readFileSync(usersPath, 'utf-8');
    let users = JSON.parse(usersJSON);
    let total = users.length
    let result = { "Total Users: ": total }
    res.status(200).json(result)
}

const byCarNum = (req, res) => {
    let users = parseData();
    let min = req.query.min;
    let max = req.query.max;
    console.log({ min, max })

    let query = users.filter((user) => min <= user.vehicles.length && user.vehicles.length <= max);
    if (query) {
        let data = query.map(user => ({
            mail: user.email,
            username: user.username,
            pic: user.img
        }));
        res.status(200).json(data);
    }

}

const byFood = (req, res) => {
    let users = parseData();
    let food = users.filter((user) => user.favouritesFood.includes(req.params.food))
    res.status(200).json(food);
}

const getFoods = (req, res) => {
    const users = parseData();
    //console.log(...new Set(users.map((user) => user.favouritesFood).flat()))
    //console.log(users.map((user) => user.favouritesFood).flat().filter((elem, i, arr) => arr.indexOf(elem) === i ))
    let allFood = (users.map((user) => user.favouritesFood).flat().filter((elem, i, arr) => arr.indexOf(elem) === i))
    //console.log (allFood.length)
    res.status(200).json(allFood);
}

const byCarType = (req, res) => {
    const users = parseData();
    let cars = users.map(user => user.vehicles).flat()
    let entries = Object.entries(req.query)
    if (entries.length !== 0) {
        if (entries.length === 1) {
            let query1 = cars.filter((car) => car[entries[0][0]] === entries[0][1])
            res.status(200).json(query1)
        }
        if (entries.length === 2) {
            let query2 = cars.filter((car) => (car[entries[0][0]] === entries[0][1]) && (car[entries[1][0]] === entries[1][1]))
            res.status(200).json(query2)
        }
        if (entries.length === 3) {
            let query3 = cars.filter((car) => (car[entries[0][0]] === entries[0][1]) && (car[entries[1][0]] === entries[1][1]) && (car[entries[2][0]] === entries[2][1]))
            res.status(200).json(query3)
        }
    } else {
        let noCar = users.filter((user) => user.vehicles.length === 0)
        res.status(200).json(noCar);
    }
}

const postUser = (req, res) => {
    let defaultUser = {
        id: uuidv4(),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName || "",
        phone: req.body.phone || "",
        img: req.body.img || "",
        username: req.body.username,
        adress: req.body.adress || {},
        vehicles: req.body.vehicles || [],
        favouritesFood: req.body.foods || [],
        deleted: req.body.deleted || false
    }

    let { id, email, firstName, lastName, phone, img, username, adress, vehicles, favouritesFood, deleted } = req.body

    console.log(req.body)
    if (email && firstName && username) {
        console.log(req.body)
        res.status(201).json({ Created: defaultUser })
    }
}

const updateUser = (req, res) => {
    const users = parseData();
    console.log(req.params)
    users.forEach((user) => {
        if (req.params.username == user.username) {
            user.email = req.body.email;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.phone = req.body.phone;
            user.img = req.body.img;
            user.username = req.body.username;
            user.address = req.body.address;

            res.status(202).json(user)
        };
    })
}

const updateCars = (req, res) => {
    const users = parseData();
    users.forEach((user) => {
        if (req.params.username == user.username) {
            if (req.body.vehicles) {
                console.log(req.body.vehicles)
                user.vehicles.push(...req.body.vehicles)
                fs.writeFileSync(usersPath, JSON.stringify(users));
                res.status(200).send("Vehicles updated");
            }
        }
    }
    )
}

const updateFood = (req, res) => {
    const users = parseData();
    users.forEach((user) => {
        if (req.params.username == user.username) {
            console.log(req.body)
            console.log(user.favouritesFood)
            if (req.body.foods) {
                user.favouritesFood.push(...req.body.foods);
                fs.writeFileSync(usersPath, JSON.stringify(users));
                res.status(200).json(user.favouritesFood)
            } else {
                user.favouritesFood = [];
                fs.writeFileSync(usersPath, JSON.stringify(users));
                res.status(200).json(user.favouritesFood)
            }
        }
    })
}

const hideUser = (req, res) => {
    let users = parseData();
    users.forEach((user)=>{
        if (req.params.username == user.username) {
            req.body.email = user.email;
            user.deleted = true;
            fs.writeFileSync(usersPath, JSON.stringify(users));
            console.log("User hidden")
            res.status(200).json(req.body);
        }
    })
}

const delUser = (req, res) => {
    let users = parseData();
    users.forEach((user)=>{
        if (req.params.username == user.username) {
            if (user.deleted === true) {
                req.body.email = user.email;
                let index = users.indexOf(user)
                users.splice(index, 1);
                fs.writeFileSync(usersPath, JSON.stringify(users));
                res.status(200).json(req.body);
                console.log("Deleted user: " + user.username);
                return user;
            } else {
                res.send('User cannot be deleted. Hide it first.')
            }
    
}}) }

module.exports = {
    getUsers,
    getByCountry,
    getTotal,
    byCarNum,
    byFood,
    getFoods,
    byCarType,
    postUser,
    updateUser,
    updateCars,
    updateFood,
    hideUser,
    delUser
}