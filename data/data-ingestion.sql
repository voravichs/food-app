
CREATE TABLE Business (
   business_id VARCHAR(255) PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   stars FLOAT,
   review_count INT,
   is_open INT CHECK (is_open IN (0, 1)),
   categories VARCHAR(255)
);
CREATE TABLE user (
   user_id VARCHAR(255) PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   review_count INT,
   yelping_since DATE NOT NULL,
   useful INT,
   funny INT,
   cool INT,
   fans INT,
   average_stars FLOAT
);
CREATE TABLE  geographical_location(
   business_id  VARCHAR(255),
   latitude FLOAT NOT NULL,
   longitude FLOAT NOT NULL,
   postal_code VARCHAR(20), no
   city VARCHAR(255),
   state VARCHAR(255),
   address VARCHAR(255),
   FOREIGN KEY (business_id) REFERENCES Business(business_id)
);
CREATE TABLE review (
   review_id VARCHAR(255) PRIMARY KEY,
   user_id VARCHAR(255) NOT NULL,
   business_id VARCHAR(255) NOT NULL,
   stars INT,
   date DATETIME,
   text VARCHAR(MAX),
   useful INT,
   funny INT,
   cool INT,
   FOREIGN KEY (user_id) REFERENCES user(user_id),
   FOREIGN KEY (business_id) REFERENCES Business(business_id)
);

