const db= require('../config/db');

const bcrypyt=require("bcryptjs");

//register
exports.registerUser= async(data)=>{

    const{full_name,email,password,phone,role}=data;

    const hashed = await bcrypyt.hash(password,10);

    return new Promise((resolve,reject)=>{

       const sql=`insert into users(full_name,email,password,phone,role) values(?,?,?,?,?)`;

       db.query(sql,[full_name,email,hashed,phone,role||"CUSTOMER"],(err,result)=>{
        if(err)return reject(err);
        resolve(result);
       });

    });

};

//login
exports.loginUser = (email, password) => {
    return new Promise((resolve, reject) => {

        const sql = `SELECT * FROM users WHERE email=?`;

        db.query(sql, [email], async (err, result) => {
            if (err) return reject(err);

            if (result.length === 0) {
                return reject("User not found");
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return reject("Invalid password");
            }

            const token = generateToken(user);

            delete user.password;

            resolve({
                user,
                token
            });
        });
    });
};


//get all users
exports.getAllUser=()=>{
    return new Promise((resolve,reject)=>{
        const sql=`SELECT * FROM users`;

        db.query(sql,(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        });
    });
};

//getuserbyid
exports.getUserById=(id)=>{
    return new Promise((resolve,reject)=>{
        const sql=`SELECT * FROM users where User_id=?`;

        db.query(sql,[id],(err,result)=>{
            if(err) reject(err);
            else resolve(result[0]);
        });
    });
};


//update user profile
exports.updateUser=(id,data)=>{
    const{full_name,phone}=data;

    return new Promise((resolve,reject)=>{
        const sql=`update users set full_name=?,phone=? where user_id=?`;

         db.query(sql,[full_name,phone,id],(err,result)=>{
            if(err) reject(err);
            else resolve(result);
        });
    });
};

// DELETE USER
exports.deleteUser = (id) => {
return new Promise((resolve, reject) => {
    db.query("DELETE FROM users WHERE user_id=?", [id], (err, result) => {
if (err) reject(err);
else resolve(result);
    });
  });
};

