import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Container, Wrapper, Title, InputField, SubmitButton, Sign, SignUpLink } from "./Login";


const SignUp = () => {
  return (
    <Container>
      <Wrapper height="70%">
        <Title>SignUp Form</Title>
          <InputField type="text" placeholder="Username" required />
          <InputField type="text" placeholder="Email Address" required />

          <InputField type="password" placeholder="Password" required />
          <InputField type="confirm-password" placeholder="Confirm Password" required />

          
            <SubmitButton type="submit" value="SignUp">Sign Up</SubmitButton>
         

          <Sign>
            Already have an account? <SignUpLink href="/login">Login</SignUpLink>
          </Sign>

      </Wrapper>
    </Container>
  );
};

export default SignUp ;
