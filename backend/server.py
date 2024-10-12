from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

# Modules
from arti import enhance_and_generate_mcqs_from_pdf  # Your custom module
from extractor import extract_text_from_pdf
from lesson_plan import generate_lesson_plans

#Global Variables
final_extracted=""
topics=[]

#BaseModels
class NumQuestions(BaseModel):
    num_questions: int

class LessonPlan(BaseModel):
    topic: str

app = FastAPI()

# CORS settings (allowing React frontend to interact with FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the allowed origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        global final_extracted
        pdf_file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        with open(pdf_file_path, "wb") as pdf_file:
            pdf_file.write(await file.read())
        
        #final={"enriched_content": string, "topics": [array]}
        final = extract_text_from_pdf(pdf_file_path)
        

        final_extracted=final["enriched_content"]
        
        return JSONResponse(content=final)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/generate")
async def generate_mcqs(num_questions:NumQuestions):
    try:
        # mcqs=[{question:"",options:[string1,string2,string4,string3],answer:sstring}]
        mcqs = enhance_and_generate_mcqs_from_pdf(final_extracted, num_questions)

        return JSONResponse(content=mcqs)

    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse(content={"error": "Error extracting MCQs"}, status_code=500)
    
@app.post("/lesson")
async def generate_lesson(topic:LessonPlan):
    try:
        lesson_plan = generate_lesson_plans(topic)
        return JSONResponse(content=lesson_plan)
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse(content={"error": "Error generating lesson plan"}, status_code=500)
    


# Run the FastAPI app using Uvicorn
if __name__ == "__main__":
    #worker.process_document() #Perists directory
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")