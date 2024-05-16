import styled from "styled-components";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 70%;
  height: 80%;
`;

const Title = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  color: #e49603;
`;

function Transaction() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      console.log(token);

      try {
        const response = await axios.get("/api/transactions/all-transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data);
        setData(response.data.transactions);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Transaction</Title>
        <Table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Distance Travelled</th>
              <th>Trip Amount</th>
              <th>Cash Back</th>
                <th>Miles Points</th>
              <th>Total Distance Travelled</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.distanceTravelled}</td>
                <td>{transaction.tripAmount}</td>
                <td>{transaction.rewards[0].cashBack}</td>
        <td>{transaction.rewards[0].milesPoints}</td>
                <td>{transaction.totalDistanceTravelled}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </Container>
  );
}

export default Transaction;
