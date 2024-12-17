import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing Components
import Header from './components/Header';
import MainSection from './components/MainSection';
import ApplicationForm from './components/ApplicationForm';
import AdminDashboard from './components/AdminDashboard';


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // State to track if there is an error
    this.state = { hasError: false };
  }

  // Lifecycle method: Updates state when an error is thrown
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Lifecycle method: Logs error details to the console
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  // Renders fallback UI if there's an error
  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong. Please check the console for more information.
        </h1>
      );
    }

    // Renders children if no error is caught
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      {/* Main container div with background and full screen height */}
      <div className="bg-gray-900 min-h-screen">
        {/* Header Component - Displays the top section of the app */}
        <Header />
        
        {/* Wrapping routes in ErrorBoundary to catch any errors from child components */}
        <ErrorBoundary>
          <Routes>
            {/* Define the routes for the application */}
            <Route path="/" element={<MainSection />} />
            <Route path="/apply" element={<ApplicationForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
