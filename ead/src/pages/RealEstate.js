import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getUserProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../utils/jsonStorage';
import './RealEstate.css';

function RealEstate() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    propertyType: 'residential',
    imageUrl: '',
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Load properties on mount
  useEffect(() => {
    if (user) {
      try {
        const userProps = getUserProperties(user.id);
        setProperties(userProps);
      } catch (err) {
        setError('Failed to load properties');
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.location ||
      !formData.bedrooms ||
      !formData.bathrooms ||
      !formData.area
    ) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      setError('Price must be a positive number.');
      return;
    }

    if (isNaN(formData.bedrooms) || formData.bedrooms < 0) {
      setError('Bedrooms must be a non-negative number.');
      return;
    }

    if (isNaN(formData.bathrooms) || formData.bathrooms < 0) {
      setError('Bathrooms must be a non-negative number.');
      return;
    }

    if (isNaN(formData.area) || formData.area <= 0) {
      setError('Area must be a positive number.');
      return;
    }

    try {
      if (editingId) {
        // Update property
        const result = updateProperty(
          editingId,
          {
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            location: formData.location,
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms),
            area: parseFloat(formData.area),
            propertyType: formData.propertyType,
            imageUrl: formData.imageUrl,
          },
          user.id
        );

        if (result.success) {
          setSuccess('Property updated successfully!');
          resetForm();
          // Reload properties
          const userProps = getUserProperties(user.id);
          setProperties(userProps);
        } else {
          setError(result.message);
        }
      } else {
        // Create new property
        const result = createProperty(
          {
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            location: formData.location,
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms),
            area: parseFloat(formData.area),
            propertyType: formData.propertyType,
            imageUrl: formData.imageUrl,
          },
          user.id
        );

        if (result.success) {
          setSuccess('Property created successfully!');
          resetForm();
          // Reload properties
          const userProps = getUserProperties(user.id);
          setProperties(userProps);
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('An error occurred: ' + err.message);
    }
  };

  const handleEdit = (propertyId) => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      setFormData({
        title: property.title,
        description: property.description,
        price: property.price.toString(),
        location: property.location,
        bedrooms: property.bedrooms.toString(),
        bathrooms: property.bathrooms.toString(),
        area: property.area.toString(),
        propertyType: property.propertyType,
        imageUrl: property.imageUrl,
      });
      setEditingId(propertyId);
      setShowForm(true);
    }
  };

  const handleDelete = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const result = deleteProperty(propertyId, user.id);
        if (result.success) {
          setSuccess('Property deleted successfully!');
          // Reload properties
          const userProps = getUserProperties(user.id);
          setProperties(userProps);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to delete property: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      propertyType: 'residential',
      imageUrl: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredProperties = properties.filter(prop =>
    prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return null;
  }

  return (
    <div className="real-estate-container">
      {/* Header */}
      <div className="real-estate-header">
        <div className="header-left">
          <h1>Real Estate Listings</h1>
          <p className="user-welcome">Welcome, {user.fullName}!</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Messages */}
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="add-property-btn"
        >
          {showForm ? 'Cancel' : '+ Add New Property'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="property-form-container">
          <h2>{editingId ? 'Edit Property' : 'Add New Property'}</h2>
          <form onSubmit={handleSubmit} className="property-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Property Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Beautiful Modern House"
                />
              </div>

              <div className="form-group">
                <label htmlFor="propertyType">Property Type *</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the property features and amenities..."
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Main St, City"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 250000"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms *</label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms *</label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="area">Area (sq ft) *</label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g., 2500"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="image-preview"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200';
                  }}
                />
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingId ? 'Update Property' : 'Create Property'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Properties List */}
      <div className="properties-section">
        <h2>Your Properties ({filteredProperties.length})</h2>
        {filteredProperties.length === 0 ? (
          <div className="no-properties">
            <p>No properties found. {!searchTerm && 'Create your first property!'}</p>
          </div>
        ) : (
          <div className="properties-grid">
            {filteredProperties.map(property => (
              <div key={property.id} className="property-card">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className="property-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200';
                  }}
                />
                <div className="property-content">
                  <h3>{property.title}</h3>
                  <p className="property-type">{property.propertyType}</p>
                  <p className="property-location">📍 {property.location}</p>
                  
                  <div className="property-specs">
                    <span className="spec">
                      🛏️ {property.bedrooms} Beds
                    </span>
                    <span className="spec">
                      🚿 {property.bathrooms} Baths
                    </span>
                    <span className="spec">
                      📐 {property.area} sq ft
                    </span>
                  </div>

                  <p className="property-description">{property.description}</p>

                  <div className="property-footer">
                    <span className="property-price">
                      ${property.price.toLocaleString()}
                    </span>
                    <div className="property-actions">
                      <button
                        onClick={() => handleEdit(property.id)}
                        className="edit-btn"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="delete-btn"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>

                  <p className="property-meta">
                    Created: {new Date(property.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RealEstate;
