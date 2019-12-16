USE `Ahrn`;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
	`id` INT(10) AUTO_INCREMENT,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `firstname`VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `password` VARCHAR(300) NOT NULL,
    `invite_key` VARCHAR(300) NOT NULL,
    -- `picture` BLOB,
    
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment`
(
	`id` INT(10) AUTO_INCREMENT,
    -- `name` VARCHAR(50),
    -- `description` VARCHAR(300),
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL,
    `booked_by` VARCHAR(50),
    `booked` INT(1) NOT NULL DEFAULT 0,
    `owner` INT(10) NOT NULL,
    
    PRIMARY KEY (`id`),
    FOREIGN KEY (`owner`)
		REFERENCES `user`(`id`)
		ON DELETE CASCADE,
	UNIQUE(`start_time`, `end_time`)
);

SET FOREIGN_KEY_CHECKS = 1;

SELECT A.*, TIMESTAMPDIFF(HOUR, A.start_time, A.end_time) AS duration
FROM `appointment` as A;
-- ORDER BY duration;

SELECT A.*, TIMESTAMPDIFF(HOUR, A.start_time, A.end_time) AS duration
FROM `appointment` as A 
WHERE A.owner = 1 AND start_time >= date(curdate() - INTERVAL 8 HOUR)
ORDER BY start_time;


INSERT INTO user (email, firstname, lastname, password) VALUES 
	("stain@gmail.com","Stian","Pettersen","123");

INSERT INTO appointment (`start_time`, `end_time`, `owner`) VALUES
	("2019-12-22 16:00", "2019-12-22 17:00", 1);

SELECT * from user;

SELECT * from appointment;




