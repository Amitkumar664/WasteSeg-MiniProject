document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const responseDiv = document.getElementById("feedbackResponse");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      responseDiv.textContent = "⚠️ Please fill all fields!";
      responseDiv.classList.replace("text-success", "text-danger");
      return;
    }

    // Simulate sending email (replace with backend API later)
    responseDiv.textContent = "📧 Sending your feedback...";
    responseDiv.classList.replace("text-danger", "text-success");

    setTimeout(() => {
      responseDiv.textContent = "✅ Thank you! Your feedback has been sent.";
      form.reset();
    }, 1500);
  });
});
