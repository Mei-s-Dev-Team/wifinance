USE wifinance;

CREATE TABLE expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(100),
  amount DECIMAL(10, 2),
  payment_type VARCHAR(50),
  vendor VARCHAR(100),
  date DATE,
  purchase_type VARCHAR(50)
);