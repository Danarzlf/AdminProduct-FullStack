const router = require("express").Router();

// controller
const Product = require("../controller/productController");

// middleware
const Authentication = require("../middlewares/authenticate");
const Uploader = require("../middlewares/uploader");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkCredentials");

router.get("/", Product.findAllProducts);
router.post(
  "/",
  Authentication,
  Uploader.single("image"),
  Product.createProduct
);
router.get("/search", Authentication, Product.searchProduct);
router.get("/ownership", Authentication, Product.findProductsByOwnership);
router.get("/:id", Authentication, Product.findProductById);
router.put(
  "/:id",
  Authentication,
  Uploader.single("image"),
  Product.updateProduct
);
router.delete("/:id", Authentication, Product.deleteProduct);

module.exports = router;
