const express = require("express")
const mongoose = require("mongoose")

const PORT = 3000

const app = express()

app.use(express.json());

//mongodb connection..

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/mydatabase', {
  
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1); // Exit process with failure
    }
  };

  connectDB()

  //creating schema

    const schema = {
        name:String,
        email:String,
        age:Number,
        id:Number
    }
  
    const model = mongoose.model("friendcollection", schema)

    //post  req..

    app.post("/post", async(req, res) =>{
        console.log("post succesfully")

        const data = new model({
            name:req.body.name,
            email:req.body.email,
            age:req.body.age,
            id:req.body.id
        })

        const value = await data.save()
        res.send("succesfully completed")
    } )

    // PUT Method

    app.put("/put/:id", async(req,res) => {

       let uid = req.params.id;
       let upname = req.body.name;
       let umail = req.body.email;
       let uage = req.body.uage

      
       try {
       const updatedata = await model.findOneAndUpdate(
        {id:uid},
        {$set:{
            name:upname, 
            email:umail, 
            age:uage,
              id:uid}}, 
        {new:true} 
        )

          if(!updatedata)
            {
                res.send("No data found with the given id")
            }else{
                res.send(updatedata)
            }
          }  catch (err) {
                console.log(err);
                res.status(500).send("error updating data")

            }

       })

    //GET method..

    app.get("/get/:id" ,function (req, res){
        getid =req.params.id;
        model.find(({id:getid}),function(err, value){

            res.send(value)

        })
            
        
    })

  app.listen(PORT,() => {
    console.log(`server is running on ${PORT}`)
  })