require('dotenv').config()
const knex=require("knex")({
    client:"mysql",
    connection:{
        host:process.env.host,
        user:process.env.user,
        password:process.env.password,
        database:process.env.database
    }
})
knex.schema.createTable("test",(table)=>{
    table.increments("id")
    table.string("name")
    table.string("password")
    table.string("email")
}).then((data)=>{
    console.log("create table");
}).catch((err)=>{
    console.log("table already exist");
})

module.exports=knex