import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync with LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('flowpass_session');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  function login(email, password) {
    // Get all accounts
    const accounts = JSON.parse(localStorage.getItem('flowpass_accounts') || '{}');
    
    if (accounts[email]) {
      // Existing user: check password
      if (accounts[email].password === password) {
        const userSession = { ...accounts[email] };
        delete userSession.password; // Don't keep password in active session state
        setCurrentUser(userSession);
        localStorage.setItem('flowpass_session', JSON.stringify(userSession));
        return Promise.resolve(userSession);
      } else {
        return Promise.reject(new Error("Incorrect password for this account."));
      }
    } else {
      // New user: create account
      const newUser = {
        email,
        password, // In real apps, hash this!
        displayName: email.split('@')[0],
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        uid: Math.random().toString(36).substr(2, 9),
      };
      
      accounts[email] = newUser;
      localStorage.setItem('flowpass_accounts', JSON.stringify(accounts));
      
      const userSession = { ...newUser };
      delete userSession.password;
      setCurrentUser(userSession);
      localStorage.setItem('flowpass_session', JSON.stringify(userSession));
      return Promise.resolve(userSession);
    }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('flowpass_session');
    return Promise.resolve();
  }

  function updateUserProfile(updates) {
    // Update session
    const updatedSession = { ...currentUser, ...updates };
    setCurrentUser(updatedSession);
    localStorage.setItem('flowpass_session', JSON.stringify(updatedSession));

    // Update global accounts repo
    const accounts = JSON.parse(localStorage.getItem('flowpass_accounts') || '{}');
    if (accounts[currentUser.email]) {
      accounts[currentUser.email] = { ...accounts[currentUser.email], ...updates };
      localStorage.setItem('flowpass_accounts', JSON.stringify(accounts));
    }
    
    return Promise.resolve(updatedSession);
  }

  function resetAllAccounts() {
    localStorage.removeItem('flowpass_accounts');
    localStorage.removeItem('flowpass_session');
    setCurrentUser(null);
    window.location.reload();
  }

  const value = {
    currentUser,
    login,
    logout,
    updateUserProfile,
    resetAllAccounts
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
