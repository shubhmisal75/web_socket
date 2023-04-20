const express = require("express");
const router = express.Router();
const stockController = require("../controller/stock_controller");

router.post("/InsertStock", stockController.insertStock);
router.put("/UpdateStock/:stockId", stockController.updateStock);
router.get("/GetStockById/:stockId", stockController.getStockById);
router.get("/GetStocks", stockController.getStocks);
router.delete("/DeleteStock/:stockId", stockController.deleteStockById);
module.exports = router;
