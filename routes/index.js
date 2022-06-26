const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');
const axios = require('axios').default;
const User = require('../Models/User');

router.get('/user-registration', async (req, res) => {
  res.render('signup');
});

router.post('/user-registration', async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      email,
      password: plainTextPassword,
      country,
      address
    } = req.body;

    const password = await bcrypt.hash(plainTextPassword, 10);

    // save a user to mongodb
    const user = new User({
      name,
      email,
      password,
      country,
      address
    });

    await user.save();

    axios({
      method: 'PUT',
      url: `https://management.azure.com/subscriptions/${process.env.AZURE_SUB_ID}/resourceGroups/API_RG/providers/Microsoft.ApiManagement/service/GMapsAPI/users/${user._id}?api-version=2021-08-01`,
      data: JSON.stringify({
        properties: {
          firstName: name.split(' ')[0],
          lastName: name.split(' ')[1] === undefined ? '.' : name.split(' ')[1],
          email: email,
          confirmation: 'signup'
        }
      })
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (err) {
    console.log(err);
  }
});

router.get('/:productId', async (req, res) => {
  try {
    res.redirect(
      '/api/delegation/user-registration?productId=' + req.params.productId
    );
    console.log(req.params);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
