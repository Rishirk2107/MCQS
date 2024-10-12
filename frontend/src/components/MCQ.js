import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Heading, RadioGroup, Radio, VStack, Text } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";

const MCQ = () => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [mcqs, setMcqs] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Handle submission to get MCQs from server
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/generate", {
        num_questions: numQuestions,
      });
      setMcqs(response.data);
      setUserAnswers(new Array(response.data.length).fill(null));  // Initialize user answers array
    } catch (error) {
      console.error("Error generating MCQs", error);
    }
  };

  // Handle user's selection for current question
  const handleOptionChange = (value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = value;
    setUserAnswers(updatedAnswers);
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < mcqs.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If on the last question, evaluate the answers
      handleEvaluateQuiz();
    }
  };

  // Evaluate the quiz by comparing user answers with correct ones
  const handleEvaluateQuiz = () => {
    let correctAnswers = 0;
    mcqs.forEach((mcq, index) => {
      if (mcq.answer === userAnswers[index]) {
        correctAnswers += 1;
      }
    });
    setScore(correctAnswers);
    setShowResult(true);
  };

  return (
    <Box bg="gray.50" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <Box bg="white" p={6} shadow="md" borderRadius="md">
              <VStack spacing={6}>
                {/* Before Quiz Generation */}
                {mcqs.length === 0 && !showResult && (
                  <>
                    <Heading as="h2" size="xl" mb="4">
                      Generate Quiz
                    </Heading>
                    <Text>Enter the number of questions:</Text>
                    <input
                      type="number"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(e.target.value)}
                      placeholder="Enter number of questions"
                      className="form-control"
                    />
                    <Button colorScheme="blue" onClick={handleSubmit} mt={4}>
                      Submit
                    </Button>
                  </>
                )}

                {/* During the Quiz */}
                {mcqs.length > 0 && !showResult && (
                  <>
                    <Heading as="h3" size="lg">
                      Question {currentQuestion + 1}/{mcqs.length}
                    </Heading>
                    <Text fontSize="xl">{mcqs[currentQuestion].question}</Text>
                    <RadioGroup
                      onChange={handleOptionChange}
                      value={userAnswers[currentQuestion] || ""}
                    >
                      <VStack alignItems="flex-start" spacing={3}>
                        {mcqs[currentQuestion].options.map((option, index) => (
                          <Radio value={option} key={index}>
                            {option}
                          </Radio>
                        ))}
                      </VStack>
                    </RadioGroup>
                    <Button
                      colorScheme="green"
                      mt={6}
                      onClick={handleNextQuestion}
                      isDisabled={userAnswers[currentQuestion] === null}
                    >
                      {currentQuestion === mcqs.length - 1 ? "Finish Quiz" : "Next Question"}
                    </Button>
                  </>
                )}

                {/* After Quiz Completion */}
                {showResult && (
                  <>
                    <Heading as="h3" size="lg" color="green.500">
                      Quiz Completed!
                    </Heading>
                    <Text fontSize="xl">You scored {score} out of {mcqs.length}.</Text>
                    <Button
                      colorScheme="blue"
                      onClick={() => window.location.reload()}
                      mt={4}
                    >
                      Take Quiz Again
                    </Button>
                  </>
                )}
              </VStack>
            </Box>
          </Col>
        </Row>
      </Container>
    </Box>
  );
};

export default MCQ;
