import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MainSection from './components/MainSection';
import ApplicationForm from './components/ApplicationForm';
import AdminDashboard from './components/AdminDashboard';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please check the console for more information.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen">
        <Header />
        <ErrorBoundary>
          <Routes>
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