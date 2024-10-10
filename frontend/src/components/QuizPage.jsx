import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Button, Card, Form, Alert } from 'react-bootstrap';

const QuizPage = () => {
  const { state } = useLocation();
  const { quizData } = state;
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerChange = (questionIndex, value) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quizData.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResult(true);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Your Quiz</h2>

      {quizData.map((question, index) => (
        <Card key={index} className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title>{`${index + 1}. ${question.question}`}</Card.Title>
            <Form>
              {question.options.map((option, optionIndex) => (
                <Form.Check
                  key={optionIndex}
                  type="radio"
                  name={`question-${index}`}
                  label={option}
                  value={option}
                  checked={selectedAnswers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                />
              ))}
            </Form>
          </Card.Body>
        </Card>
      ))}

      <Button
        variant="success"
        size="lg"
        className="w-100"
        onClick={handleSubmitQuiz}
        disabled={Object.keys(selectedAnswers).length !== quizData.length}
      >
        Submit Quiz
      </Button>

      {showResult && (
        <Alert className="mt-4 text-center" variant="info">
          You got {score} out of {quizData.length} correct!
        </Alert>
      )}
    </Container>
  );
};

export default QuizPage;
