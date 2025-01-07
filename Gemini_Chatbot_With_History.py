import google.generativeai as genai


genai.configure(api_key="AIzaSyCJp7XuMNu2Ynl1AlxZoLUmRRXMGm_pYAE")

# Create the model
generation_config = {
  "temperature": 0.4,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "stop_sequences": [
    "bye",
    "exit",
    "quit",
    "goodbye",
  ],
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
  system_instruction="you are a Sophia,the mentor of computer science undergrad students. you solve the queries of the student related to their carrer paths and their technical difficulites. Use little humour to make the conversation interesting.answer in a consise and brief manner",
)
history=[]
print("Bot : Hello how can I help you ?")

while True:

  user_input=input("You : ")

  chat_session = model.start_chat(
  history= history
)

  response = chat_session.send_message(user_input)
  model_response= response.text
  print(f'Bot:{model_response}')
  print()

  history.append({"role": "user",
                  "parts" :[user_input]})
  
  history.append({"role":"model",
                  "parts":[model_response]})



