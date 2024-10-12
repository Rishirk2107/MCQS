import fitz  # PyMuPDF for PDF extraction
from educhain import Educhain, LLMConfig
from langchain_nvidia_ai_endpoints import ChatNVIDIA

def filter_and_merge_topics(topics):
    unwanted_words = {
        "here", "are", "the", "in", "of", "or", "only", 
        "key", "discussed", "content", "form", "one", 
        "two", "three", ",", ".", ":", "",
        "topics", 'words'
    }
    
    final_topics = []
    current_topic = []

    for topic in topics:
        # Check if the topic is a number or unwanted word
        if topic.isdigit() or topic.lower() in unwanted_words:
            if current_topic:  # If there's a current topic, save it
                final_topics.append(" ".join(current_topic).strip())
                current_topic = []  # Reset for the next topic
        elif topic == ".":  # Merge current topic when a period is encountered
            if current_topic:  
                final_topics.append(" ".join(current_topic).strip())
                current_topic = []  # Reset
        else:
            current_topic.append(topic)  # Add valid words to current topic

    # Add the last topic if there is any
    if current_topic:
        final_topics.append(" ".join(current_topic).strip())

    return final_topics

# Function to extract text from a PDF file using PyMuPDF
def extract_text_from_pdf(pdf_file_path):
    doc = fitz.open(pdf_file_path)  # Open the PDF
    text = ""

    # Iterate over all pages and extract text
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text += page.get_text()

    doc.close()

    client = ChatNVIDIA(
        model="meta/llama-3.1-70b-instruct",
        api_key="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", 
        temperature=0.2,
        top_p=0.7,
        max_tokens=1024,
    )

    enriched_content = ""
    for chunk in client.stream([{"role":"user", "content": text}]):
        enriched_content += chunk.content

    prompt = f"Extract the key topics discussed in the following content in the form of one, two, or three words only: {enriched_content}"
    topics = []

    # Stream the response from the API
    for chunk in client.stream([{"role": "user", "content": prompt}]):
        topics.append(chunk.content.strip())  # Append each chunk of topics to the list
    
    print(topics)

    print(filter_and_merge_topics(topics))

    return {"enriched_content": enriched_content, "topics": filter_and_merge_topics(topics)}