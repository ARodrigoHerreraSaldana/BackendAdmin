import express from "express";

import pkg from "pg";
const { Pool } = pkg;
import bodyParser from "body-parser";
import path from "path";
import { __dirname } from "./dirname.js";
import {
  registerUser,
  validateUser,
  setToFalse,
  setToTrue,
} from "./helpers/storedProcedure.js";
import cors from "cors";

const port = process.env.PORT || 5006;
const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.post("/newUser", async (req, res) => {
  let querytest = registerUser(req.body);

  try {
    var client = await pool.connect();
    var result = await client.query(querytest);
    res.status(200).send({ success: "User Added to the database" });
  } catch (err) {
    console.error("Error during user registration:", err.message);
    res.status(400).send({ error: err.message });
  } finally {
    client.release();
  }
});

app.post("/checkUser", async (req, res) => {
  let querytest = validateUser(req.body);

  try {
    var client = await pool.connect();
    var result = await client.query(querytest);

    if (result.rows[0].validatepasswordandemail == true) {
      res.status(200).send({ response: "valid password and email" });
    } else if (result.rows[0].validatepasswordandemail == false) {
      res.status(400).send({ response: "Invalid password and email" });
    }
  } catch (err) {
    console.error("Error during user registration:", err.message);
    res.status(400).send({ response: err.message });
  } finally {
    client.release();
  }
});

app.post("/setFalse", async (req, res) => {
  let querytest = setToFalse(req.body);

  try {
    var client = await pool.connect();
    var result = await client.query(querytest);

    res.status(200).send({ response: "Their status changed to False" });
  } catch (err) {
    console.error("Error during user registration:", err.message);
    res.status(400).send({ response: err.message });
  } finally {
    client.release();
  }
});

app.post("/setTrue", async (req, res) => {
  let querytest = setToTrue(req.body);

  try {
    var client = await pool.connect();
    var result = await client.query(querytest);

    res.status(200).send({ response: "Their status changed to True" });
  } catch (err) {
    console.error("Error during user registration:", err.message);
    res.status(400).send({ response: err.message });
  } finally {
    client.release();
  }
});

app.get("/lastLogin", async (req, res) => {
  let querytest = `SELECT CONCAT(first_name, ' ', last_name) AS full_name , occupation, email, created_at, status 
  FROM users;`;

  try {
    var client = await pool.connect();
    var result = await client.query(querytest);
    res.status(200).send(result.rows);
  } catch (err) {
    console.error("Error during user registration:", err.message);
    res.status(400).send();
  } finally {
    client.release();
  }
});

const server = app.listen(port, () => {});

process.on("SIGTERM", async () => {
  if (server) {
    server.close(() => {});
  }
});
