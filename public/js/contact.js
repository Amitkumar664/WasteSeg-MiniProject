document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const responseDiv = document.getElementById("feedbackResponse");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    responseDiv.textContent = "⏳ Sending feedback...";

    try {
      const res = await fetch("/send-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (data.success) {
        responseDiv.textContent = data.message;
        responseDiv.classList.add("text-success");
        form.reset();
      } else {
        responseDiv.textContent = data.error;
        responseDiv.classList.add("text-danger");
      }
    } catch (err) {
      console.error(err);
      responseDiv.textContent = "❌ Error sending feedback.";
      responseDiv.classList.add("text-danger");
    }
  });
});