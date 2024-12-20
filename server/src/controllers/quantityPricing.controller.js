const { API_REQUEST_URL, API_SECURE_URL, API_PRIVATE_KEY, API_TOKEN } = process.env;

async function getQuantityPricing(req, res, next) {
  let { catalogId } = req.params;

  let request = await fetch(`${API_REQUEST_URL}/Products/${catalogId}/Discount`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      SecureURL: API_SECURE_URL,
      PrivateKey: API_PRIVATE_KEY,
      Token: API_TOKEN,
    },
  });

  if (!request.ok) {
    return res.status(request.status).json({
      message: `${request.status} | Unable to fetch product quantity pricing`,
    });
  }

  let response = await request.json();
  res.status(200).json({
    message: `Quantity pricing retrieved successfully (ID: ${catalogId}) ✅`,
    data: response,
  });
}

module.exports = { getQuantityPricing };
