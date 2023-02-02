DROP TABLE IF EXISTS appointments;
CREATE TABLE appointments (id INTEGER PRIMARY KEY, details TEXT, date TEXT);
INSERT INTO appointments (details, date) VALUES ("Dentist", "2023-01-17 13:00:00.000"),("Accountant", "2023-01-18 09:45:00.000"),("Kid from school", "2023-01-18 14:30:00.000");