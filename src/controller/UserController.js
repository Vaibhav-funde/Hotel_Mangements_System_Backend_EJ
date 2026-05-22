const userService = require("../services/userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {
    try {
        await userService.registerUser(req.body);
        res.json({ message: "User Registered" });
    } catch (err) {
        res.status(500).json(err);

    }
};



//Login user
exports.login = async (req, res) => {


    try {
        const user = await userService.loginUser(req.body.email);

        if (!user) return res.status(400).json({ message: "User Not Found" })

        const match = await bcrypt.compare(req.body.password, user.password)

        if (!match) return res.status(400).json({ message: "Wrong Password" })

        const token = jwt.sign(
            {
                id: user.user_id, role: user.role
            },
            "secret123",
            {
                expiresIn: "1d"
            }
        );

        res.json({ token, user });
    } catch (err) {
        res.status(500).json(err);
    }
};


//Get All User
exports.getAllusers = async (req, res) => {

    try {
        const users = await userService.getAllUser();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};




//Get User By Id
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};




//Update user
exports.updateUser =async (req, res) => {


    try {
        await userService.updateUser(req.params.id, req.body)
        res.json({ message: "Updated" });
    } catch (err) {
        res.status(500).json(err);
    }
}


//Delete User

exports.deleteUser=async (req,res)=>{

    try{
        await userService.deleteUser(req.params.id)
        res.json({
           message: "successfully Deleted"
        });
    }catch(err){
        res.status(500).json(err)
    }
}