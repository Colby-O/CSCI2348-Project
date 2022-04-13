#createWordBankTable.sql
#Table structure for table WordBank

DROP TABLE IF EXISTS WordBank;
CREATE TABLE WordBank
(
  word_id INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  word VARCHAR(8000) NOT NULL,
  date_time DATETIME NOT NULL
);
