const mysql=require("mysql2")

const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"manager",
    database:"hotel_booking"
});

db.connect(err=>{
    if(err) console.log(err);
    else console.log("MySQL Connection");
});

module.exports=db;