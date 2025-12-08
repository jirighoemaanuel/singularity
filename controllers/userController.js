import User from '../models/User.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required',
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message,
    });
  }
};

// Update user
// export const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { username, email, first_name, last_name } = req.body;

//     const updatedUser = await User.update(id, {
//       username,
//       email,
//       first_name,
//       last_name,
//     });

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: updatedUser,
//     });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating user',
//       error: error.message,
//     });
//   }
// };

// Delete user
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedUser = await User.delete(id);

//     if (!deletedUser) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'User deleted successfully',
//       data: deletedUser,
//     });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting user',
//       error: error.message,
//     });
//   }
// };
