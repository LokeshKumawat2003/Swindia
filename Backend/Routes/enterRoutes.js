const express = require("express");
const UserModel = require("../Models/signup");
const EnterRoute = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
EnterRoute.get("/signup", async (req, res) => {
  const Check = await UserModel.find();
  res.send(Check);
});

EnterRoute.post("/signup", async (req, res) => {
  const { name, email, password, role, status } = req.body;
  const Check_exist = await UserModel.findOne({ email });
  try {
    if (Check_exist) {
      res.status(404).send({ response: "user already registerd please login" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 4);
      const userDetail = new UserModel({
        name,
        email,
        password: hashedPassword,
        role,
        status,
      });
      const saveDetails = await userDetail.save();
      console.log(saveDetails);
      res
        .status(201)
        .send({ response: "User registered successfully", user: saveDetails });
    }
  } catch (error) {
    res.status(404).send({ response: "Rigerter Err", err: error });
  }
});

EnterRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  try {
    if (!user) {
      res.status(400).send({ response: "User not found" });
    }
    const isvalidPassword = await bcrypt.compare(password, user.password);
    if (!isvalidPassword) {
      return res.status(401).send({ response: "Invalid Password" });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, "lokesh");
    res.status(200).send({ response: "Login successful", token });
  } catch (error) {
    res.status(500).send({ response: "Login error", error });
  }
  let token = req.headers.token;
  console.log("Raw Token:", token);
});

EnterRoute.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send("Authorization token is required");
    }

    const tokenValue = token.replace('Bearer ', '');

    const decoded = jwt.verify(tokenValue, "lokesh");

    
    const user = await UserModel.findById(decoded.id);
    console.log(user)
    
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user)
    res.status(202).json({ user });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = EnterRoute;
