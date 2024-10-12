import React, { createContext, useState } from "react";

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [enrichedContent, setEnrichedContent] = useState("");
  const [topics, setTopics] = useState([]);

  return (
    <ContentContext.Provider value={{ enrichedContent, setEnrichedContent, topics, setTopics }}>
      {children}
    </ContentContext.Provider>
  );
};
