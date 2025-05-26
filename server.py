from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Load Q&A from file
def load_knowledge_base():
    qa_pairs = {}
    with open("knowledge_base/ai_facts.txt", "r", encoding="utf-8") as f:
        lines = f.read().split("\n")
        question = ""
        for line in lines:
            if line.startswith("Q:"):
                question = line[2:].strip().lower()
            elif line.startswith("A:") and question:
                answer = line[2:].strip()
                qa_pairs[question] = answer
                question = ""
    return qa_pairs

qa_data = load_knowledge_base()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "").strip().lower()
    # Use exact matching for the question
    reply = qa_data.get(user_message, "Sorry, I don't know the answer to that yet.")
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)