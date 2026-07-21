const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Generate JWT Token
const generateToken = (id) => {
return jwt.sign(
{ id },
process.env.JWT_SECRET,
{
expiresIn: "30d",
}
);
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
const { name, email, password } = req.body;

if (!name || !email || !password) {
return res.status(400).json({
message: "Please provide all required fields",
});
}

const existingUser = await User.findOne({
email,
});

if (existingUser) {
return res.status(400).json({
message: "User already exists",
});
}

const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(
password,
salt
);

const user = await User.create({
name,
email,
password: hashedPassword,
});

return res.status(201).json({
_id: user._id,
name: user.name,
email: user.email,
role: user.role,
token: generateToken(user._id),
});
});

// Login User
const loginUser = asyncHandler(async (req, res) => {

console.log("LOGIN BODY =>", req.body);

if (!req.body) {
return res.status(400).json({
message: "Request body missing",
});
}

const { email, password } = req.body;

if (!email || !password) {
return res.status(400).json({
message: "Please provide email and password",
});
}

const user = await User.findOne({
email,
});

if (
user &&
(await bcrypt.compare(
password,
user.password
))
) {
return res.json({
_id: user._id,
name: user.name,
email: user.email,
role: user.role,
token: generateToken(user._id),
});
}

return res.status(401).json({
message: "Invalid email or password",
});
});

module.exports = {
registerUser,
loginUser,
};
