DROP TABLE IF EXISTS "user";

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  age NUMERIC(2) NOT NULL,
  gender VARCHAR(6) NOT NULL
);

INSERT INTO "user" (first_name, email, age, gender)
VALUES
  ('James', 'james@gmail.com', 30, 'male'),
  ('Mary', 'mary@gmail.com', 18, 'female');
