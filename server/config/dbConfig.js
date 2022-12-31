const mongoose=require("mongoose")
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE)
const connection=mongoose.connection
connection.on('connected',()=>{
    console.log('MongoDB est Connecté')
})

connection.on("error",(error)=>{
    console.log("Erreur lors de la connexion",error)
})

module.exports=mongoose