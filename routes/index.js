const express = require('express');

const router = express.Router();

router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    console.log(req.params);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
