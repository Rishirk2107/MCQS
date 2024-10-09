import fitz  # PyMuPDF for PDF extraction
from educhain import Educhain, LLMConfig
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# Function to extract text from a PDF file using PyMuPDF
def extract_text_from_pdf(pdf_file_path):
    doc = fitz.open(pdf_file_path)  # Open the PDF
    text = ""

    # Iterate over all pages and extract text
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text += page.get_text()

    doc.close()
    return text

# Function to integrate with NVIDIA LangChain API within Educhain
def enhance_and_generate_mcqs_from_pdf(pdf_file_path, topic, num_questions=5, question_type="Multiple Choice"):
    # Step 1: Extract text from the PDF
    extracted_text = extract_text_from_pdf(pdf_file_path)
    
    # Step 2: Initialize the NVIDIA LangChain client
    client = ChatNVIDIA(
        model="meta/llama-3.1-70b-instruct",
        api_key="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", 
        temperature=0.2,
        top_p=0.7,
        max_tokens=1024,
    )

    # # Step 3: Use NVIDIA AI to enhance and summarize the text
    # enriched_content = ""
    # for chunk in client.stream([{"role":"user", "content": extracted_text}]):
    #     enriched_content += chunk.content

    # Step 4: Initialize Educhain client
    llm_config = LLMConfig(custom_model=client)
    educhain_client = Educhain(llm_config)

    # Step 5: Generate MCQs from the enriched content using Educhain
    questions = educhain_client.qna_engine.generate_questions_from_data(
        source=extracted_text,  # Using enhanced NVIDIA-processed text
        source_type="text",  # Ingesting enriched text
        num=num_questions, 
        question_type=question_type
    )

    # Output the generated questions
    for question in questions.dict()["questions"]:
        print(question["question"])
        for i, option in enumerate(question["options"]):
            print(f"{i + 1}. {option}")
        print(f"Answer: {question['answer']}\n")

# Example usage
pdf_file = "c:/Users/rishi/Desktop/MCQS/test.pdf"  # Path to your PDF file
topic = "DevOps"  # Example topic for question generation
enhance_and_generate_mcqs_from_pdf(pdf_file, topic, num_questions=5)
