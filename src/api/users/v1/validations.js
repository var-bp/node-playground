/* eslint-disable security/detect-non-literal-fs-filename */
import { body, query, param } from 'express-validator';

const getUsers = query('gender').optional({ checkFalsy: true }).trim().isIn(['female', 'male']);

const getUser = param('id').exists({ checkFalsy: true }).isInt({ allow_leading_zeroes: false, gt: 0 }).toInt();

const createUser = [
  // body('id').exists({ checkFalsy: true }).isInt({ allow_leading_zeroes: false, gt: 0 }).toInt(),
  body('first_name').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('age').exists({ checkFalsy: true }).isInt({ allow_leading_zeroes: false, gt: 0 }).toInt(),
  body('gender').optional({ checkFalsy: true }).trim().isIn(['female', 'male']),
];

const updateUser = [
  param('id').exists({ checkFalsy: true }).isInt({ allow_leading_zeroes: false, gt: 0 }).toInt(),
  // body('id').exists({ checkFalsy: true }).isInt({ allow_leading_zeroes: false, gt: 0 }).toInt(),
  body('first_name').optional({ checkFalsy: true }).isString().trim().escape(),
  body('email').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
  body('age').optional({ checkFalsy: true }).isInt({ allow_leading_zeroes: false, gt: 0 }).toInt(),
  body('gender').optional({ checkFalsy: true }).trim().isIn(['female', 'male']),
];

const deleteUser = param('id').exists({ checkFalsy: true }).isInt({ allow_leading_zeroes: false, gt: 0 }).toInt();

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
