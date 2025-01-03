# import google.generativeai as genai
# from flask import Flask, request, jsonify

# # Configure API key
# genai.configure(api_key="AIzaSyDrmCKnbt8RhokPNgWtCl-_TXSj9T2xFDY")  # Replace with your actual API key

# # Initialize the Gemini model
# model = genai.GenerativeModel("gemini-1.5-flash")

# # Flask app to serve the chatbot
# app = Flask(__name__)

# @app.route('/chat', methods=['POST'])
# def chat():
#     user_message = request.json.get("message")  # Get the user message from request
    
#     # Generate a response using Gemini
#     response = model.generate_content(user_message)
    
#     # Return the response text to the frontend
#     return jsonify({"response": response.text})

# if __name__ == "__main__":
#     app.run(debug=True)
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

# Configure API key for Gemini
genai.configure(api_key="AIzaSyDrmCKnbt8RhokPNgWtCl-_TXSj9T2xFDY")  # Replace with your actual API key

# Initialize the Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")

# Flask app to serve the chatbot
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)  # This will allow cross-origin requests from any origin


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")  # Get the user message from request
    
    # Generate a response using Gemini
    response = model.generate_content(user_message)
    
    # You can process the response to make sure it's returned as HTML
    bot_reply = response.text
    
    # Return the formatted response text to the frontend
    return jsonify({"response": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)


