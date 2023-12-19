import express from 'express';
import userAuthController from '../controllers/userAuthController';
import validate from '../../../validation/validatorClass';
import { createUserSchema, loginUserSchema } from '../validation/user';

const router = express.Router();

router.post(
  '/signup',
  validate(createUserSchema),
  userAuthController.createUserAuthController
);

router.post(
  '/login',
  validate(loginUserSchema),
  userAuthController.loginUserAuthController
);

export default router;
