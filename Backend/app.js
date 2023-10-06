const express = require('express');
const app = express();

const cors =require('cors');
const morgan=require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

const db = require("../Backend/db/index");

require('dotenv').config()
const PORT=process.env.PORT;

const api=require("../Backend/router/router");
app.use('/',api);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});