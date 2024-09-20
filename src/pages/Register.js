import React, { useState} from 'react'
import '../styles/LoginRegister.css'

function Register() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('ID:', id);
    console.log('Password:', password);
  };

  return (
    <div className="login-container">
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" value={id} onChange={handleIdChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
}
export default Register