import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FaHome, FaSignOutAlt, FaExchangeAlt } from "react-icons/fa";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import axios from "axios";
import Cookies from "js-cookie";
import {  Link } from "react-router-dom";

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
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledAiOutlineMenu = styled(AiOutlineMenu)`
  display: none;
  font-size: 50px;
  color: #fff;
  padding: 10px;
  position: absolute;
  top: 7px;
  right: 10px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.modalIsOpen ? 0 : 1)};

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledAiOutlineClose = styled(AiOutlineClose)`
  display: none;
  font-size: 50px;
  color: #000;
  padding: 10px;
  position: absolute;
  top: 4px;
  right: 10px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.modalIsOpen ? 1 : 0)};

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledModal = styled(Modal)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  overflow: auto;
  webkitoverflowscrolling: touch;
  borderradius: 0;
  outline: none;
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

  @media (max-width: 768px) {
  color: #e49603;
`;

const Nav = styled.div`
  background-color: #e49603;
  width: 90%;
  height: 5%;
  border-radius: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  &: hover {
    color: #e49603;
    background-color: #fff;
  }

  @media (max-width: 768px) {
    width: 70%;
    background-color: #f5f5f5;
    color: #000;
    align-items: right;
    justify-content: flex-start;
    margin-left: 30%;
  }
`;

const NavText = styled(Link)`
  font-weight: 700;
  font-size: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;

  &: hover {
    color: #e49603;
  }

  @media (max-width: 768px) {
    color: #000;
  }
`;

const Right = styled.div`
  width: 85%;
  height: 100%;
  background-color: #e49603;

  @media (max-width: 768px) {
    width: 100%;
  }
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
  width: 90%;
  diplay: flex;
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

  @media (max-width: 768px) {
    width: 95%;
    margin-left: 2%;
    height: 70%;
  }
`;

const Box1Heading = styled.h1`
  font-weight: 500;
  font-size: 25px;
  padding: 1% 2%;
  align-self: flex-start;

  @media (max-width: 768px) {
    font-size: 22px;
    align-self: center;
  }
`;

const SubBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 70%;
  }
`;

const SubBox1 = styled.div`
  width: 40%;
  height: 80%;
  background-color: #e49603;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    height: 40%;
    width: 90%;
  }
`;

const SubBoxText = styled.h1`
  font-weight: 500;
  font-size: 24px;
  color: #fff;
  align-self: flex-start;
  padding-left: 14%;

  @media (max-width: 768px) {
    font-size: 19px;
    padding-left: 1%;
    align-self: center;
  }
`;

const StyledInput = styled.input`
  width: 60%;
  height: 38%;
  background-color: #f7f7f7;
  border-radius: 10px;
  border: none;
  padding-left: 8px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 60%;
  }
`;

const SubmitButton = styled.button`
  background-color: #e49603;
  color: #fff;
  width: 40%;
  height: 20%;
  border-radius: 10px;
  font-size: 22px;
  margin-top: 10px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;

  &: hover {
    color: #e49603;
    background-color: #f7f7f7;
    border: 1px #e49603 solid;
  }

  @media (max-width: 768px) {
    margin-top: 5px;
    height: 15%;
    width: 90%;
  }
`;

const Box1b = styled.div`
  height: 40%;
  margin-top: 5%;
  display: flex;

  justify-content: space-around;
  width: 90%;
  background-color: #e49603;
  margin-left: 4%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    margin-top: 2%;
    width: 95%;
    margin-left: 2%;
  }
`;

const Cash = styled.div`
  width: 30%;
  height: 60%;
  border-radius: 10px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  margin: 5%;

  @media (max-width: 768px) {
    width: 40%;
    justify-content: center;
    text-align: center;
  }
`;

const Text = styled.h1`
  padding: 4%;
  color: #e49603;
  font-size: 18px;
  align-self: center;

  @media (max-width: 768px) {
    padding: 6%;
  }
`;

const TextValue = styled.h1`
  color: #e49603;
  font-size: 3rem;
  align-self: center;
`;

const ModalStructure = styled.div`
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [transactionData, setTransactionData] = useState({});
  const [tripAmount, setTripAmount] = useState(0);
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const username = Cookies.get("username");
  // const history = useHistory();

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  // const Logout = () => {
  //   Cookies.remove("token");
  //   Cookies.remove("username");
  //   history("/login");
  // };


  const handleTransaction = async () => {
    // console.log(tripAmount, distanceTravelled);
    try {

      const token = Cookies.get("token");
      // console.log("Token from cookie:", token);
      const response = await axios.post(
        "/api/transactions/new",
        {
          distanceTravelled,
          tripAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      if (response.status === 200) {
        setTransactionData(response.data);
        console.log(transactionData);
        console.log(response.data);
        alert("Transaction successful!");
      } else {
        alert("Transaction failed!");
      }
    } catch (error) {
      alert("Transaction failed!");
      console.log(error);
    }
  };

  return (
    <Container>
      <Left>
        <Logo>
          <FontAwesomeIcon icon={faMoneyBillWave} />
          KATAB
        </Logo>
        <Nav>
          <NavText to="/" >
            {" "}
            <FaHome style={{ marginRight: "10px" }} />
            Home
          </NavText>
        </Nav>
        <Nav >
          <NavText to="/transaction">
            <FaExchangeAlt style={{ marginRight: "10px" }} />
            Transactions
          </NavText>
        </Nav>
        <Nav>
          <NavText to='/logout' >
            {" "}
            <FaSignOutAlt style={{ marginRight: "10px" }} />
            Logout
          </NavText>
        </Nav>
      </Left>
      <Right>
        <StyledAiOutlineMenu className="menu-icon" onClick={toggleModal} />
        <Heading>Home</Heading>
        <WelcomeContainer>
          <Welcome>Welcome,</Welcome>
          <Name>{username}! </Name>
        </WelcomeContainer>
        <BoxContainer>
          <Box1Container>
            <Box1a>
              <Box1Heading>Request for Cash Back</Box1Heading>
              <SubBox>
                {" "}
                <SubBox1>
                  <SubBoxText>Input Trip Amount</SubBoxText>
                  <StyledInput
                    type="number"
                    placeholder="amount"
                    onChange={(e) => setTripAmount(parseInt(e.target.value))}
                  />
                </SubBox1>
                <SubBox1>
                  <SubBoxText>Input Trip Kilometers </SubBoxText>
                  <StyledInput
                    type="number"
                    placeholder="kilometers"
                    onChange={(e) =>
                      setDistanceTravelled(parseInt(e.target.value))
                    }
                  />
                </SubBox1>
              </SubBox>
              <SubmitButton onClick={handleTransaction}>Continue</SubmitButton>
            </Box1a>
            <Box1b>
              <Cash>
                <Text>Total Amount Spent </Text>
                <TextValue>{transactionData.reward ? transactionData.transaction.totalBalance : 0}</TextValue>
              </Cash>
              <Cash>
                <Text>Total Miles Travelled </Text>
                <TextValue>{transactionData.reward ? transactionData.transaction.totalDistanceTravelled : 0}</TextValue>
              </Cash>
            </Box1b>
          </Box1Container>
        </BoxContainer>
      </Right>

      <StyledModal isOpen={modalIsOpen} onRequestClose={toggleModal}>
        <StyledAiOutlineClose onClick={toggleModal} modalIsOpen={modalIsOpen} />
        <ModalStructure>
          <Logo>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            KATAB
          </Logo>
          <Nav>
            <NavText to="/">
              {" "}
              <FaHome style={{ marginRight: "10px" }} />
              Home
            </NavText>
          </Nav>
          <Nav>
            <NavText to="/transaction">
              {" "}
              <FaExchangeAlt style={{ marginRight: "10px" }} />
              Transactions
            </NavText>
          </Nav>
          <Nav>
            <NavText to="/logout">
              {" "}
              <FaSignOutAlt style={{ marginRight: "10px" }} />
              Logout
            </NavText>
          </Nav>
        </ModalStructure>
      </StyledModal>
    </Container>
  );
};

export default Home;
