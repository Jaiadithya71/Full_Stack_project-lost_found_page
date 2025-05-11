// Follow the below steps to setup the backend database in MySql

create a MySQL file

CREATE DATABASE lost_and_found;
USE lost_and_found;
CREATE TABLE found_items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  found_location VARCHAR(255) NOT NULL,
  date_found DATE NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_found_item (
    item_name(100),
    category(50),
    found_location(100),
    date_found,
    contact_info(50)
  )
);
CREATE TABLE lost_items (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  last_seen_location VARCHAR(255),
  date_lost DATE NOT NULL,
  contact_info VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_lost_item (
    item_name(100),
    category(50),
    last_seen_location(100),
    date_lost,
    contact_info(50)
  )
);

---------------------------------------------------------
create a .env file in the backend folder

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=lost_and_found
DB_PORT=3306

---------------------------------------------------------
run these command in the backend integrated terminal

npm install mysql2 dotenv
npm run dev

---------------------------------------------------------
run these command in the backend integrated terminal

npm install
npm start
---------------------------------------------------------
