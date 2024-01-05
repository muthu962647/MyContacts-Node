const asyncHandler = require("express-async-handler");
const {connection} = require("../config/dbconnection");
const catchHandler = require('../middleware/catchHandler')

const getContacts = asyncHandler( (req,res) => {
    res.status(200).json({ message: "Get all contacts"});
});

const createContact = asyncHandler( async (req,res) => {
    const {name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are mandatory");
    };

    try{
        await connection.execute(
            'Insert into contacts (name, email, phone) values (?, ?, ?)',
            [name, email, phone]
            );

    }catch(err){
        console.log("Error:", err);
    }

    

    res.status(201).json({message: "Create Contact"});
});


const getContact = catchHandler(async (req,res) => {
    const id = req.params.id;

    console.log(id);

        const [results]  = await connection
        .promise()
        .query(`Select * from contacts where id=${id}`)

        console.log(results);
        // res.json(results);

    
    res.status(200).json({message: `Get Contact for ${req.params.id}`, results});
}); 

const updateContact = catchHandler(async (req,res) => {
    const {name , email, phone} = req.body;
    
    console.log(catchHandler(()=>{
        console.log("Silukku marame");
    }));
    let sql = 'Update contacts set ';
    let values = [];

    console.log(req.body);
    if(name){

        sql += 'name = ?,';
        values.push(name);

    }if(email){

        sql += 'email = ?,';
        values.push(email);

    }if(phone){

        sql += 'phone = ?,';
        values.push(phone);
        
    }

    sql = sql.slice(0,-1);

    sql += " where  id= ?";

    values.push(req.params.id);

    console.log(sql, values);

    await connection.execute(sql,values);

    res.status(200).json({message: `Update Contact for ${req.params.id}`});
});

const deleteContact = asyncHandler(async (req,res) => {

    await connection.execute(`Delete From contacts where id =  ${req.params.id}`)
    res.status(200).json({message : `Contact Deleted ${req.params.id}`})
});

module.exports = { getContact, updateContact,deleteContact,getContacts, createContact}