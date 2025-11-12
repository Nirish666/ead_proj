// JSON Storage Utility for User and Property Data

const USERS_KEY = 'realEstate_users';
const PROPERTIES_KEY = 'realEstate_properties';
const CURRENT_USER_KEY = 'realEstate_currentUser';

// ===== USER OPERATIONS =====

/**
 * Register a new user
 * @param {Object} userData - { fullName, email, password }
 * @returns {Object} { success: boolean, message: string, user: Object }
 */
export const registerUser = (userData) => {
  try {
    const users = getAllUsers();
    
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: Date.now().toString(),
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password, // In production, use bcrypt
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { success: true, message: 'Registration successful', user: newUser };
  } catch (error) {
    return { success: false, message: 'Registration failed: ' + error.message };
  }
};

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {Object} { success: boolean, message: string, user: Object }
 */
export const loginUser = (email, password) => {
  try {
    const users = getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Save current logged-in user
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    
    return { success: true, message: 'Login successful', user };
  } catch (error) {
    return { success: false, message: 'Login failed: ' + error.message };
  }
};

/**
 * Get all users
 * @returns {Array} Array of users
 */
export const getAllUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

/**
 * Get current logged-in user
 * @returns {Object|null} Current user or null
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error reading current user:', error);
    return null;
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    return { success: true, message: 'Logout successful' };
  } catch (error) {
    return { success: false, message: 'Logout failed: ' + error.message };
  }
};

// ===== PROPERTY OPERATIONS =====

/**
 * Get all properties
 * @returns {Array} Array of properties
 */
export const getAllProperties = () => {
  try {
    const properties = localStorage.getItem(PROPERTIES_KEY);
    return properties ? JSON.parse(properties) : [];
  } catch (error) {
    console.error('Error reading properties:', error);
    return [];
  }
};

/**
 * Get properties by user ID (owned by user)
 * @param {string} userId
 * @returns {Array} Array of user's properties
 */
export const getUserProperties = (userId) => {
  try {
    const properties = getAllProperties();
    return properties.filter(prop => prop.userId === userId);
  } catch (error) {
    console.error('Error reading user properties:', error);
    return [];
  }
};

/**
 * Create a new property
 * @param {Object} propertyData - { title, description, price, location, bedrooms, bathrooms, area, propertyType, imageUrl }
 * @param {string} userId
 * @returns {Object} { success: boolean, message: string, property: Object }
 */
export const createProperty = (propertyData, userId) => {
  try {
    const properties = getAllProperties();

    const newProperty = {
      id: Date.now().toString(),
      userId,
      title: propertyData.title,
      description: propertyData.description,
      price: propertyData.price,
      location: propertyData.location,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      area: propertyData.area,
      propertyType: propertyData.propertyType,
      imageUrl: propertyData.imageUrl || 'https://via.placeholder.com/300x200',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    properties.push(newProperty);
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));

    return { success: true, message: 'Property created successfully', property: newProperty };
  } catch (error) {
    return { success: false, message: 'Failed to create property: ' + error.message };
  }
};

/**
 * Update a property
 * @param {string} propertyId
 * @param {Object} propertyData
 * @param {string} userId
 * @returns {Object} { success: boolean, message: string, property: Object }
 */
export const updateProperty = (propertyId, propertyData, userId) => {
  try {
    const properties = getAllProperties();
    const propertyIndex = properties.findIndex(p => p.id === propertyId && p.userId === userId);

    if (propertyIndex === -1) {
      return { success: false, message: 'Property not found or unauthorized' };
    }

    properties[propertyIndex] = {
      ...properties[propertyIndex],
      ...propertyData,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));

    return { success: true, message: 'Property updated successfully', property: properties[propertyIndex] };
  } catch (error) {
    return { success: false, message: 'Failed to update property: ' + error.message };
  }
};

/**
 * Delete a property
 * @param {string} propertyId
 * @param {string} userId
 * @returns {Object} { success: boolean, message: string }
 */
export const deleteProperty = (propertyId, userId) => {
  try {
    const properties = getAllProperties();
    const propertyIndex = properties.findIndex(p => p.id === propertyId && p.userId === userId);

    if (propertyIndex === -1) {
      return { success: false, message: 'Property not found or unauthorized' };
    }

    properties.splice(propertyIndex, 1);
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));

    return { success: true, message: 'Property deleted successfully' };
  } catch (error) {
    return { success: false, message: 'Failed to delete property: ' + error.message };
  }
};

/**
 * Get a single property by ID
 * @param {string} propertyId
 * @returns {Object|null} Property object or null
 */
export const getPropertyById = (propertyId) => {
  try {
    const properties = getAllProperties();
    return properties.find(p => p.id === propertyId) || null;
  } catch (error) {
    console.error('Error reading property:', error);
    return null;
  }
};
