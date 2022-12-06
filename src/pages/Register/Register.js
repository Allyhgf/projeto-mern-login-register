import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {
  RegisterContainer,
  RegisterForm,
} from './Register.elements'
import {
  UserInput,
  Button
} from '../../globalStyles'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:1337/api/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},  
    body: await JSON.stringify({
        name,
        email,
        password
      }),
    })

    const data = await req.json()

    if(data.status === "ok") {
      navigate("/login")
    } else {
      alert("Duplicate email")
    }
  }

  return (
    <>
      <RegisterContainer>
        <h1> Register </h1>
        <RegisterForm onSubmit={handleRegister}>
          <UserInput
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
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
          <Button type="submit"> Submit </Button>
        </RegisterForm>
      </RegisterContainer>
    </>
  );
};

export default Register;
