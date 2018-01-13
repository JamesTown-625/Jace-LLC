CREATE DATABASE outdoor_db;
USE outdoor_db;

CREATE TABLE gear
(
	id int NOT NULL AUTO_INCREMENT,
	user_id varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    date_in datetime(255) NOT NULL,
    date_out datetime(255) NOT NULL,
	rented BOOLEAN DEFAULT false,
    category varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    gearRating INT,
    image varchar(255) NOT NULL,
	PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
	user_id varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    userRating INT,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    phone integer(255) NOT NULL,
    location varchar(255) NOT NULL,
    image varchar(255) NOT NULL,
	PRIMARY KEY (id)
);