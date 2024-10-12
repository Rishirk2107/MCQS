import React, { useContext, useState } from "react";
import axios from "axios";
import { ContentContext } from "../context/ContentContext";
import { Box, Heading, Select, Button, Text, VStack } from "@chakra-ui/react"; // Chakra components
import { Form, Container, Row, Col } from 'react-bootstrap';  // Bootstrap components

const LessonPlan = () => {
  const { topics } = useContext(ContentContext);  // Retrieve topics from context
  const [selectedTopic, setSelectedTopic] = useState("");  // State to hold selected topic
  const [lessonPlan, setLessonPlan] = useState(null);  // State to hold lesson plan response

  // Fetch lesson plan based on selected topic
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/lesson", {
        topic: selectedTopic,
      });
      setLessonPlan(response.data);  // Set the lesson plan from the server response
    } catch (error) {
      console.error("Error generating lesson plan", error);
    }
  };

  // Function to render content elements in proper format
  const renderContentElements = (contentElements) => {
    return contentElements.map((element, index) => (
      <li key={index}>
        <Text fontWeight="bold" as="span">{element.type}: </Text>{element.content}
      </li>
    ));
  };

  // Function to render subtopics with content
  const renderSubtopics = (subtopics) => {
    return subtopics.map((subtopic, index) => (
      <Box key={index} ml="5" mt="3">
        <Heading size="md">{subtopic.title}</Heading>
        <ul>{renderContentElements(subtopic.content_elements)}</ul>
      </Box>
    ));
  };

  // Function to render the entire lesson plan structure
  const renderLessonPlan = () => {
    return lessonPlan.main_topics.map((topic, index) => (
      <Box key={index} mt="5">
        <Heading size="lg">{topic.title}</Heading>
        {renderSubtopics(topic.subtopics)}
      </Box>
    ));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <VStack spacing={4} align="stretch">
            <Heading as="h2" size="xl" mb="4">Generate Lesson Plan</Heading>
            <Form>
              <Form.Group>
                <Form.Label>Select Topic</Form.Label>
                <Select
                  placeholder="Select a topic"
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  value={selectedTopic}
                  className="form-control"
                >
                  {topics.map((topic, index) => (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  ))}
                </Select>
              </Form.Group>
              <Button colorScheme="teal" mt="4" onClick={handleSubmit}>Submit</Button>
            </Form>
          </VStack>
        </Col>
      </Row>

      {/* Display the lesson plan if available */}
      {lessonPlan && (
        <Box mt="5">
          <Heading as="h3" size="lg" mb="2">{lessonPlan.title}</Heading>
          <Text><strong>Subject:</strong> {lessonPlan.subject}</Text>
          <Box>{renderLessonPlan()}</Box>
        </Box>
      )}
    </Container>
  );
};

export default LessonPlan;
