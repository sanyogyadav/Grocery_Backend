var User = require("../models/user.model");

exports.signup = async (req, res, next) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.send({message: "Email already in use try different email ID" });
        }
        let user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.address = req.body.address;
        user.pincode = req.body.pincode;

        let newPassword = req.body.password;
        let confirmPassword = req.body.cPassword;

        if (newPassword != confirmPassword) {
            return res.send({ message : "Password doesn't match"});
        }
        user.password = await user.encryptPassword(newPassword);
        user.confirmPassword =await user.encryptPassword(confirmPassword);
        // console.log(user.password,"Saving the encrypted password");

        await user.save();

        return res.send({user, message: "Signup Successfull" });
    } catch (err) {
        next (err);
    }
}

exports.login = async (req, res, next) => {

    try {
        const username = req.body.username;
        const password = req.body.password;
        const existUser = await User.findOne({ username });

        if(!existUser) {
            return res.status(401).send({ message : "No account exists with this username"});
        }

        const validPassword = await existUser.validPassword(password);
        if(!validPassword) {
            res.status(401).send({ message : "Wrong password"});
        }

        return res.status(200).send({ existUser, message : "Login Successfully" });
    }
    catch(err) {
        next(err);
    }
}