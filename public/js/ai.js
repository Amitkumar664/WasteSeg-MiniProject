document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("imageInput");
  const btn = document.getElementById("identifyBtn");
  const result = document.getElementById("resultMessage");

  btn.addEventListener("click", () => {
    const file = input.files[0];
    if (!file) {
      result.textContent = "⚠️ Please upload or capture an image first.";
      result.classList.replace("text-success", "text-danger");
      return;
    }

    // TEMP: Simulated AI result
    const fakeResults = [
      "🪴 Organic Waste",
      "🧴 Plastic Waste",
      "📰 Paper Waste",
      "🪨 Metal Waste",
      "🧱 Construction Waste"
    ];
    const randomResult = fakeResults[Math.floor(Math.random() * fakeResults.length)];

    result.textContent = `🧠 This looks like ${randomResult}`;
    result.classList.replace("text-danger", "text-success");
  });
});
