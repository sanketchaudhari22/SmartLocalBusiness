import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { BusinessDetailPage } from './pages/BusinessDetailPage';
import { SearchPage } from './pages/SearchPage';
import { BusinessesPage } from './pages/BusinessesPage';
import { CreateBookingPage } from './pages/CreateBookingPage';
import { CreateReviewPage } from './pages/CreateReviewPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/businesses" element={<BusinessesPage />} />
            <Route path="/business/:id" element={<BusinessDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/booking/create" element={<CreateBookingPage />} />
            <Route path="/review/create" element={<CreateReviewPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;