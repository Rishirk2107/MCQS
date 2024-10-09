import fitz  # PyMuPDF

# Path to your PDF file
pdf_path = "c:/Users/rishi/Desktop/MCQS/test.pdf"

def text_extraction(pdf_path):
    document = fitz.open(pdf_path)

    # Initialize an empty list to hold extracted text
    all_text = []

    # Loop through each page in the PDF
    for page_num in range(len(document)):
        page = document.load_page(page_num)  # Load the page
        text = page.get_text()  # Extract text
        all_text.append(text)

    # Join all extracted text into a single string
    return "\n".join(all_text)


# Print or process the extracted text
print(text_extraction(pdf_path))
