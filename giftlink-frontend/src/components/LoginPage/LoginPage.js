import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const bearerToken = sessionStorage.getItem('auth-token');
    const response = await fetch('http://localhost:3060/api/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();
    if (json.authtoken) {
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', json.userEmail);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
