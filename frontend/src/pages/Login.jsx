import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, User } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 rounded-3xl w-full max-w-md relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-pink-500" />

                <h2 className="text-3xl font-bold mb-6 text-center text-slate-900 dark:text-white">Welcome Back</h2>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 p-3 rounded-xl mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-500 dark:text-gray-400 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="user@example.com"
                            className="input-neon"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-500 dark:text-gray-400 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="input-neon"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="btn-neon w-full flex justify-center items-center gap-2">
                        <LogIn className="w-5 h-5" /> Login
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-500 dark:text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium">
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
