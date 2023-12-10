USE wpdb;

CREATE TABLE expenses (
  productID INT AUTO_INCREMENT PRIMARY KEY,
  productName VARCHAR(30),
  productDescription VARCHAR(150),
  productPrice DECIMAL(2, 2),
  productType VARCHAR(20),
  productDate DATE,
  productStock TINYINT(1)
);