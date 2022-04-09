#createBlogTable.sql
#Table structure for table Blogs

DROP TABLE IF EXISTS Blogs;
CREATE TABLE Blogs
(
  blog_id INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  blog_content VARCHAR(MAX) NOT NULL,
  blog_status VARCHAR(2) NOT NULL,
  date_time DATETIME NOT NULL
);