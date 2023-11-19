const User = require('../model/user')

// route for uploading the image
exports.uploadUserImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
  
    req.body.filename = req.file.filename;
    res.status(200).json({
        message: 'File uploaded successfully',
        filename: req.body.filename,
    });

};

//register new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, filename } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'email is required' });
        }
        if (!name) {
            return res.status(400).json({ error: 'name is required' });
        }
        if (!password) {
            return res.status(400).json({ error: 'password is required' });
        }

        const user = await User.query().where('email', email).first();
        if (!user) {
            const userId = await User.query().insertGraph({
                name: name,
                email: email,
                password: password,
                profile_photo: `${process.env.SERVER_URL}uploads/user/${filename}`
            });
            return res.status(201).json(userId);
        } else {
            res.status(409).json({ message: 'email already exist' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'failed to register user' });
    }
};

//login user
exports.getAUser = async (req, res) => {
    try {
        //deconstructing email from request body
        const { email, password } = req.body;

        // Query the database to find a user by email and password
        const user = await User.query().where('email', email).first();
        const userPassword = await User.query().where('password', password).first();

        if (user && userPassword) {
            // User found, send it as a response
            res.status(200).json(user);
        } else {
            // User not found
            res.status(404).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.query();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

