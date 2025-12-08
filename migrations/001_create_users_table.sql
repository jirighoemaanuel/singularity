-- 1. Create the Enum for Roles
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');

-- 2. The Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast login lookups
CREATE INDEX idx_users_email ON users(email);