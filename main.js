//finally CRUD operation completed....

const express = require("express")
const { default: mongoose } = require("mongoose")
const mongooes = require("mongoose")

const PORT = 3000

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
    try{
       await mongooes.connect("mongodb://localhost:27017/country")
       console.log("db connected succesfully")
    }catch (err) {
        console.log("db not connceted")
    }
}

connectDB()

//models

// Creating schema
// const schema = new mongoose.Schema({
//     name: String,
//     email: String,
//     age: Number,
//     id: Number
// });

// const model = mongoose.model("friendcollection", schema);

const userschema = new mongoose.Schema({
    name:String,
    email:String,
    phonenumber:Number
})

const user = mongoose.model("user", userschema)

//posting data  

app.post("/post", async (req, res) =>{
    
    try{
        const data = new user({
            name:req.body.name,
            email:req.body.email,
            phonenumber:req.body.Number
        })
         await data.save();
        res.send('succesfully posted')
        console.log('value')
    
    }catch (err) {
        console.log('ERROR IN POSTING', err)
   
    }

})

//fetching

app.get('/get', async(req, res) =>{
    try{
        const result = await user.findOne({
            name:req.body.name
        })
        console.log('processing')
        res.json(result)

    }catch (err) {
        console.log("ERROR ON FETCHINg" , err)
    }
})

//updating

app.put("/update", async(req, res) => {
    try{
        const result = await user.findOneAndUpdate( 
            { name: req.body.name }, // Find user by name
            {
                email: req.body.email,
                phonenumber: req.body.phonenumber,
            },
            { new: true, runValidators: true } // Options to return the updated document
        
        )
        console.log("updating")
        res.json(result)
    }catch (err) {
        console.log("ERROR ON UPDATING", err)
    }
})

//deleting

app.delete("/deleting", async(req, res) => {
    try{
        const result = await user.findOneAndDelete( 
            { name: req.body.name }, // Find user by name
            
            { new: true, runValidators: true } // Options to return the updated document
        
        )
        console.log("processing")
        res.json("succefully deleted")
    }catch (err) {
        console.log("ERROR ON deleting", err)
    }
})

app.listen(PORT , () => {
    console.log("server is running on 3000")
}
    
)