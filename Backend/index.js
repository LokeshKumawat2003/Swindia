const express = require("express");
const getDb = require("./configr/server");
const EnterRoute = require("./Routes/enterRoutes");
const app = express();
app.use(express.json());
const cors = require('cors');
const LeadsRoute = require("./Routes/leadRoutes");
app.use(cors());
app.get("/", (req, res) => {
  res.send("Home of Routes");
});


app.use("/enter",EnterRoute)
app.use("/api",LeadsRoute)



const getServer = async () => {
  try {
    await app.listen(8080, () => {
      console.log("server is run");
    });
    getDb();
  } catch (error) {
    console.log(`server err ${error}`);
  }
};
getServer();
