create database positivedb;
use positivedb;

create user`positiveuser`@`%` identified by '1234'; 
grant all privileges on positivedb.* to `positiveuser`@`%`;