// CRUD methods are here...................

const bcrypt = require('bcrypt');
const User = require('../SchemaModel/Peoples');
const { unlink } = require('fs');
const path = require('path');

async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.render('users', {
            title: 'Users - Chat Application',
            users: users
        })
    } catch (err) {
        next(err);
    }
}

// ADD USER
async function addUser(req, res, next) {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        })
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword
        })
    }

    // save user
    try {
        const result = await newUser.save();
        res.status(200).json({
            message: 'User was added successfully!',
            users: result,
        })
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    message: 'Unknown error occured!'
                }
            }
        })
    }
}

// DELETE USER
async function removeUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete({
            _id: req.params.id,
        })
        if (user.avatar) {
            unlink(
                path.join(__dirname, `/../public/uploads/avatar/${user.avatar}`), err=>{
                    if(err) console.log(err.message);
                }
            )
        }

        res.status(200).json({
            message:'User was removed successfully!'
        })
    }catch(err){
        res.status(500).json({
            errors:{
                common:{
                    message: 'Could not delete the user!'
                }
            }
        })
    }
}

module.exports = {
    getUsers,
    addUser,
    removeUser,
}