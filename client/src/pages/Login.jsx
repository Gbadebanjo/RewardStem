import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
  background: -webkit-linear-gradient(left, #e49603, #d38503, #c27403, #e49603);
`;

export const Wrapper = styled.div`
  width: 30%;
  height: ${props => props.height || "50%"};
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 80%;
    padding: 20px;
  }
`;

export const Title = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  color: #e49603;
`;

export const InputField = styled.input`
  width: 70%;
  outline: none;
  border-radius: 15px;
  border: 2px solid #d38503;
  margin: 15px 0;
  padding: 10px;
  
  font-size: 17px;
  `;
  
  export const SubmitButton = styled.button`
  height: 45px;
  width: 76%;
  margin: 20px 0;
  color: #fff;
  border-radius: 15px;
  font-size: 25px;
  font-weight: 500;
  cursor: pointer;
  background: -webkit-linear-gradient(left, #e49603, #d38503, #c27403, #e49603);

  &:hover {
    background: #fff;
    color: #e49603;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  }
`;

export const Sign = styled.div`
display: flex;
gap: 5px;
`;

export const SignUpLink = styled.a`
color: #e49603;

&: hover {
  color: #c27403;
}
`;

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      const { token, user: { username } } = response.data;
      Cookies.set('token', token);
      Cookies.set('username', username);
      alert("Account successfully logged in");
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };


  return (
    <Container>
      <Wrapper>
        <Title>Login Form</Title>
          <InputField type="text" name="email" placeholder="Email Address" required onChange={handleUserChange}/>

          <InputField type="password" name="password" placeholder="Password" required onChange={handleUserChange} />

          
            <SubmitButton type="button" value="Login" onClick={handleSubmit}>Login</SubmitButton>
         

          <Sign>
            Don&apos;t have an account? <SignUpLink href="/signup">SignUp now</SignUpLink>
          </Sign>

      </Wrapper>
    </Container>
  );
};

export default Login ;
