const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.services");
const Token = require("../models/Token");
const router = express.Router({ mergeParams: true });

// const signUpValidation = [
//   check("email", "некорректный email").isEmail(),
//   check("password", "минимальная длина пароля 8 символов").isLength({ min: 8 }),
// ];

router.post("/signUp", [
  check("email", "некорректный email").isEmail(),
  check("password", "минимальная длина пароля 8 символов").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            // errors:errors.array()
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        ...req.body,
        ...generateUserData(),
        isAdmin: false,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);
      res.status(201).send({ ...tokens, userId: newUser._id, newUser });
    } catch (error) {
      res.status(500).json({
        message: "на сервере произошла ошибка попробуйте позже",
      });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "email некорректный").isEmail(),
  check("password", "пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }

      const { email, password } = req.body;

      const exitingUser = await User.findOne({ email });
      if (!exitingUser) {
        return res.status(400).send({
          message: {
            error: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        exitingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).send({
          message: {
            error: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ _id: exitingUser._id });
      await tokenService.save(exitingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, userId: exitingUser._id, exitingUser });
    } catch (error) {
      res.status(500).json({
        message: "на сервере произошла ошибка попробуйте позже",
      });
    }
  },
]);

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    const dbToken = await Token.findOne({ refreshToken });

    if (!data || !dbToken || !data._id !== dbToken?.user?.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokens = await tokenService.generate({
      _id: data._id,
    });

    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({
      message: "на сервере произошла ошибка попробуйте позже",
    });
  }
});

module.exports = router;
