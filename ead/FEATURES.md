# Real Estate Listing App - CRUD with User Authentication

A modern React-based Real Estate Listing Application with complete CRUD operations and user authentication using JSON storage in localStorage.

## 🎯 Features

### ✅ User Authentication
- **Registration**: Create a new account with validation
- **Login**: Authenticate with email and password
- **JSON Storage**: All user data is stored in localStorage as JSON
- **Persistent Login**: Users remain logged in across sessions
- **Logout**: Clear user session and return to login page

### 🏠 Property Management (CRUD Operations)
- **Create**: Add new property listings with detailed information
- **Read**: View all your properties in a responsive grid layout
- **Update**: Edit existing property information
- **Delete**: Remove properties from your inventory
- **Search**: Filter properties by title or location

### 🎨 Modern UI/UX
- Responsive design (works on mobile, tablet, desktop)
- Beautiful gradient backgrounds and smooth animations
- Interactive forms with validation
- User-friendly alerts and notifications
- Profile section showing logged-in user

## 📁 Project Structure

```
src/
├── context/
│   └── AuthContext.js           # Authentication state management
├── pages/
│   ├── AuthForm.css             # Styling for login/register forms
│   ├── Login.js                 # Login component
│   ├── Register.js              # Registration component
│   ├── RealEstate.js            # Main property management page
│   └── RealEstate.css           # Styling for real estate page
├── utils/
│   └── jsonStorage.js           # JSON storage utility functions
├── Home/
│   └── Home.js                  # Home page component
├── Navbar/
│   ├── Navbar.js                # Navigation bar component
│   └── Navbar.css               # Navigation styling
├── App.js                       # Main app component with routes
└── App.css                      # Global styling
```

## 🗄️ Data Storage (JSON in localStorage)

### Users Storage
```json
{
  "id": "1234567890",
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "createdAt": "2025-11-12T10:30:00.000Z"
}
```

### Properties Storage
```json
{
  "id": "1234567890",
  "userId": "owner_user_id",
  "title": "Beautiful Modern House",
  "description": "Spacious 3-bedroom house with modern amenities...",
  "price": 250000,
  "location": "123 Main St, City",
  "bedrooms": 3,
  "bathrooms": 2,
  "area": 2500,
  "propertyType": "residential",
  "imageUrl": "https://...",
  "createdAt": "2025-11-12T10:30:00.000Z",
  "updatedAt": "2025-11-12T10:30:00.000Z"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ead_proj/ead
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📝 Usage

### 1. Register a New Account
- Click "Register" in the navigation bar
- Fill in your full name, email, and password
- Password must be at least 6 characters
- Passwords must match in both fields
- Click "Register" to create your account
- You'll be redirected to the login page

### 2. Login
- Click "Login" in the navigation bar
- Enter your email and password
- Click "Login"
- On successful login, you'll be redirected to the Real Estate page

### 3. Create a Property
- Click "Properties" in the navbar (shown when logged in)
- Click "+ Add New Property"
- Fill in all the required fields:
  - **Property Title**: Name of the property
  - **Property Type**: Choose from residential, commercial, apartment, or land
  - **Description**: Detailed description of the property
  - **Location**: Address of the property
  - **Price**: Property price in dollars
  - **Bedrooms**: Number of bedrooms
  - **Bathrooms**: Number of bathrooms
  - **Area**: Property area in square feet
  - **Image URL**: (Optional) URL to property image
- Click "Create Property"

### 4. View Properties
- All your properties are displayed in a grid layout
- Each card shows:
  - Property image
  - Title and type
  - Location
  - Bedrooms, bathrooms, and area
  - Price
  - Creation date
  - Edit and Delete buttons

### 5. Search Properties
- Use the search bar to filter properties by title or location
- Search results update in real-time

### 6. Edit a Property
- Click the "✏️ Edit" button on any property card
- The form will populate with current property data
- Modify the fields you want to update
- Click "Update Property"
- The property will be updated and the form will close

### 7. Delete a Property
- Click the "🗑️ Delete" button on any property card
- Confirm the deletion when prompted
- The property will be permanently removed

### 8. Logout
- Click the "Logout" button in the navigation bar
- You'll be redirected to the login page
- Your data is preserved in localStorage

## 🔐 Security Notes

**⚠️ Important**: This application stores passwords in **plain text** in localStorage for demonstration purposes only.

**In Production**, you should:
- Use a secure backend API with HTTPS
- Hash passwords with bcrypt or similar
- Store authentication tokens (JWT) securely
- Implement proper session management
- Add CORS protection
- Validate all inputs on both client and server
- Use environment variables for sensitive data

## 🛠️ Technical Stack

- **Frontend**: React 19.2.0
- **Routing**: React Router DOM 7.9.5
- **State Management**: React Context API + Hooks
- **Storage**: Browser localStorage (JSON)
- **Styling**: CSS3 with gradients and flexbox/grid
- **Testing**: React Testing Library
- **Build**: Create React App

## 📦 Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

### `npm eject`
**Note**: this is a one-way operation. Once you eject, you can't go back!

## 🎨 UI/UX Features

- **Gradient Backgrounds**: Modern purple/indigo gradients
- **Smooth Animations**: Slide-in and fade effects
- **Responsive Grid**: Auto-adjusting property cards
- **Form Validation**: Real-time validation with error messages
- **Loading States**: Success and error alerts
- **Hover Effects**: Interactive button and card hover states
- **Mobile Optimized**: Responsive design for all screen sizes

## 🚀 Future Enhancements

- [ ] Add property image upload functionality
- [ ] Implement advanced filtering (price range, bedrooms, etc.)
- [ ] Add map integration with location markers
- [ ] Create property favorites/wishlist
- [ ] Add user profile management
- [ ] Implement email verification
- [ ] Add password reset functionality
- [ ] Create admin dashboard
- [ ] Add property reviews and ratings
- [ ] Implement real backend API

## 📞 Support

For issues or questions, please open an issue in the repository.

## 📄 License

This project is open source and available under the MIT License.

---

**Last Updated**: November 12, 2025
**Version**: 1.0.0
