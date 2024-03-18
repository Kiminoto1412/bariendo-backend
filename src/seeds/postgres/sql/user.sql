-- Insert mock data for 3 patients
INSERT INTO user (email, password, firstname, lastname, role)
VALUES
    ('patient1@example.com', '$2a$10$C0A7WcHUzkQiaswLvnKya.Mo5n57MJSph4dqX6CwnZ0ZGysxgYzsW', 'John', 'Doe', 'PATIENT'),
    ('patient2@example.com', '$2a$10$C0A7WcHUzkQiaswLvnKya.Mo5n57MJSph4dqX6CwnZ0ZGysxgYzsW', 'Alice', 'Smith', 'PATIENT'),
    ('patient3@example.com', '$2a$10$C0A7WcHUzkQiaswLvnKya.Mo5n57MJSph4dqX6CwnZ0ZGysxgYzsW', 'Bob', 'Johnson', 'PATIENT');

-- Insert mock data for 3 doctors
INSERT INTO user (email, password, firstname, lastname, specialist, role)
VALUES
    ('doctor1@example.com', '$2a$10$C0A7WcHUzkQiaswLvnKya.Mo5n57MJSph4dqX6CwnZ0ZGysxgYzsW', 'Emily', 'Clark', 'Cardiologist', 'DOCTOR'),
    ('doctor2@example.com', '$2a$10$C0A7WcHUzkQiaswLvnKya.Mo5n57MJSph4dqX6CwnZ0ZGysxgYzsW', 'Michael', 'Wilson', 'Dermatologist', 'DOCTOR'),
    ('doctor3@example.com', '$2a$10$C0A7WcHUzkQiaswLvnKya.Mo5n57MJSph4dqX6CwnZ0ZGysxgYzsW', 'Sarah', 'Anderson', 'Pediatrician', 'DOCTOR');

-- Insert mock data for 3 admins
INSERT INTO user (email, password, firstname, lastname, role)
VALUES
    ('admin1@example.com', '$2a$10$C0A7WcHUzkQiaswLvnKya.Mo5n57MJSph4dqX6CwnZ0ZGysxgYzsW', 'Admin', 'One', 'ADMIN'),
    ('admin2@example.com', '$2a$10$C0A7WcHUzkQiaswLvnKya.Mo5n57MJSph4dqX6CwnZ0ZGysxgYzsW', 'Admin', 'Two', 'ADMIN'),
    ('admin3@example.com', '$2a$10$C0A7WcHUzkQiaswLvnKya.Mo5n57MJSph4dqX6CwnZ0ZGysxgYzsW', 'Admin', 'Three', 'ADMIN');
