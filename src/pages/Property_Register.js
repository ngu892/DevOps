import React, { useState} from 'react'
import '../styles/LoginRegister.css'

function Register() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  const handleIdChange = (event) => {
    setId(event.target.value);
  };
  const handleuserTypeChange = (event) => {
    setUsertype(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('ID:', id);
    console.log('Password:', password);
    console.log('String', usertype);
  };

  return (
    <div className="login-container">
      <h2>Property Register Page</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" value={id} onChange={handleIdChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Registertype">User Type:</label>
          <input type="text" usertype="usertype" value={usertype} onChange={handleuserTypeChange} />
        </div>
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
}
export default Register