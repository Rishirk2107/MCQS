import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Jumbotron } from 'react-bootstrap';

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <h1 className="display-4 mb-4">Welcome to the Quiz App!</h1>
        <p className="lead mb-5">Test your knowledge with a quick assessment.</p>
        <Button 
          onClick={() => navigate('/upload_pdf')}
          className="btn-lg px-5 py-3"
          variant="primary"
        >
          Assess Yourself
        </Button>
    </Container>
  );
};

export default IntroPage;
