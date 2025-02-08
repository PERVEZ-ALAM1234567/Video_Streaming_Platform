// --- FOR BOTH SIDEBAR COLLAPSED AND FILTER MOVEMENT ACCORDING TO SIDEBAR COLLAPSED --------------------

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const toggleSidebarBtn = document.getElementById("toggleSidebar");

  // Initially keep sidebar closed
  sidebar.classList.remove("open");

  // Toggle sidebar on button click
  toggleSidebarBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const modeIcon = document.getElementById("toggleMode");

  // ✅ Check Local Storage for Mode
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";

  if (isDarkMode) {
    enableDarkMode();  // If dark mode saved, enable it
  } else {
    disableDarkMode(); // Else keep light mode
  }

  // ✅ Toggle Mode on Click
  modeIcon.addEventListener("click", () => {
    if (body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  function enableDarkMode() {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
    modeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("darkMode", "enabled"); // ✅ Save state
  }

  function disableDarkMode() {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
    modeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("darkMode", "disabled"); // ✅ Save state
  }
});

// --- INITIAL SETUP ----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let videoUrl = decodeURIComponent(urlParams.get("video"));
  const title = decodeURIComponent(urlParams.get("title"));
  const description = decodeURIComponent(urlParams.get("description"));

  // Validate parameters
  if (!videoUrl || !title || !description) {
    console.error("Required URL parameters not found.");
    return;
  }

  if (!videoUrl.startsWith("http") && !videoUrl.startsWith("/")) {
    videoUrl = "../" + videoUrl;
  }

  const videoElement = document.getElementById("video-player");
  if (!videoElement) {
    console.error("Video player element not found.");
    return;
  }

  videoElement.src = videoUrl;
  videoElement.muted = true; // Mute the video to allow autoplay
  videoElement.load();

  // Ensure the video is ready before playing
  videoElement.addEventListener("canplay", function () {
    try {
      videoElement.play();
    } catch (error) {
      console.error("Error playing video:", error);
    }
  });

  const titleElement = document.getElementById("video-title");
  const descElement = document.getElementById("video-description");
  const readMoreTitleBtn = document.getElementById("read-more-title");
  const readMoreDescBtn = document.getElementById("read-more-desc");

  if (!titleElement || !descElement || !readMoreTitleBtn || !readMoreDescBtn) {
    console.error(
      "Video title, description, or read more button element not found."
    );
    return;
  }

  // Ensure text wrapping works without horizontal scroll
  titleElement.style.overflowWrap = "break-word";
  descElement.style.overflowWrap = "break-word";

  // Store full text globally for toggling
  window.fullTitle = title;
  window.fullDescription = description;

  // JavaScript to toggle text
  function toggleText(element, button, fullText, limit) {
    if (element.dataset.expanded === "true") {
      element.textContent = fullText.substring(0, limit) + "...";
      button.textContent = "Read More";
      element.dataset.expanded = "false";
    } else {
      element.textContent = fullText;
      button.textContent = "Read Less";
      element.dataset.expanded = "true";
    }
  }

  // Check if title is too long
  if (title.length > 50) {
    titleElement.textContent = title.substring(0, 50) + "...";
    readMoreTitleBtn.style.display = "inline"; // Show Read More button for title
    readMoreTitleBtn.addEventListener("click", function () {
      toggleText(titleElement, readMoreTitleBtn, window.fullTitle, 50);
    });
  } else {
    titleElement.textContent = title;
    readMoreTitleBtn.style.display = "none"; // Hide Read More button for title
  }

  // Check if description is too long
  if (description.length > 150) {
    descElement.textContent = description.substring(0, 150) + "...";
    readMoreDescBtn.style.display = "inline"; // Show Read More button for description
    readMoreDescBtn.addEventListener("click", function () {
      toggleText(descElement, readMoreDescBtn, window.fullDescription, 150);
    });
  } else {
    descElement.textContent = description;
    readMoreDescBtn.style.display = "none"; // Hide Read More button for description
  }
});