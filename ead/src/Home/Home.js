import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to RealEstate</h1>
          <p className="hero-subtitle">
            Discover Your Dream Property or List Your Own
          </p>
          <p className="hero-description">
            The most trusted platform for buying, selling, and renting properties
          </p>
          <div className="hero-buttons">
            {user ? (
              <Link to="/real-estate" className="hero-btn hero-btn-primary">
                Manage My Properties
              </Link>
            ) : (
              <>
                <Link to="/register" className="hero-btn hero-btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="hero-btn hero-btn-secondary">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-placeholder">
            🏠
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose RealEstate?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Easy Listing</h3>
            <p>Create and manage property listings in minutes with our intuitive platform</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>Find properties that match your criteria with advanced filtering options</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real Data</h3>
            <p>Access accurate property information and market trends instantly</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure & Safe</h3>
            <p>Your data is protected with industry-leading security standards</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Community</h3>
            <p>Connect with buyers, sellers, and agents in our vibrant community</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>24/7 Access</h3>
            <p>Manage your properties anytime, anywhere from any device</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <h2>RealEstate by Numbers</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-number">10K+</h3>
            <p className="stat-label">Properties Listed</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">5K+</h3>
            <p className="stat-label">Happy Users</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">50+</h3>
            <p className="stat-label">Cities Covered</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">98%</h3>
            <p className="stat-label">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up for free in less than a minute</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>List Property</h3>
            <p>Add your property with photos and details</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Offers</h3>
            <p>Connect with interested buyers and sellers</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Close Deal</h3>
            <p>Complete your transaction securely</p>
          </div>
        </div>
      </section>

      {/* Property Types Section */}
      <section className="property-types">
        <h2>Property Types We Handle</h2>
        <div className="types-grid">
          <div className="type-card">
            <div className="type-icon">🏡</div>
            <h3>Residential</h3>
            <p>Houses, apartments, and condos</p>
          </div>
          <div className="type-card">
            <div className="type-icon">🏢</div>
            <h3>Commercial</h3>
            <p>Offices, shops, and malls</p>
          </div>
          <div className="type-card">
            <div className="type-icon">🏗️</div>
            <h3>Land</h3>
            <p>Plots and vacant land</p>
          </div>
          <div className="type-card">
            <div className="type-icon">🏘️</div>
            <h3>Apartments</h3>
            <p>Studios to luxury penthouses</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"RealEstate made finding my dream home so easy!"</p>
            <h4>- Sarah Johnson</h4>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Best platform for listing properties. Sold in just 2 weeks!"</p>
            <h4>- Mark Williams</h4>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"Professional, secure, and user-friendly. Highly recommended!"</p>
            <h4>- Emily Davis</h4>
          </div>
        </div>
      </section>

      {/* Market Tips Section */}
      <section className="market-tips">
        <h2>Real Estate Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>🎯 Buy Smart</h3>
            <p>Research property values in the area, check neighborhood amenities, and compare prices before making an offer.</p>
          </div>
          <div className="tip-card">
            <h3>💰 Sell Successfully</h3>
            <p>Price competitively, take quality photos, write detailed descriptions, and respond quickly to inquiries.</p>
          </div>
          <div className="tip-card">
            <h3>📍 Location Matters</h3>
            <p>Consider proximity to schools, hospitals, shops, public transport, and future development plans.</p>
          </div>
          <div className="tip-card">
            <h3>📈 Market Trends</h3>
            <p>Stay updated with market trends, property values, and investment opportunities in different areas.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of users buying and selling properties on RealEstate</p>
        {user ? (
          <Link to="/real-estate" className="cta-btn">
            Go to Dashboard
          </Link>
        ) : (
          <Link to="/register" className="cta-btn">
            Create Free Account
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>RealEstate is your trusted platform for property management.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@realestate.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 RealEstate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;