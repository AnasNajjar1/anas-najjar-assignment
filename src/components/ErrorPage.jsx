import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  min-width: 402px;
  min-height: 469px;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    min-width: 100%;
    padding: 20px;
  }
`;

const Message = styled.p`
  color: #4f4f4f;
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 20px;
  text-align: center;
  color: red;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background-color: #2f80ed;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex; /* Added to enable flex properties */
  align-items: center; /* Centers text vertically */
  justify-content: center; /* Centers text horizontally */
  height: 42px; /* Adjust the height to match Upload button */

  &:hover {
    background-color: #1d66c5;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 12px;
    padding: 8px;
  }
`;

const ErrorPage = ({ setData, setFile, error, setError }) => {
  const history = useHistory();

  /**
   * Handle retry action by resetting error and navigating back to the upload page.
   */
  const handleRetry = () => {
    setData(null);
    setFile(null);
    setError(false);
    history.push('/');
  };

  return (
    <Container>
      <Message>Error : {error}</Message>
      <Button onClick={handleRetry}>Try Again</Button>
    </Container>
  );
};

export default ErrorPage;
