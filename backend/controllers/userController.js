const asyncHandler = require(
"express-async-handler"
);

const getProfile = asyncHandler(
async (req, res) => {
res.json({
_id: req.user._id,
name: req.user.name,
email: req.user.email,
role: req.user.role,
});
}
);

module.exports = {
getProfile,
};
