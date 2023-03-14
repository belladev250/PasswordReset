require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const register = require("./routes/registerRoute");
const login = require("./routes/loginRoute");
const passRst = require("../Backend/routes/passwordReset");

require("./db");

app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth/signin", login);
app.use("/api/auth/signup", register);
app.use("/api/passReset", passRst);

const port = process.env.PORT;
app.listen(port, console.log(`Listening on port ${port}......`));
