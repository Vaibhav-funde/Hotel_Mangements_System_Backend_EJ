const userService = require("../services/userService"); 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");


// REGISTER
 exports.register = async (req, res) => { 
    try { 
        await userService.registerUser(req.body); 
   res.json({ message: "User Registered"  });  
} catch (err) {  
      res.status(500).json(err); 
     
    } };