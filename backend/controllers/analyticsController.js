const asyncHandler = require("express-async-handler");
const { getDashboardAnalytics: buildDashboardAnalytics } = require("../services/analytics/businessAnalyticsService");

const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const analytics = await buildDashboardAnalytics({
    userId: req.user._id,
    workspaceId: req.query.workspaceId,
  });

  res.json({ success: true, data: analytics });
});

module.exports = { getDashboardAnalytics };
