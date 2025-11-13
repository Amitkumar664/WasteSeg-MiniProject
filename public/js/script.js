// ================================
// 🌐 Navbar Toggle
// ================================
function toggleMenu() {
  // Use Bootstrap 5 classes: .collapse and .show
  const nav = document.querySelector("#navbarNav"); // Selector changed to target the ID of the collapsible div
  const toggler = document.querySelector(".navbar-toggler");

  if (nav.classList.contains("show")) {
    nav.classList.remove("show");
    toggler.setAttribute("aria-expanded", "false");
  } else {
    nav.classList.add("show");
    toggler.setAttribute("aria-expanded", "true");
  }
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
  const images = ["./assets/backofDashboard.jpg","./assets/b1.jpeg", "./assets/b2.jpeg"];
  let current = 0;
  const heroBg = document.querySelector(".hero-image-container");

  function changeBackground() {
    if (heroBg) {
      // In a modern context, using a background image in CSS is often cleaner for hero sections
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
      // Get the key from the class list, assuming the second class is the key (e.g., 'btn', 'pollution')
      const keyClass = Array.from(btn.classList).find(c => data.hasOwnProperty(c));
      
      if (!keyClass) return; // Exit if no valid key is found

      const { title, image, points } = data[keyClass];

      infoTitle.textContent = title;
      infoImage.src = image;
      // Using .map() to create the <li> elements
      infoPoints.innerHTML = points.map(p => `<li>${p}</li>`).join("");

      // Add the 'show' class to display the box with animation
      infoBox.classList.add("show");

      // Scroll into view smoothly on mobile/small screens
      setTimeout(() => {
        infoBox.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); 
    });
  });

  // Click/tap outside to close info box
  document.addEventListener("click", event => {
    // Check if the click is outside the infoBox AND not on a consequence button
    if (
      infoBox.classList.contains("show") &&
      !infoBox.contains(event.target) &&
      !event.target.closest(".consequence-btn") // Use .closest() for better targeting of the button element
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
