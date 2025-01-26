import express from 'express';
import cool from 'cool-ascii-faces';
import pkg from 'pg';
const { Pool} = pkg
import bodyParser from 'body-parser';
import path from 'path';
import { __dirname } from './dirname.js';
import { registerUser } from './helpers/storedProcedure.js';

const port = process.env.PORT || 5006;
const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.post('/newUser', async (req, res) => {
  let querytest=registerUser(req.body.text)
  console.log(req.body)
  console.log('querytest', querytest)
  try {
    const client = await pool.connect();
    const result = await client.query(querytest);
    client.release();
    res.send('User registered successfully');
  } catch (err) {
    console.error('Error during user registration:', err.message);
    res.send(err.message);
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