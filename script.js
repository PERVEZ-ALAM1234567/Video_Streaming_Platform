document.addEventListener("DOMContentLoaded", function () {
  fetchVideos();

  // Add event listener to search bar
  document.querySelector(".search-bar").addEventListener("input", function () {
    searchVideos(this.value.trim().toLowerCase());
  });

  // Add event listener to all filter buttons
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", function () {
      filterVideos(button.textContent.trim().toLowerCase());
    });
  });
});

let allVideos = []; // Store all videos globally

function fetchVideos() {
  fetch("fetch_videos.php")
    .then((response) => response.json())
    .then((data) => {
      allVideos = data; // Store videos globally
      displayVideos(allVideos); // Show all videos initially
    })
    .catch((error) => console.error("Error fetching videos:", error));
}

// Function to display videos dynamically
function displayVideos(videos) {
  const videoList = document.getElementById("video-list");
  videoList.innerHTML = ""; // Clear previous content

  videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.classList.add("video-item");
    videoItem.setAttribute("data-category", video.category.toLowerCase()); // Set category for filtering

    videoItem.innerHTML = `
      <img src="${video.thumbnail_url}" alt="${video.title}" class="video-thumbnail"
        onclick="playVideo('${video.video_url}', '${video.title}', \`${video.description.replace(/'/g, "\\'")}\`)">
      <h3 class="video-title">${video.title}</h3>
    `;

    videoList.prepend(videoItem); // New videos appear first
  });
}

// Function to filter videos based on search
function searchVideos(query) {
  if (query === "") {
    displayVideos(allVideos); // Show all videos if search is empty
    return;
  }

  const filteredVideos = allVideos.filter((video) =>
    video.title.toLowerCase().includes(query)
  );

  displayVideos(filteredVideos); // Show filtered videos
}

// Function to filter videos based on category
function filterVideos(category) {
  if (category === "all") {
    displayVideos(allVideos);
    return;
  }

  const filteredVideos = allVideos.filter((video) => 
    video.category.toLowerCase() === category
  );

  displayVideos(filteredVideos);

  // Highlight active button
  document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`.filter-btn:nth-child(${getCategoryIndex(category)})`).classList.add("active");
}

// Function to get index of category for active state
function getCategoryIndex(category) {
  const categories = ["all", "trending", "music", "programming", "coding", "gaming", "news", "sports", "movies", "tech", "education", "travel", "fashion", "business", "finance", "health", "science", "lifestyle", "food", "automobile", "photography", "history", "art", "books", "nature", "spirituality", "motivation", "fitness", "pets", "politics", "comedy", "animation"];
  return categories.indexOf(category) + 1;
}

// --- VIDEO PLAYER FUNCTION -----------------------------------------
function playVideo(videoUrl, title, description) {
  const encodedUrl = encodeURIComponent(videoUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  window.location.href = `pages/video_player.html?video=${encodedUrl}&title=${encodedTitle}&description=${encodedDesc}`;
}

//---  TOOGLE THEME SWITCHER---------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const header = document.querySelector(".header");
  const sidebar = document.querySelector(".sidebar");
  const filterBar = document.querySelector(".filter-bar");
  const content = document.querySelector(".content");
  const modeIcon = document.getElementById("toggleMode");

  // ✅ Check Local Storage for Mode
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";

  if (isDarkMode) {
    enableDarkMode(); // Agar localStorage me night mode hai toh apply karein
  } else {
    disableDarkMode(); // Warna by default light mode rakhein
  }

  // ✅ Toggle Mode on Click
  modeIcon.addEventListener("click", () => {
    if (body.classList.contains("light-mode")) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  function enableDarkMode() {
    body.classList.remove("light-mode");
    header.classList.remove("light-mode");
    sidebar.classList.remove("light-mode");
    filterBar.classList.remove("light-mode");
    content.classList.remove("light-mode");
    modeIcon.classList.replace("fa-moon", "fa-sun");

    localStorage.setItem("darkMode", "enabled"); // ✅ Save state in Local Storage
  }

  function disableDarkMode() {
    body.classList.add("light-mode");
    header.classList.add("light-mode");
    sidebar.classList.add("light-mode");
    filterBar.classList.add("light-mode");
    content.classList.add("light-mode");
    modeIcon.classList.replace("fa-sun", "fa-moon");

    localStorage.setItem("darkMode", "disabled"); // ✅ Save state in Local Storage
  }
});
// --- SIDEBAR TOGGLE FUNCTION --------------------------------------
document.getElementById("toggleSidebar").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("collapsed");
  document.querySelector(".filter-bar").classList.toggle("sidebar-collapsed");
  document.querySelector(".content").classList.toggle("sidebar-collapsed");
});

// --- FOOTER DYNAMIC YEAR ------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();
