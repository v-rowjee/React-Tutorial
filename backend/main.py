import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel

app = FastAPI()

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173").rstrip("/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        frontend_url,
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.environ["GROQ_API_KEY"])


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def health_check():
    return {"status": "backend running"}


@app.post("/chat")
def chat(req: ChatRequest):
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        messages=[
            {
                "role": "system",
                "content": "You are a React expert. Answer clearly and stay within React tutorial topics. You may refer to official documentation of React",
            },
            {"role": "user", "content": req.message},
        ],
    )

    return {"answer": completion.choices[0].message.content}
