import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ContentContext } from "../context/ContentContext";
import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const { setEnrichedContent, setTopics } = useContext(ContentContext);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const { enriched_content, topics } = response.data;
      setEnrichedContent(enriched_content);
      setTopics(topics);
      navigate("/main");
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="xl" mb="4">Upload PDF</Heading>
            <Form>
              <Form.Group>
                <Input type="file" accept="application/pdf" onChange={handleFileChange} />
              </Form.Group>
              <Button colorScheme="blue" mt="4" onClick={handleUpload}>Upload</Button>
            </Form>
          </VStack>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadPage;
