import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form, Alert } from 'react-bootstrap';

const UploadPdfPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('num_questions', numQuestions);

    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      navigate('/quiz', { state: { quizData: data } });
    } catch (error) {
      console.error('Error uploading PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <Form className="w-50 bg-white p-5 shadow rounded" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">Upload Your PDF</h2>

        <Form.Group controlId="formFile" className="mb-4">
          <Form.Label>Select a PDF file</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <Form.Group controlId="formNumQuestions" className="mb-4">
          <Form.Label>Number of Questions</Form.Label>
          <Form.Control
            as="select"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="btn-lg w-100"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default UploadPdfPage;
