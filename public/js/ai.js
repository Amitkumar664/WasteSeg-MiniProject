

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("imageInput");
  const btn = document.getElementById("identifyBtn");
  const result = document.getElementById("resultMessage");

  btn.addEventListener("click", async () => {
    const file = input.files[0];
    if (!file) {
      result.textContent = "⚠️ Please upload or capture an image first.";
      result.classList.replace("text-success", "text-danger");
      return;
    }

    result.textContent = "🔍 Identifying waste... Please wait";
    result.classList.replace("text-danger", "text-success");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/identify-waste", { method: "POST", body: formData });
    const data = await res.json();

    if (data.error) {
      result.textContent = "❌ Error identifying waste. Try again!";
      result.classList.replace("text-success", "text-danger");
    } else {
      result.textContent = `♻️ Waste Type: ${data.result}`;
    }
  });
});

