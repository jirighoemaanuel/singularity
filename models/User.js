import pool from '../db.js';



class User {
  // Create a new user
  static async create({ name, email, password_hash, role, created_at }) {
    const query = `
      INSERT INTO users (name, email, password_hash, role, created_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, email, password_hash, role, created_at];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1;';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1;';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Find user by username
  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1;';
    const result = await pool.query(query, [username]);
    return result.rows[0];
  }

  // Get all users
  static async findAll() {
    const query = 'SELECT * FROM users ORDER BY created_at DESC;';
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
