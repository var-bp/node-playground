import { validationResult } from 'express-validator';
import errorFormatter from '../../../utils/errorFormatter';
import removeDuplicate from '../../../utils/removeDuplicate';

const USERS = [
  {
    id: 1,
    name: 'James',
    email: 'james@gmail.com',
    age: 30,
    gender: 'male',
  },
  {
    id: 2,
    name: 'Mary',
    email: 'mary@gmail.com',
    age: 18,
    gender: 'female',
  },
  // {
  //   id: 3,
  //   name: 'Patricia',
  //   email: 'patricia@gmail.com',
  //   age: 20,
  //   gender: 'female',
  // }
];

const getUsers = async (req) => {
  const response = {
    statusCode: 200,
  };
  const errors = validationResult(req);
  if (errors.isEmpty() && req.query.gender) {
    response.data = USERS.filter((item) => item.gender === req.query.gender);
  } else {
    response.data = USERS;
  }
  return response;
};

const getUser = async (req) => {
  const response = {
    statusCode: 200,
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (errors.isEmpty()) {
    response.data = USERS.filter((item) => item.id === req.params.id);
  } else {
    response.statusCode = 400;
    response.error = {
      code: 400,
      message: removeDuplicate(errors.array()),
    };
  }
  return response;
};

const createUser = async (req) => {
  const response = {};
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    response.statusCode = 400;
    response.error = {
      code: 400,
      message: removeDuplicate(errors.array()),
    };
  } else if (USERS.findIndex((item) => item.id === req.body.id) !== -1) {
    response.statusCode = 422;
    response.error = {
      code: 422,
      message: 'Duplicated data',
    };
  } else {
    USERS.push(req.body);
    response.statusCode = 201;
    response.data = req.body;
  }
  return response;
};

const updateUser = async (req) => {
  const response = {};
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    response.statusCode = 400;
    response.error = {
      code: 400,
      message: removeDuplicate(errors.array()),
    };
  } else {
    const index = USERS.findIndex((item) => item.id === req.params.id);
    if (index !== -1) {
      // eslint-disable-next-line security/detect-object-injection
      const obj = { ...USERS[index], ...req.body };
      USERS.splice(index, 0, obj);
      response.statusCode = 200;
      response.data = obj;
    } else {
      response.statusCode = 404;
      response.error = {
        code: 404,
        message: 'Data not found',
      };
    }
  }
  return response;
};

const deleteUser = async (req) => {
  const response = {
    statusCode: 200,
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    response.statusCode = 400;
    response.error = {
      code: 400,
      message: removeDuplicate(errors.array()),
    };
  } else {
    const index = USERS.findIndex((item) => item.id === req.params.id);
    if (index !== -1) {
      USERS.splice(index, 1);
      response.statusCode = 200;
      response.data = { deleted: req.params.id };
    } else {
      response.statusCode = 404;
      response.error = {
        code: 404,
        message: 'Data not found',
      };
    }
  }
  return response;
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
