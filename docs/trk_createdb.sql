CREATE DATABASE IF NOT EXISTS `spndb`;
USE `spndb`;

CREATE TABLE `app_category` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE `app_status` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE `department` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE `user_role` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE `user_status` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `fname` VARCHAR(100),
    `lname` VARCHAR(100),
    `department_id` INT,
    `role_id` INT,
    `status_id` INT,
    FOREIGN KEY (`department_id`) REFERENCES `department`(`id`),
    FOREIGN KEY (`role_id`) REFERENCES `user_role`(`id`),
    FOREIGN KEY (`status_id`) REFERENCES `user_status`(`id`)
);

CREATE TABLE `app` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `category_id` INT,
    `status_id` INT,
    `renewal_date` DATE,
    `owner_id` INT,
    `notes` TEXT,
    FOREIGN KEY (`category_id`) REFERENCES `app_category`(`id`),
    FOREIGN KEY (`status_id`) REFERENCES `app_status`(`id`),
    FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `pricing_plan` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `num_of_licences` INT,
    `price_per_licence` DECIMAL(10, 2),
    `billing_cycle` ENUM('Monthly', 'Yearly') NOT NULL,
    `app_id` INT,
    FOREIGN KEY (`app_id`) REFERENCES `app`(`id`)
);

CREATE TABLE `transaction` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `number` VARCHAR(100),
    `description` TEXT,
    `datetime` DATETIME,
    `status` VARCHAR(50),
    `amount` DECIMAL(12, 2),
    `app_id` INT,
    FOREIGN KEY (`app_id`) REFERENCES `app`(`id`)
);

CREATE TABLE `app_users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `app_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `app_pricing_plan_id` INT,
    FOREIGN KEY (`app_id`) REFERENCES `app`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`app_pricing_plan_id`) REFERENCES `pricing_plan`(`id`)
);

CREATE TABLE `request_type` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE `request_status` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE `procurement_request` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `description` TEXT,
    `app_id` INT,
    `type_id` INT,
    `deadline_datetime` DATETIME,
    `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `approver_id` INT,
    `created_by_id` INT,
    `status_id` INT,
    FOREIGN KEY (`app_id`) REFERENCES `app`(`id`),
    FOREIGN KEY (`type_id`) REFERENCES `request_type`(`id`),
    FOREIGN KEY (`approver_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`created_by_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`status_id`) REFERENCES `request_status`(`id`)
);
