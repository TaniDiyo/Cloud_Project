import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Lock, Save, AlertCircle, CheckCircle } from 'lucide-react';

const Settings = () => {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (password && password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setIsLoading(true);
        const result = await updateProfile({
            name,
            password: password || undefined,
        });
        setIsLoading(false);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully' });
            setPassword('');
            setConfirmPassword('');
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage your account preferences</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-8 rounded-2xl max-w-2xl"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-teal-500/20">
                        {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{user?.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {message && (
                        <div className={`p-4 rounded-xl flex items-center gap-2 text-sm ${message.type === 'success' ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20' : 'bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20'
                            }`}>
                            {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {message.text}
                        </div>
                    )}

                    <div>
                        <label className="block text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-500" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all"
                                placeholder="Enter your name"
                            />
                        </div>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-700/50 pt-6">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Change Password</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-500" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all"
                                        placeholder="Leave blank to keep current"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 dark:text-slate-500" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 outline-none transition-all"
                                        placeholder="Confirm new password"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-neon w-full flex justify-center items-center gap-2 group"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Settings;
