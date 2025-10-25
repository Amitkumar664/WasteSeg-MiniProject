// ================================
// 🌐 Navbar Toggle
// ================================
function toggleMenu() {
  const nav = document.querySelector(".nav-links");
  nav.classList.toggle("active");
}

// ================================
// 🚀 Scripts After DOM Loads
// ================================
document.addEventListener("DOMContentLoaded", () => {

  // 🔐 Login Button Alert
  const loginBtn = document.querySelector(".login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      alert("Redirecting to Login Page...");
    });
  }

  // 🌄 Rotating Hero Background Images
  const images = ["./assets/b1.jpg", "./assets/b2.jpg"];
  let current = 0;
  const heroBg = document.querySelector(".hero-image-container");

  function changeBackground() {
    if (heroBg) {
      heroBg.style.backgroundImage = `url(${images[current]})`;
      heroBg.style.backgroundSize = "cover";
      heroBg.style.backgroundPosition = "center";
      current = (current + 1) % images.length;
    }
  }

  changeBackground();
  setInterval(changeBackground, 5000);

  // ⚠️ Consequences Info Box Logic
  const buttons = document.querySelectorAll(".consequence-btn");
  const infoBox = document.getElementById("info-box");
  const infoImage = document.getElementById("info-image");
  const infoTitle = document.getElementById("info-title");
  const infoPoints = document.getElementById("info-points");

  const data = {
    pollution: {
      title: "Environmental Pollution",
      image: "./assets/pollution.jpg",
      points: ["Air pollution from waste burning", "Water contamination", "Soil degradation"]
    },
    warming: {
      title: "Global Warming",
      image: "./assets/warming.jpeg",
      points: ["Increase in CO₂ emissions", "Rising temperatures", "Melting polar ice"]
    },
    health: {
      title: "Health Issues",
      image: "./assets/Health.jpeg",
      points: ["Respiratory diseases", "Contaminated food", "Vector-borne illnesses"]
    },
    marine: {
      title: "Marine Life Threat",
      image: "./assets/marine.jpeg",
      points: ["Plastic ingestion by fish", "Coral reef destruction", "Toxic chemicals in water"]
    },
    economic: {
      title: "Economic Impact",
      image: "./assets/economic.jpg",
      points: ["Cleanup costs", "Loss of tourism", "Reduced agricultural yield"]
    }
  };

  // Show info box on button click (mobile-friendly)
  buttons.forEach(btn => {
    btn.addEventListener("click", e => {
      const key = btn.classList[1]; // pollution, warming, etc.
      const { title, image, points } = data[key];

      infoTitle.textContent = title;
      infoImage.src = image;
      infoPoints.innerHTML = points.map(p => `<li>${p}</li>`).join("");

      // Show info box
      infoBox.classList.add("show");

      // Scroll into view smoothly on mobile
      setTimeout(() => {
        infoBox.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // small delay ensures rendering
    });
  });

  // Click/tap outside to close info box
  document.addEventListener("click", event => {
    if (
      infoBox.classList.contains("show") &&
      !infoBox.contains(event.target) &&
      !event.target.classList.contains("consequence-btn")
    ) {
      infoBox.classList.remove("show");
    }
  });

  // Optional: press ESC to close info box
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && infoBox.classList.contains("show")) {
      infoBox.classList.remove("show");
    }
  });

});
