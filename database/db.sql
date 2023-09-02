CREATE DATABASE IF NOT EXISTS linksdb;

USE linksdb;

-- TABLE USER
-- all pasword wil be encrypted using SHA2
CREATE TABLE usuarios (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(60) NOT NULL,
  role ENUM('estudiante', 'docente'),
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) AUTO_INCREMENT=2;

-- drop table usuarios

DESCRIBE usuarios;

INSERT INTO usuarios (id, email, password, nombre) 
  VALUES (1, 'john', 'john@gmail.com', 'John Carter');

SELECT * FROM usuarios;

-- LINKS TABLE
CREATE TABLE links (
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES usuarios(id)
);

ALTER TABLE links
  ADD PRIMARY KEY (id);

ALTER TABLE links
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE links;

