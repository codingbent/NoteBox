const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

//CREATE A USER USING : POST "/API/AUTH" Doesn't require auth

router.post(
    "/createuser",
    [
        body("name").isLength({ min: 3 }),
        body("password").isLength({ min: 8 }),
        body("email").isEmail(),
    ],
    async (req, res) => {
        var success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({ success: false, errors: "Sorry user exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const secpass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: secpass,
                email: req.body.email,
            });
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(data, process.env.JWT_SECRET);
            //console.log(authtoken);
            success = true;
            res.json({ success, authtoken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json(success, "Internal server error");
        }
    }
);
//CREATE A USER USING : POST "/API/AUTH" Doesn't require auth

router.post(
    "/login",
    [
        body("password", "Enter a password").exists(),
        body("email", "Enter a valid email").isEmail(),
    ],
    async (req, res) => {
        var success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        //console.log(User.password);

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ error: "Sorry Enter correct credentials" });
            }
            const passwordcompare = await bcrypt.compare(
                password,
                user.password
            );
            //console.log(passwordcompare);

            if (!passwordcompare) {
                success = false;
                return res
                    .status(400)
                    .json({
                        success,
                        error: "Sorry Enter correct credentials",
                    });
            }
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const authtoken = jwt.sign(payload, process.env.JWT_SECRET);
            success = true;
            res.json({
                success,
                authtoken,
                name: user.name,
                email: user.email,
            });
        } catch (e) {
            console.error(e.message);
            //console.log(e.message);

            res.status(500).send("Internal server error");
        }
    }
);
//ROUTE 3: Get logged in details using POST"/api/auth/"
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        user = req.user.id;
        const user = await User.findById(user).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});
module.exports = router;
