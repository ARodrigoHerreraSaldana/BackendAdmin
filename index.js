import express from 'express';

import pkg from 'pg';
const { Pool} = pkg
import bodyParser from 'body-parser';
import path from 'path';
import { __dirname } from './dirname.js';
import { registerUser,validateUser,setToFalse,setToTrue } from './helpers/storedProcedure.js';
import cors from 'cors';

const port = process.env.PORT || 5006;
const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
app.use(cors())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.post('/newUser', async (req, res) => {
  console.log('req.body', req.body)
  let querytest=registerUser(req.body)
  console.log('querytest', querytest)
  try {
    const client = await pool.connect();
    const result = await client.query(querytest);
    client.release();
    res.status(200).send({ success: 'User Added to the database' });
  } catch (err) {
    console.error('Error during user registration:', err.message);
    res.status(400).send({ error: (err.message) });
  }
});


app.post('/checkUser', async (req, res) => {
  console.log('req.body', req.body)
  let querytest=validateUser(req.body)
  console.log('querytest', querytest)
  try {
    console.log('sadasvd')
    const client = await pool.connect();
    const result = await client.query(querytest);
    client.release();
    console.log(result.rows[0])
    if(result.rows[0]==true)
    {
    res.status(200).send({ response:'valid password and email' });
    }
    else if(result.rows[0]==false){
      res.status(400).send({ response:'Invalid password and email' }); 
    }
  } catch (err) {
    console.error('Error during user registration:', err.message);
    res.status(400).send({ response: (err.message) });
  }
  
});


app.post('/setFalse', async (req, res) => {
  console.log('req.body', req.body)
  let querytest=setToFalse(req.body)
  console.log('querytest', querytest)
  try {
    const client = await pool.connect();
    const result = await client.query(querytest);
    client.release();
    console.log(result.rows[0])
    res.status(200).send({ response:'Their status changed to False' });
  } catch (err) {
    console.error('Error during user registration:', err.message);
    res.status(400).send({ response: (err.message) });
  }
  
});


app.post('/setTrue', async (req, res) => {
  console.log('req.body', req.body)
  let querytest=setToTrue(req.body)
  console.log('querytest', querytest)
  try {
    const client = await pool.connect();
    const result = await client.query(querytest);
    client.release();
    console.log(result.rows[0])
    res.status(200).send({ response:'Their status changed to True' });
  } catch (err) {
    console.error('Error during user registration:', err.message);
    res.status(400).send({ response: (err.message) });
  }
  
});

app.get('/lastLogin', async (req, res) => {
  console.log('req.body', req.body)
  let querytest=`SELECT CONCAT(first_name, ' ', last_name) AS full_name , occupation, email, created_at, status 
  FROM users;`
  console.log('querytest', querytest)
  try {
    const client = await pool.connect();
    const result = await client.query(querytest);
    client.release();
    res.status(200).send(result.rows);
  } catch (err) {
    console.error('Error during user registration:', err.message);
    res.status(400).send();
  }
  
});

app.get("/db", async (req, res) => {
  console.log(`Rendering the results of a database query for route '/db'`);
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * from users");
    console.log(result.rows);
    client.release();
  } catch (err) {
    console.error('Database query error:', err.message);
    res.send("Error " + err);
  }
});


const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: gracefully shutting down");
  if (server) {
    server.close(() => {
      console.log("HTTP server closed");
    });
  }
});