import React from 'react';
import { Box, Heading, Button, VStack, Text } from '@chakra-ui/react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory

const MainPage = () => {
  const navigate = useNavigate();  // Use useNavigate for navigation

  // Function to handle navigation
  const handleNavigate = (path) => {
    navigate(path);  // Navigate to the respective page
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <VStack spacing={6} textAlign="center">
              <Heading as="h1" size="2xl" mb="4">
                Choose an Option
              </Heading>
              <Text fontSize="lg" color="gray.700">
                What would you like to do?
              </Text>
              <VStack spacing={4}>
                <Button
                  size="lg"
                  colorScheme="blue"
                  width="100%"  // Full width button
                  onClick={() => handleNavigate('/lesson-plan')}  // Navigate to Lesson Plan
                >
                  Generate Lesson Plan
                </Button>
                <Button
                  size="lg"
                  colorScheme="green"
                  width="100%"  // Full width button
                  onClick={() => handleNavigate('/quiz')}  // Navigate to Quiz
                >
                  Generate Quiz
                </Button>
              </VStack>
            </VStack>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default MainPage;
