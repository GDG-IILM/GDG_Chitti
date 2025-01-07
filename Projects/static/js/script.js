// Theme Toggle Functionality
const themeToggler = document.getElementById("theme-toggler");
const body = document.body;

themeToggler.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
    themeToggler.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Chatbot Toggle Functionality
const openChatButton = document.getElementById("open-chat");
const closeChatButton = document.getElementById("close-chat");
const chatbotContainer = document.getElementById("chatbot-container");

openChatButton.addEventListener("click", () => {
    chatbotContainer.classList.remove("hidden");
});

closeChatButton.addEventListener("click", () => {
    chatbotContainer.classList.add("hidden");
});

// Chat Interaction
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendMessageButton = document.getElementById("send-message");

let chatHistory = [];

sendMessageButton.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = `You: ${message}`;
    chatMessages.appendChild(userMessage);

    // Send message to backend
    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                history: chatHistory,
            }),
        });

        const data = await response.json();
        const botMessage = data.response;

        // Update chat history
        chatHistory = data.history;

        // Display bot response
        const botResponse = document.createElement("div");
        botResponse.className = "message bot-message";
        botResponse.textContent = `Bot: ${botMessage}`;
        chatMessages.appendChild(botResponse);
    } catch (error) {
        console.error("Error:", error);
    }

    // Clear input field
    userInput.value = "";

    // Scroll to the bottom of the chat
    // scrollToBottom();
});

// Function to scroll to the bottom of the chat
function scrollToBottom() {
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Call this function after adding a new message
sendMessageButton.addEventListener("click", async () => {
    // (Existing message handling code...)
    
    // After appending messages
    scrollToBottom();
});

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent newline insertion
        sendMessageButton.click(); // Trigger the send button
    }
});
