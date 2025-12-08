import pool from '../db.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

class User {
  // Create a new user
  static async create({ name, email, password, role }) {
    const query = `
      INSERT INTO users (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING name, email, role, created_at;
    `;

    // Hash the password first
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const values = [name, email, passwordHash, role];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const query =
      'SELECT name, email, role, created_at FROM users WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const query =
      'SELECT name, email, role, created_at FROM users WHERE email = $1;';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Find user by username
  static async findByUsername(username) {
    const query =
      'SELECT name, email, role, created_at FROM users WHERE username = $1;';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }

  // Get all users
  static async findAll() {
    const query =
      'SELECT name, email, role, created_at FROM users ORDER BY created_at DESC;';
    const result = await pool.query(query);
    return result.rows;
  }

  // Update user
  // static async update(id, { name, email, first_name, last_name }) {
  //   const query = `
  //     UPDATE users
  //     SET username = COALESCE($1, username),
  //         email = COALESCE($2, email),
  //         first_name = COALESCE($3, first_name),
  //         last_name = COALESCE($4, last_name),
  //         updated_at = CURRENT_TIMESTAMP
  //     WHERE id = $5
  //     RETURNING *;
  //   `;
  //   const values = [username, email, first_name, last_name, id];
  //   const result = await pool.query(query, values);
  //   return result.rows[0];
  // }

  // Delete user
  // static async delete(id) {
  //   const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
  //   const result = await pool.query(query, [id]);
  //   return result.rows[0];
  // }
}

export default User;
