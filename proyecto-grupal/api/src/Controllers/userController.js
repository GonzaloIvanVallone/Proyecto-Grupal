const userServices = require('../Services/userService.js');
const { User } = require('../db.js');
const bcrypt = require("bcrypt");

const getAllUsers = async (_req, res, next) => {
    try{
        const users = await User.findAll();
        if(users.length){
            res.status(200).json(users);
        }else{
            res.status(400).json({ msg: "Error, no users found"});
        }
    }catch(error){
        next(error)
    }
}

const createNewUser = async (req, res, next) => {
    const { body } = req;
    const salt = await bcrypt.genSalt(10);
    try{
        const myUser = {
            name: body.name,
            surname: body.surname,
            password: await bcrypt.hash(body.password, salt),
            email: body.email,
            adress: body.adress,
        };
        const [_user, created] = await User.findOrCreate({
            where: { email: myUser.email}, 
            defaults:{
                ...myUser,
            }
        });
        if(created === true){
            res.status(200).json({ msg : 'User stored correctly' });
        }else{
            res.status(400).json({ msg: "Error, the User already exist"});
        }
    }catch(error){
        next(error);
    }
}

const deleteUser = async (req, res, next) =>{
    try{
        const { email } = req.body;
        const user = await User.update(
            {active: false},
            {where: {email: email}}
        );
        if(user[0]===1){
            res.status(200).json({msg: "User found and deleted"})
        }else{
            res.status(400).json({msg: "User not found in the DB"});
        }
    }catch(error){
        next(error)
    }
}

const promoteUser = async(req, res, next) =>{
    try{
        const { id } = req.params;
        const user = await User.update(
            {type: 'admin'},
            {where: {id: id}}
        );
        console.log(user)
        if(user[0]===1){
            res.status(200).json({msg: "User found and promoted"})
        }else{
            res.status(400).json({msg: "User not found in the DB"});
        }
    }catch(error){
        next(error);
    }
}
module.exports = {createNewUser, deleteUser, getAllUsers, promoteUser}