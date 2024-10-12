import fitz  # PyMuPDF for PDF extraction
from educhain import Educhain, LLMConfig
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# Function to integrate with NVIDIA LangChain API within Educhain
def enhance_and_generate_mcqs_from_pdf(extracted_text, num_questions=5):
    # Step 1: Extract text from the PDF
    # extracted_text = extract_text_from_pdf(pdf_file_path)

    client = ChatNVIDIA(
        model="meta/llama-3.1-70b-instruct",
        api_key="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", 
        temperature=0.2,
        top_p=0.5,
        max_tokens=1024,
    )

    # Step 4: Initialize Educhain client
    llm_config = LLMConfig(custom_model=client)
    educhain_client = Educhain(llm_config)

    # Step 5: Generate MCQs from the enriched content using Educhain
    questions = educhain_client.qna_engine.generate_questions_from_data(
        source=extracted_text,  # Using enhanced NVIDIA-processed text
        source_type="text",  # Ingesting enriched text
        num=num_questions, 
        question_type="Multiple Choice",
    )

    formatted_questions = []

    for question in questions.dict()["questions"]:
        formatted_question = {
            "question": question["question"],
            "options": question["options"],
            "answer": question["answer"]
        }
        formatted_questions.append(formatted_question)
    print("Hello World\n",formatted_questions)
    return formatted_questions

# # Example usage
# pdf_file = "c:/Users/rishi/Desktop/MCQS/test.pdf"  # Path to your PDF file
# topic = "DevOps"  # Example topic for question generation
# print(enhance_and_generate_mcqs_from_pdf(pdf_file, num_questions=15))
