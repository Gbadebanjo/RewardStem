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
  width: 18%;
  height: 100%;
  background-color: #f5f5f5;
`;

const Logo = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  //   color: #e49603;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Right = styled.div`
  width: 82%;
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
height: 40%;
display: flex;
justify-content: center;

`;

const Box = styled.div`
width: 87%;
height: 100%;
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
      </Left>
      <Right>
        <Heading>Home</Heading>
        <WelcomeContainer>
            <Welcome>Welcome,</Welcome>
            <Name>John! </Name>
        </WelcomeContainer>
        <BoxContainer>
            <Box>Box</Box>
        </BoxContainer>
      </Right>
    </Container>
  );
};

export default Home;
