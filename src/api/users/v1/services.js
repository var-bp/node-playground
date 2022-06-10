import { validationResult } from 'express-validator';
import errorFormatter from '../../../utils/errorFormatter';
import removeDuplicate from '../../../utils/removeDuplicate';
import pool from '../../../db';
import logger from '../../../logger';

const getUsers = async (req) => {
  const response = {
    statusCode: 200,
  };
  const validationErrors = validationResult(req);
  const client = await pool.connect();
  try {
    if (validationErrors.isEmpty() && req.query.gender) {
      response.data = await client.query('SELECT * FROM "user" WHERE gender = $1', [req.query.gender]);
    } else {
      response.data = await client.query('SELECT * FROM "user"');
    }
  } catch (error) {
    logger.error(error);
    response.statusCode = 500;
    response.error = {
      code: 500,
      message: 'Internal server error',
    };
  } finally {
    client.release();
  }
  return response;
};

const getUser = async (req) => {
  const response = {
    statusCode: 200,
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (errors.isEmpty()) {
    const client = await pool.connect();
    try {
      response.data = await client.query('SELECT * FROM "user" WHERE id = $1', [req.params.id]);
    } catch (error) {
      logger.error(error);
      response.statusCode = 500;
      response.error = {
        code: 500,
        message: 'Internal server error',
      };
    } finally {
      client.release();
    }
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
  } else {
    const client = await pool.connect();
    try {
      const found = await client.query('SELECT EXISTS (SELECT 1 FROM "user" WHERE email = $1) AS "exists"', [
        req.body.email,
      ]);
      if (found.rows[0].exists) {
        response.statusCode = 422;
        response.error = {
          code: 422,
          message: 'Duplicated data',
        };
      } else {
        await client.query('INSERT INTO "user" (first_name, email, age, gender) VALUES ($1, $2, $3, $4)', [
          req.body.first_name,
          req.body.email,
          req.body.age,
          req.body.gender,
        ]);
        response.statusCode = 201;
        response.data = req.body;
      }
    } catch (error) {
      logger.error(error);
      response.statusCode = 500;
      response.error = {
        code: 500,
        message: 'Internal server error',
      };
    } finally {
      client.release();
    }
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
    const client = await pool.connect();
    try {
      const found = await client.query('SELECT EXISTS (SELECT 1 FROM "user" WHERE id = $1) AS "exists"', [
        req.params.id,
      ]);
      if (found.rows[0].exists) {
        await client.query('INSERT INTO "user" (first_name, email, age, gender) VALUES ($1, $2, $3, $4)', [
          req.body.first_name,
          req.body.email,
          req.body.age,
          req.body.gender,
        ]);
        response.statusCode = 200;
        response.data = req.body;
      } else {
        response.statusCode = 404;
        response.error = {
          code: 404,
          message: 'Data not found',
        };
      }
    } catch (error) {
      logger.error(error);
      response.statusCode = 500;
      response.error = {
        code: 500,
        message: 'Internal server error',
      };
    } finally {
      client.release();
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
    const client = await pool.connect();
    try {
      const found = await client.query('SELECT EXISTS (SELECT 1 FROM "user" WHERE id = $1) AS "exists"', [
        req.params.id,
      ]);
      if (found.rows[0].exists) {
        await client.query('DELETE FROM "user" WHERE id = $1', [req.params.id]);
        response.statusCode = 200;
        response.data = { deleted: req.params.id };
      } else {
        response.statusCode = 404;
        response.error = {
          code: 404,
          message: 'Data not found',
        };
      }
    } catch (error) {
      logger.error(error);
      response.statusCode = 500;
      response.error = {
        code: 500,
        message: 'Internal server error',
      };
    } finally {
      client.release();
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
