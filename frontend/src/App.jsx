import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Expenses from './pages/Expenses';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import BudgetPlanning from './pages/BudgetPlanning';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useExpenses } from './hooks/useExpenses';
import './App.css';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

// Context Wrapper to pass data to Outlet
const AppLayout = () => {
  // Now fetching data via API hook which uses Auth Context
  const expenseData = useExpenses();
  return (
    <Layout>
      <Outlet context={expenseData} />
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="plan" element={<BudgetPlanning />} />
                <Route path="add" element={<AddTransaction />} />
                <Route path="history" element={<Expenses />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
