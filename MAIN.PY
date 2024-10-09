from langchain_nvidia_ai_endpoints import ChatNVIDIA
from educhain import Educhain, LLMConfig

# Initialize the ChatNVIDIA client
nvidia_client = ChatNVIDIA(
    model="meta/llama-3.1-70b-instruct",
    api_key="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", 
    temperature=0.2,
    top_p=0.7,
    max_tokens=1024,
)

# Configure Educhain to use the NVIDIA model
llm_config = LLMConfig(custom_model=nvidia_client)
educhain_client = Educhain(llm_config)

# Specify the path to the PDF file
pdf_path = "./teamspace/uploads/test.pdf"

# Generate questions from the PDF file
questions = educhain_client.qna_engine.generate_questions_from_data(
    source=pdf_path,
    source_type="pdf",  # Specify that the source type is 'pdf'
    num=5  # Generate 5 questions
)

# Print the generated questions
for question in questions:
    print(question)

# If you want to access the questions in JSON format
questions_json = questions.json()  # or `questions.dict()` if supported
print(questions_json)
