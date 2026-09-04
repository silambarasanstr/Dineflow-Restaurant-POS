import {
  getSalesReport,
  getPaymentReport,
} from "../services/reportService.js";

// Get Sales Report
export const getSalesReportController = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "From date and To date are required",
      });
    }

    const report = await getSalesReport(from, to);

    res.status(200).json({
      success: true,
      message: "Sales report fetched successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Payment Report
export const getPaymentReportController = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "From date and To date are required",
      });
    }

    const report = await getPaymentReport(from, to);

    res.status(200).json({
      success: true,
      message: "Payment report fetched successfully",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};