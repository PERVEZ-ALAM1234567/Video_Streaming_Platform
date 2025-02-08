// Modularize the code into separate functions for better organization and maintainability
// Function to handle thumbnail preview
function handleThumbnailPreview() {
  const thumbnailInput = document.querySelector('input[type="file"][accept="image/*"]');
  const thumbnailPreview = document.createElement('img');
  thumbnailPreview.style.width = '100px';
  thumbnailPreview.style.height = 'auto';
  thumbnailPreview.style.display = 'none';
  thumbnailInput.parentNode.appendChild(thumbnailPreview);

  thumbnailInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        thumbnailPreview.src = e.target.result;
        thumbnailPreview.alt = "Thumbnail Preview";
        thumbnailPreview.style.display = "block";
      };
      reader.onerror = (e) => {
        console.error("Error reading thumbnail file:", e);
        thumbnailPreview.src = "";
        thumbnailPreview.alt = "";
        thumbnailPreview.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      thumbnailPreview.src = "";
      thumbnailPreview.alt = "";
      thumbnailPreview.style.display = "none";
    }
  });
}

// Function to handle video preview
function handleVideoPreview() {
  const videoInput = document.querySelector('input[type="file"][accept="video/*"]');
  const videoPreview = document.createElement('video');
  videoPreview.style.width = '100px';
  videoPreview.style.height = 'auto';
  videoPreview.style.display = 'none';
  videoInput.parentNode.appendChild(videoPreview);

  videoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("video.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        videoPreview.src = e.target.result;
        videoPreview.style.display = "block";
      };
      reader.onerror = (e) => {
        console.error("Error reading video file:", e);
        videoPreview.src = "";
        videoPreview.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      videoPreview.src = "";
      videoPreview.style.display = "none";
    }
  });
}

// Function to handle sidebar toggle
function handleSidebarToggle() {
  const toggleButton = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");

  toggleButton.addEventListener("click", () => {
    if (sidebar.classList.contains("collapsed")) {
      sidebar.classList.remove("collapsed");
    } else {
      sidebar.classList.add("collapsed");
    }
  });
}

// Function to handle dropdown toggle
function handleDropdownToggle() {
  const dropdownToggle = document.querySelector(".three-dots");
  const dropdownMenu = document.getElementById("dropdown-menu");

  dropdownToggle.addEventListener("click", () => {
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    } else {
      dropdownMenu.classList.add("show");
    }
  });
}

function handleDayNightModeToggle() {
  const toggleModeButton = document.getElementById("toggleMode");

  // Check for saved theme preference in localStorage when the page loads
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleModeButton.classList.remove("fa-sun");
    toggleModeButton.classList.add("fa-moon");
  } else {
    document.body.classList.remove("dark-mode");
    toggleModeButton.classList.remove("fa-moon");
    toggleModeButton.classList.add("fa-sun");
  }

  toggleModeButton.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      toggleModeButton.classList.remove("fa-moon");
      toggleModeButton.classList.add("fa-sun");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      toggleModeButton.classList.remove("fa-sun");
      toggleModeButton.classList.add("fa-moon");
    }
  });
}


// Function to update year in footer
function updateYearInFooter() {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Main function to initialize all features
function initFeatures() {
  handleThumbnailPreview();
  handleVideoPreview();
  handleSidebarToggle();
  handleDropdownToggle();
  handleDayNightModeToggle();
  updateYearInFooter();
}

// Initialize all features when the document is ready
document.addEventListener("DOMContentLoaded", initFeatures);