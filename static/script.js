// Include Marked.js for Markdown rendering
// Make sure you have added this in your HTML: <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

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

    // Create a typing indicator for the bot
    const botTypingIndicator = document.createElement("div");
    botTypingIndicator.className = "message bot-message typing-indicator";
    botTypingIndicator.textContent = "Bot is typing...";
    chatMessages.appendChild(botTypingIndicator);

    // Scroll to the bottom
    scrollToBottom();

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

        // Remove typing indicator and display bot response with animation
        chatMessages.removeChild(botTypingIndicator);

        const botResponse = document.createElement("div");
        botResponse.className = "message bot-message";
        chatMessages.appendChild(botResponse);

        // Animate the bot's reply
        typeBotResponse(botResponse, `Bot: ${botMessage}`);
    } catch (error) {
        console.error("Error:", error);
        chatMessages.removeChild(botTypingIndicator); // Remove typing indicator if error occurs
        const errorMessage = document.createElement("div");
        errorMessage.className = "message bot-message error-message";
        errorMessage.textContent = "Bot: Something went wrong. Please try again.";
        chatMessages.appendChild(errorMessage);
    }

    // Clear input field
    userInput.value = "";
});

// Function to scroll to the bottom of the chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to animate bot response word by word and render Markdown
function typeBotResponse(element, text) {
    const words = text.split(" "); // Split the response into words
    let currentWordIndex = 0;
    element.innerHTML = ""; // Clear the element initially

    const typingInterval = setInterval(() => {
        if (currentWordIndex < words.length) {
            element.innerHTML += words[currentWordIndex] + " "; // Append the next word
            scrollToBottom(); // Ensure the user sees the latest word
            currentWordIndex++;
        } else {
            clearInterval(typingInterval); // Stop the interval when done
            element.innerHTML = marked.parse(text); // Render markdown after typing finishes
        }
    }, 100); // Adjust typing speed (in milliseconds)
}

// Trigger send on Enter key press
userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent newline insertion
        sendMessageButton.click(); // Trigger the send button
    }
});
