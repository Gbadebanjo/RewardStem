import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  width: 15%;
  height: 100%;
  background-color: #f5f5f5;
  `;

const Logo = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Nav = styled.div`
  background-color: #e49603;
  width: 80%;
  height: 5%;
  border-radius:
  margin: 10px;
`;

const NavText = styled.a`
font-width: 700;
font-size: 25px;
cursor: pointer;
`;

const Right = styled.div`
  width: 85%;
  height: 100%;
  background-color: #e49603;
`;

const Heading = styled.div`
  font-size: 30px;
  font-weight: 700;
  padding: 2.5% 0 2% 6%;
  border-bottom: 1px solid #fff;
  margin-bottom: 10px;
`;

const WelcomeContainer = styled.div`
  padding: 2.5% 0 2% 6%;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const Welcome = styled.h1`
  font-size: 30px;
  font-weight: 500;
  color: #292929;
`;

const Name = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #000;
`;

const BoxContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Box1Container = styled.div`
  height: 100%;
  width: 47%;
  diplay: flex;
  // background-color: red;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Box1a = styled.div`
  width: 90%;
  height: 50%;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-left: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box1Heading = styled.h1`
  font-weight: 500;
  font-size: 25px;
  padding: 1% 2%;
  align-self: flex-start;
`;

const SubBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SubBox1 = styled.div`
  width: 46%;
  height: 80%;
  background-color: #e49603;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SubBoxText = styled.h1`
  font-weight: 500;
  font-size: 24px;
  color: #fff;
  align-self: flex-start;
  padding-left: 14%;
`;

const StyledInput = styled.input`
  width: 70%;
  height: 38%;
  background-color: #f7f7f7;
  border-radius: 10px;
  border: none;
  padding-left: 8px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #e49603;
  color: #fff;
  width: 50%;
  height: 20%;
  border-radius: 10px;
  font-size: 22px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  &: hover {
    color: #e49603;
    background-color: #fff;
  }
`;

const Box1b = styled.div`
  height: 20%;
  margin-top: 5%;
  display: flex;

  justify-content: space-around;
  width: 90%;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-left: 4%;
  flex-direction: row;
  align-items: center;
`;

const Cash = styled.div`
  width: 45%;
  height: 60%;
  border-radius: 10px;
  background-color: #e49603;
  display: flex;
  align-items: center;
`;

const Text = styled.h1`
  padding-left: 3%;
  color: #fff;
  font-size: 18px;
`;
const Box2 = styled.div`
  height: 76%;
  width: 35%;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const Home = () => {
  return (
    <Container>
      <Left>
        <Logo>
          <FontAwesomeIcon icon={faMoneyBillWave} />
          KATAB
        </Logo>
        <Nav>
          <NavText>Home</NavText>
        </Nav>
      </Left>
      <Right>
        <Heading>Home</Heading>
        <WelcomeContainer>
          <Welcome>Welcome,</Welcome>
          <Name>John! </Name>
        </WelcomeContainer>
        <BoxContainer>
          <Box1Container>
            <Box1a>
              <Box1Heading>Request for Cash Back</Box1Heading>
              <SubBox>
                {" "}
                <SubBox1>
                  <SubBoxText>Input Trip Amount</SubBoxText>
                  <StyledInput type="text" placeholder="amount" />
                </SubBox1>
                <SubBox1>
                  <SubBoxText>Input Trip Kilometers </SubBoxText>
                  <StyledInput type="text" placeholder="kilometers" />
                </SubBox1>
              </SubBox>
              <SubmitButton>Continue</SubmitButton>
            </Box1a>
            <Box1b>
              <Cash>
                <Text>Total Bonus</Text>
              </Cash>
              <Cash>
                <Text>Total Miles </Text>
              </Cash>
            </Box1b>
          </Box1Container>

          <Box2>Box</Box2>
        </BoxContainer>
      </Right>
    </Container>
  );
};

export default Home;
