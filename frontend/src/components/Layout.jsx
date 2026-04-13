import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, History, Wallet, Menu, X, Settings, LogOut, PieChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/plan', icon: PieChart, label: 'Budget Plan' },
        { path: '/add', icon: PlusCircle, label: 'Log Spending' },
        { path: '/history', icon: History, label: 'History' },
    ];

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const Sidebar = () => (
        <div className="flex flex-col h-full">
            <div className="p-8">
                <div className="flex items-center gap-3 text-slate-100 mb-2">
                    <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg shadow-lg shadow-teal-500/20">
                        <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Smart<span className="text-teal-500 dark:text-teal-400">Budget</span></h1>
                </div>
                <p className="text-xs text-slate-500 ml-12">v2.1 Premium</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                        {item.path === location.pathname && (
                            <motion.div
                                layoutId="activeNav"
                                className="absolute left-0 w-1 h-8 bg-teal-500 rounded-r-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700/50 space-y-2">
                <div className="px-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Theme</span>
                        <ThemeToggle />
                    </div>
                </div>

                <NavLink
                    to="/settings"
                    className={({ isActive }) => `nav-item w-full ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="nav-item w-full text-red-500 dark:text-red-400 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-500/30 transition-colors duration-300">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 glass-panel border-r border-slate-200 dark:border-slate-700/50 fixed inset-y-0 z-20">
                <Sidebar />
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full glass-panel z-30 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
                        <Wallet className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">Smart Budget Planner</span>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-white">
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="md:hidden fixed inset-0 z-20 bg-slate-50 dark:bg-slate-950 pt-20"
                    >
                        <Sidebar />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 min-h-screen">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
