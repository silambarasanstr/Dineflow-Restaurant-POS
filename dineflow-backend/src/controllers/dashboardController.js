import {
  getDashboardSummary,
} from "../services/dashboardService.js";

// Get Dashboard Summary
export const getDashboardSummaryController = async (req, res) => {
  try {
    const dashboard = await getDashboardSummary();

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};