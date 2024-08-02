import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

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
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  color: #4f4f4f;
  font-size: 18px;
  line-height: 27px;
`;

const Subtitle = styled.p`
  color: #828282;
  font-size: 12px;
  line-height: 18px;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  animation: fadeIn 0.5s ease-in;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Label = styled.label`
  font-weight: bold;
  width: 48%;
  font-size: 14px;
  padding-top: 10px;
`;

const Input = styled.input`
  width: 48%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #2f80ed;
    outline: none;
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
  margin-top: 20px;
  
  &:hover {
    background-color: #1d66c5;
  }
`;

const ResultData = ({ data, setData, setFile }) => {
  const history = useHistory();
  console.log("data ", data);

  /**
   * Handle retry action by resetting data and navigating back to the upload page.
   */
  const handleRetry = () => {
    setData(null);
    setFile(null);
    history.push('/');
  };

  return (
    <Container>
      <Header>
        <Title>Result Data</Title>
        <Subtitle>Here is the extracted information from your ID card.</Subtitle>
      </Header>
      <FormRow>
        <Label>Document Type</Label>
        <Input value={data?.documentType || ''} readOnly />
      </FormRow>
      <FormRow>
        <Label>Document Number</Label>
        <Input value={data?.documentNumber || ''} readOnly />
      </FormRow>
      <FormRow>
        <Label>First Name</Label>
        <Input value={data?.firstName || ''} readOnly />
      </FormRow>
      <FormRow>
        <Label>Last Name</Label>
        <Input value={data?.lastName || ''} readOnly />
      </FormRow>
      <FormRow>
        <Label>Date of Issue</Label>
        <Input value={data?.dateOfIssue || ''} readOnly />
      </FormRow>
      <FormRow>
        <Label>Date of Birth</Label>
        <Input value={data?.dateOfBirth || ''} readOnly />
      </FormRow>
      <FormRow>
        <Label>Date of Expiry</Label>
        <Input value={data?.dateOfExpiry || ''} readOnly />
      </FormRow>
      <FormRow>
        <Label>Nationality</Label>
        <Input value={data?.nationality || ''} readOnly />
      </FormRow>
      <FormRow>
        <Label>Sex</Label>
        <Input value={data?.sex || ''} readOnly />
      </FormRow>
      <Button onClick={handleRetry}>Try Again</Button>
    </Container>
  );
};

export default ResultData;
