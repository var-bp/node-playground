import * as yup from 'yup';

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

const ID_SCHEMA = yup.number().positive().integer().required();
const GENDER_SCHEMA = yup.string().lowercase().trim().oneOf(['female', 'male']).required();
const USER_SCHEMA = yup
  .object()
  .shape({
    id: ID_SCHEMA,
    name: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().required(),
    gender: GENDER_SCHEMA,
  })
  .required();
const OPTIONAL_USER_SCHEMA = yup
  .object()
  .shape({
    id: yup.number().positive().integer(),
    name: yup.string(),
    email: yup.string().email(),
    age: yup.number().positive().integer(),
    gender: yup.string().lowercase().trim().oneOf(['female', 'male']),
  })
  .strict();

const getUsers = async (query) => {
  const response = {
    statusCode: 200,
  };
  const isGenderValid = await GENDER_SCHEMA.isValid(query.gender);
  if (isGenderValid) {
    response.data = USERS.filter((item) => item.gender === query.gender);
  } else {
    response.data = USERS;
  }
  return response;
};

const getUser = async (params) => {
  const response = {
    statusCode: 200,
  };
  const isIdValid = await ID_SCHEMA.isValid(params.id);
  if (isIdValid) {
    response.data = USERS.filter((item) => item.id === parseInt(params.id, 10));
  } else {
    response.data = [];
  }
  return response;
};

const createUser = async (body) => {
  const response = {};
  const isUserValid = await USER_SCHEMA.isValid(body);
  const index = USERS.findIndex((item) => item.id === body.id);
  if (!isUserValid) {
    response.statusCode = 400;
    response.error = {
      code: 400,
      message: 'Input data is invalid',
    };
  } else if (index !== -1) {
    response.statusCode = 422;
    response.error = {
      code: 422,
      message: 'Duplicated data',
    };
  } else {
    USERS.push(body);
    response.statusCode = 201;
    response.data = body;
  }
  return response;
};

const updateUser = async (params, body) => {
  const response = {};
  const [isIdValid, isBodyValid] = await Promise.all([
    ID_SCHEMA.isValid(params.id),
    OPTIONAL_USER_SCHEMA.isValid(body),
  ]);
  if (!isIdValid || !isBodyValid) {
    response.statusCode = 400;
    response.error = {
      code: 400,
      message: 'Input data is invalid',
    };
  } else {
    const index = USERS.findIndex((item) => item.id === parseInt(params.id, 10));
    if (index !== -1) {
      const obj = { ...USERS[index], ...body };
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

const deleteUser = async (params) => {
  const response = {
    statusCode: 200,
  };
  const isIdValid = await ID_SCHEMA.isValid(params.id);
  if (!isIdValid) {
    response.statusCode = 400;
    response.error = {
      code: 400,
      message: 'Input data is invalid',
    };
  } else {
    const index = USERS.findIndex((item) => item.id === parseInt(params.id, 10));
    if (index !== -1) {
      USERS.splice(index, 1);
      response.statusCode = 200;
      response.data = { deleted: params.id };
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
