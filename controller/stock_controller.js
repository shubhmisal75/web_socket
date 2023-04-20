const userModel = require("../model/user_model");
const stockservices = require("../services/stack_service");

//----insert Stock
const insertStock = async (req, res) => {
  try {
    const result = await stockservices.insertStock(req, res);
  } catch (err) {
    console.log(err);
  }
};

//----update Stock
const updateStock = async (req, res) => {
  try {
    const result = await stockservices.updateStock(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----get Stocks
const getStocks = async (req, res) => {
  try {
    const result = await stockservices.getStocks(req, res);
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----get Stock by id
const getStockById = async (req, res) => {
  try {
    const result = await stockservices.getStockById(req, res);
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----delete Stock by id
const deleteStockById = async (req, res) => {
  try {
    const result = await stockservices.deleteStockById(req, res);
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//-----exports//
module.exports = {
  insertStock: insertStock,
  updateStock: updateStock,
  getStocks: getStocks,
  getStockById: getStockById,
  deleteStockById: deleteStockById,
};
