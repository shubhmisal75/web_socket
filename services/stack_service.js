const validateBody = require("../validations");
const StockModel = require("../model/stock_model");
const ObjectId = require("mongoose").Types.ObjectId;

//----insert stock
const insertStock = async (req, res) => {
  try {
    var StockDetails = req.body;
    var { stock_name, stock_price } = StockDetails;

    if (!validateBody.isValid(stock_name)) {
      return res.status(400).send({
        status: false,
        message: "Please provide stock_name",
      });
    }
    if (!validateBody.isValid(stock_price)) {
      return res.status(400).send({
        status: false,
        message: "Please provide stock_price",
      });
    }

    StockModel.findOne({ stock_name: stock_name }).then(async (result, err) => {
      if (result == null) {
        let InsertData = { stock_name, stock_price };
        const stockData = await StockModel.create(InsertData);

        return res.status(200).send({
          status: true,
          message: "Success",
          stock: stockData,
        });
      } else {
        return res
          .status(409)
          .send({ status: false, message: "stock already exist" });
      }
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----update stock
const updateStock = async (req, res) => {
  try {
    var StockData = req.body;
    const stockId = req.params.stockId;
    var { stock_name, stock_price } = StockData;

    let checkForParams = ObjectId.isValid(stockId);
    if (!checkForParams) {
      return res.status(400).send({
        status: false,
        message: "Please Provide a valid Id in path params",
      });
    }

    if (!validateBody.isValid(stock_name)) {
      return res.status(400).send({
        status: false,
        message: "Please provide email",
      });
    }
    if (!validateBody.isValid(stock_price)) {
      return res.status(400).send({
        status: false,
        message: "Please provide stock_price",
      });
    }

    StockModel.findOne({
      $and: [{ stock_name: stock_name }, { _id: { $ne: stockId } }],
    }).then(async (result, err) => {
      if (result == null) {
        var updateStockDetails = await StockModel.findOneAndUpdate(
          { _id: stockId },
          {
            $set: {
              stock_name: stock_name,
              stock_price: stock_price,
            },
          },
          { new: true }
        );
        return res.status(200).send({
          status: true,
          message: "Success",
          stock: updateStockDetails,
        });
      } else {
        return res
          .status(409)
          .send({ status: false, message: "stock_name already exist" });
      }
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

const getStocks = async (req, res) => {
  try {
    let getAllStocks = await StockModel.find();
    if (getAllStocks.length < 0) {
      return res
        .status(404)
        .send({ status: false, message: "stock not found" });
    }
    return res
      .status(200)
      .send({ status: true, message: "Success", stocks: getAllStocks });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----get stock by id
const getStockById = async (req, res) => {
  try {
    const stockId = req.params.stockId;
    let checkForParams = ObjectId.isValid(stockId);
    if (!checkForParams) {
      return res.status(400).send({
        status: false,
        message: "Please Provide a valid Id in path params",
      });
    }
    let getStock = await StockModel.findById({ _id: stockId });
    if (getStock == null) {
      return res
        .status(404)
        .send({ status: false, message: "stock not found" });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "Success", stock: getStock });
    }
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----delete stock by id
const deleteStockById = async (req, res) => {
  try {
    const stockId = req.params.stockId;
    let checkForParams = ObjectId.isValid(stockId);
    if (!checkForParams) {
      return res.status(400).send({
        status: false,
        message: "Please Provide a valid Id in path params",
      });
    }
    let deleteStock = await StockModel.deleteOne({ _id: stockId });
    return res
      .status(200)
      .send({ status: true, message: "Success", stock: deleteStock });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

module.exports = {
  insertStock: insertStock,
  updateStock: updateStock,
  getStocks: getStocks,
  getStockById: getStockById,
  deleteStockById: deleteStockById,
};
