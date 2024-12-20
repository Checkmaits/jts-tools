function getRates(req, res, next) {
  let { shippingto, items } = req.body;

  let missingFields = [];
  if (!shippingto) missingFields.push("shippingto");
  if (!items) missingFields.push("items");
  if (missingFields.length > 0) {
    let error = new Error(`Missing required fields: ${missingFields.join(",")} ❌`);
    error.status = 400;
    return next(error);
  }

  if (isSampleOrder(items)) {
    return res.status(200).json({
      message: "Shipping rates retrieved successfully ✅",
      shippingmethods: [{ methodname: "Canada Post Lettermail", rate: 0 }],
    });
  }

  // TODO
  return res.status(200).json({
    message: "Shipping rates retrieved successfully ✅",
    shippingmethods: [],
  });
}

function isSampleOrder(items) {
  return items.every((item) => item.sku.toLowerCase() === "sample-1");
}

module.exports = { getRates };
