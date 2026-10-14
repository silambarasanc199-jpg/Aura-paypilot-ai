
const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const questionInput = document.getElementById("questionInput");
const assistantStatus = document.getElementById("assistantStatus");
const paymentButton = document.getElementById("demoPaymentBtn");
const paymentNotice = document.getElementById("paymentNotice");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className =
    sender === "user"
      ? "message user-message"
      : "message assistant-message";

  // textContent prevents user input from being interpreted as HTML.
  message.textContent = text;
  chatWindow.appendChild(message);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getDemoResponse(question) {
  const q = question.toLowerCase();

  if (
    q.includes("safe") ||
    q.includes("security") ||
    q.includes("fraud") ||
    q.includes("scam")
  ) {
    return "Payment safety tips:\n\n1. Check the merchant and payment amount before confirming.\n2. Never share your password or one-time verification code.\n3. Use official PayPal pages and enable two-factor authentication.\n4. Review your account activity and report suspicious transactions.\n\nThis is general guidance from the demo assistant.";
  }

  if (
    q.includes("budget") ||
    q.includes("saving") ||
    q.includes("spending")
  ) {
    return "A simple budgeting approach:\n\n1. Track your monthly income and expenses.\n2. Separate needs, savings, and optional spending.\n3. Set a realistic spending limit for each category.\n4. Review your expenses weekly.\n\nThis prototype does not access your bank or PayPal account.";
  }

  if (
    q.includes("paypal") ||
    q.includes("sandbox") ||
    q.includes("test payment")
  ) {
    return "PayPal Sandbox is a testing environment for developers.\n\n• Create sandbox accounts in the PayPal Developer Dashboard.\n• Configure your app and sandbox credentials.\n• Use the JavaScript SDK for the checkout interface.\n• Use a secure backend to create and capture orders.\n• Test success, cancellation, and error scenarios.\n\nNever put your PayPal client secret in frontend JavaScript.";
  }

  if (
    q.includes("hello") ||
    q.includes("hi") ||
    q.includes("hey")
  ) {
    return "Hello! Welcome to AURA PayPilot AI. I can share demo guidance about payment safety, budgeting, and PayPal Sandbox development. What would you like to explore?";
  }

  return "Thanks for your question! I'm currently running in demo mode, so I can answer basic questions about payment safety, budgeting, and PayPal Sandbox testing. A real AI service will be connected through a secure backend in a later step.";
}

function askDemoAssistant(question) {
  const cleanedQuestion = question.trim();

  if (!cleanedQuestion) return;

  addMessage(cleanedQuestion, "user");
  assistantStatus.textContent = "Demo responding";

  const response = getDemoResponse(cleanedQuestion);
  addMessage(response, "assistant");

  assistantStatus.textContent = "Demo ready";
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = questionInput.value.trim();
  if (!question) return;

  askDemoAssistant(question);
  questionInput.value = "";
  questionInput.focus();
});

document.querySelectorAll(".suggestion").forEach((button) => {
  button.addEventListener("click", () => {
    askDemoAssistant(button.dataset.question || button.textContent);
  });
});

paymentButton.addEventListener("click", () => {
  paymentNotice.replaceChildren();

  const heading = document.createElement("strong");
  heading.textContent = "Demo checkout preview";

  const message = document.createElement("p");
  message.textContent =
    "No payment was processed. Next, connect PayPal Sandbox through a secure backend to enable a genuine test checkout.";

  paymentNotice.append(heading, message);
});

console.log("AURA PayPilot AI demo initialized.");
