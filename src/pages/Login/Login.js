import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginContainer,
  LoginForm,
} from './Login.elements'
import {
  UserInput,
  Button
} from '../../globalStyles'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:1337/api/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},  
    body: await JSON.stringify({
        email,
        password
      }),
    })

    const data = await req.json();

    if(data.status === "ok") {
      localStorage.setItem('token', data.token);

      navigate("/dashboard")
    } else {
      alert("User not found. Wrong e-mail or password.")
    }
  }

  return (
    <>
      <LoginContainer>
        <h1> Login </h1>
        <LoginForm onSubmit={handleLogin}>
          <UserInput
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <UserInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <Button type="submit"> Login </Button>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default Login;
