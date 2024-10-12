import React from 'react';
import { Box, Heading, Button, Text, VStack } from '@chakra-ui/react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory

const IntroPage = () => {
  const navigate = useNavigate();  // Update to useNavigate

  // Navigate to upload page
  const handleGetStarted = () => {
    navigate('/upload');  // Update to navigate
  };

  return (
    <Box 
      height="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      bgGradient="linear(to-r, teal.500, blue.500)"
    >
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <VStack spacing={6} textAlign="center">
              <Heading 
                as="h1" 
                size="2xl" 
                color="white" 
                mb="4" 
                fontWeight="bold"
              >
                Welcome to the Learning App
              </Heading>
              <Text fontSize="xl" color="whiteAlpha.900">
                Enhance your educational content with lesson plans and quizzes.
              </Text>
              <Button
                size="lg"
                colorScheme="orange"
                mt="8"
                onClick={handleGetStarted}  // Use navigate here
              >
                Get Started
              </Button>
            </VStack>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default IntroPage;
