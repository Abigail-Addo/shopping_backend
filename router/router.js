const router = require('express').Router();
const knex = require('../config/db');

// get all admin
router.get('/Alladmin', async (req, res) => {
  try {
    const admin = await knex('admin').select('*');
    return res.json(admin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})


//login admin user
router.post('/login', async (req, res) => {
  try {
    //deconstructing email from request body
    const { email, password } = req.body;

    // Query the database to find admin by email and password
    const admin = await knex('admin').where({ email }).first();
    const adminPassword = await knex('admin').where({ password }).first();

    if (admin && adminPassword) {
      // admin found, send it as a response
      res.status(200).json(admin);
    } else {
      // admin not found
      res.status(404).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;

//register new user
// router.post('/user', async (req, res) => {
//   try {
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     if (!email) {
//       return res.status(400).json({ error: 'email is required' });
//     }

//     if (!name) {
//       return res.status(400).json({ error: 'name is required' });
//     }
//     if (!password) {
//       return res.status(400).json({ error: 'password is required' });
//     }

//     //check if email is already used
//     const user = await knex('admin').where({ email }).first();

//     if (user) {
//       res.status(409).json({ message: 'email already exist' });
//     } else {
//       const userId = await knex('admin').insert({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//       });

//       const user = await knex('admin').where({ email }).first();
//       const token = {
//         tokenKey: "7-11ee-be56-0242ac120002 ",
//         user
//       }
//       return res.status(201).json(token);
//     }

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'failed to register user' });
//   }
// });
