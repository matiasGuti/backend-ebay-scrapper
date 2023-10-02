const express = require('express');
const cors = require('cors');
const {
  getArrayWithInputData,
  createURL,
  getSoldListingHistory,
} = require('./libs/scrapperFunctions');

const app = express();

app.listen(3000, console.log('SERVER ON'));

app.use(express.json());

app.use(cors());

// --------------------------- RUTAS ---------------------------
app.post('/products', async (req, res) => {
  try {
    const { url } = req.body;

    const productData = await getArrayWithInputData(url);
    const { historyURL, wordsArray } = createURL(productData);
    const productHistory = await getSoldListingHistory(historyURL);

    const responseData = {
      currentProduct: productData,
      history: productHistory,
      wordsArray,
    };

    res.send(responseData);
  } catch (error) {
    console.log(error.message);
  }
});
