import React, { useState} from 'react'

function Login() {

  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 폼 제출 시 처리할 로직
    console.log('Login data:', formData);
  };
  
  return (
    <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="userId">ID:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
);
}

export default Login