'use client';

import React, { useState, useEffect } from 'react';
import { 
  Check, Copy, RefreshCw, Shield, 
  Eye, EyeOff, Download, Upload, Trash2,
  AlertTriangle, Save, Lock, User, Key,
  Plus, X, Search, Tag, Calendar
} from 'lucide-react';

const calculateStrength = (password) => {
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) poolSize += 33;
  return Math.floor(password.length * Math.log2(poolSize));
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [options, setOptions] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const stored = localStorage.getItem('savedPasswords');
    if (stored) {
      setSavedPasswords(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
  }, [savedPasswords]);

  const generatePassword = () => {
    const chars = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let validChars = '';
    if (options.lowercase) validChars += chars.lowercase;
    if (options.uppercase) validChars += chars.uppercase;
    if (options.numbers) validChars += chars.numbers;
    if (options.symbols) validChars += chars.symbols;

    if (!validChars) {
      showNotification('Please select at least one character type', 'error');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      newPassword += validChars[randomIndex];
    }

    setPassword(newPassword);
    showNotification('New password generated!', 'success');
  };

  const checkStrength = (pass) => {
    let score = 0;
    let details = [];

    const checks = {
      length: pass.length >= 12,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      numbers: /\d/.test(pass),
      symbols: /[^A-Za-z0-9]/.test(pass),
      variety: new Set(pass).size >= pass.length * 0.7
    };

    Object.entries(checks).forEach(([check, passed]) => {
      if (passed) {
        score++;
        details.push({ type: 'success', message: `Has ${check}` });
      } else {
        details.push({ type: 'error', message: `Missing ${check}` });
      }
    });

    const entropy = calculateStrength(pass);
    const normalizedScore = Math.min(Math.floor((score / 6) * 5), 5);
    const messages = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];

    return {
      score: normalizedScore,
      message: messages[normalizedScore],
      details,
      entropy
    };
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const copyToClipboard = async (text, id = null) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      showNotification('Copied to clipboard!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      showNotification('Failed to copy password', 'error');
    }
  };

  const savePassword = () => {
    if (!title.trim()) {
      showNotification('Please enter a title', 'error');
      return;
    }

    if (!password) {
      showNotification('Please generate a password first', 'error');
      return;
    }

    const newPassword = {
      id: Date.now(),
      title: title.trim(),
      password,
      createdAt: new Date().toISOString()
    };

    setSavedPasswords(prev => [newPassword, ...prev]);
    setTitle('');
    setShowSaveModal(false);
    showNotification('Password saved successfully!', 'success');
  };

  const deletePassword = (id) => {
    setSavedPasswords(prev => prev.filter(p => p.id !== id));
    showNotification('Password deleted', 'info');
  };

  const strength = password ? checkStrength(password) : null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Lock className="text-blue-600" />
          Secure Password Manager
        </h1>
        <p className="text-gray-600 mt-2">Generate and manage your passwords securely</p>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-fadeIn">
          <div className={`rounded-lg px-4 py-3 shadow-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' :
            notification.type === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? <Check size={18} /> :
               notification.type === 'error' ? <AlertTriangle size={18} /> :
               <Shield size={18} />}
              {notification.message}
            </div>
          </div>
        </div>
      )}

      {/* Password Generator */}
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 pr-32 border rounded-lg text-lg"
            placeholder="Generated password"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 hover:text-blue-600 transition-colors"
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <button
              onClick={() => copyToClipboard(password)}
              className="p-2 hover:text-blue-600 transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={20} />
            </button>
            <button
              onClick={generatePassword}
              className="p-2 hover:text-blue-600 transition-colors"
              title="Generate new password"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={() => setShowSaveModal(true)}
              className="p-2 hover:text-blue-600 transition-colors"
              title="Save password"
            >
              <Save size={20} />
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex-1">
              <span className="block text-sm font-medium mb-1">Length: {options.length}</span>
              <input
                type="range"
                min="8"
                max="32"
                value={options.length}
                onChange={(e) => setOptions({ ...options, length: Number(e.target.value) })}
                className="w-full"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(options).map(([key, value]) => (
              key !== 'length' && (
                <label key={key} className="flex items-center space-x-2 p-2 border rounded-lg">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                    className="rounded text-blue-600"
                  />
                  <span className="capitalize">{key}</span>
                </label>
              )
            ))}
          </div>
        </div>

        {/* Strength Indicator */}
        {password && strength && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg animate-fadeIn">
            <h3 className="text-lg font-semibold mb-2">Password Strength</h3>
            <div className="space-y-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    strength.score === 0 ? 'bg-red-500 w-1/5' :
                    strength.score === 1 ? 'bg-orange-500 w-2/5' :
                    strength.score === 2 ? 'bg-yellow-500 w-3/5' :
                    strength.score === 3 ? 'bg-lime-500 w-4/5' :
                    'bg-green-500 w-full'
                  }`}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>{strength.message}</span>
                <span>Entropy: {strength.entropy} bits</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Saved Passwords */}
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Key className="text-blue-600" />
            Saved Passwords
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search passwords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          {savedPasswords
            .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(item => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(item.password, item.id)}
                      className="p-2 hover:text-blue-600 transition-colors"
                    >
                      {copiedId === item.id ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                    <button
                      onClick={() => deletePassword(item.id)}
                      className="p-2 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4">Save Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Gmail Account"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={savePassword}
                  className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
                >
                  Save Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;