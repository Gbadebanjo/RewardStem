import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Wrapper,
  Title,
  InputField,
  SubmitButton,
  Sign,
  SignUpLink,
} from "./Login";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/signup", user);
      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container>
      <Wrapper height="70%">
        <Title>SignUp Form</Title>
        
          <InputField
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleUserChange}
          />
          <InputField type="text" name="email" placeholder="Email Address" required onChange={handleUserChange} />

          <InputField type="password" name="password" placeholder="Password" required onChange={handleUserChange} />
          <InputField
            type="confirm-password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleUserChange}
          />

          <SubmitButton type="button" value="SignUp" onClick={handleSubmit}>
            Sign Up
          </SubmitButton>
        

        <Sign>
          Already have an account? <SignUpLink href="/login">Login</SignUpLink>
        </Sign>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
