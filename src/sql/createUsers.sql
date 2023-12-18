CREATE TABLE `users` (
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE posts (
	date  DATE DEFAULT (CURRENT_DATE),
	title varchar(100),
    post text,
	idPost  INT NOT NULL AUTO_INCREMENT, 
	idUser INT,
    PRIMARY KEY (idPost),
    CONSTRAINT userId FOREIGN KEY (idUser)
    REFERENCES users(_id)
);