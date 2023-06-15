const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors')
const app = express()
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://abra:3V0SXMbx6augm3NF@cluster0.9uyrjje.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const productCollection = client.db("reservation").collection("bookings");
        const usersCollection = client.db("reservation").collection("users");
        // Send a ping to confirm a successful connection


        app.post("/reserveSit", async (req, res) => {
            const bookings = req.body;
            const result = await productCollection.insertOne(bookings);
            res.send(result);
            console.log(result);
        });


        app.post("/user", async (req, res) => {
            const users = req.body;
            const result = await usersCollection.insertOne(users);
            res.send(result);
            console.log(result);
        });



        await client.db("admin").command({ ping: 1 });
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch((error) => console.log(error));

app.get('/', (req, res) => {
    res.send('restaurant server is running')
})

app.listen(port, () => {
    console.log(`app is running in port ${port}`)
})
