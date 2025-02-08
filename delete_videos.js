// Initialize variables
let selectedVideos = [];
let isDarkMode = false;
let searchTerm = ''; // Initialize searchTerm here
const videoList = document.getElementById('video-list');
const dropdownMenu = document.getElementById('dropdown-menu');
const toggleModeButton = document.getElementById('toggleMode'); // Ensure this points to the correct element
const sidebar = document.getElementById('sidebar');

// Function to fetch videos with search filtering
function fetchVideos() {
    fetch("fetch_videos.php")
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const videoList = document.getElementById("video-list");
            videoList.innerHTML = ""; // Clear previous content

            // Filter videos based on search term
            const filteredVideos = data.filter(video =>
                video.title.toLowerCase().includes(searchTerm)
            );

            // Display filtered videos
            filteredVideos.forEach((video) => {
                const videoItem = document.createElement("div");
                videoItem.classList.add("video-item");
                videoItem.setAttribute("data-id", video.id); // Add video ID as data attribute

                videoItem.innerHTML = `
                    <input type="checkbox" class="video-select" onclick="toggleSelection(${video.id})">
                    <img src="${video.thumbnail_url}" alt="${video.title}" class="video-thumbnail"
                         onclick="playVideo('${video.video_url}', '${video.title}', \`${video.description.replace(/'/g, "\\'")}\`)">
                    <h3>${video.title}</h3>
                `;
                videoList.appendChild(videoItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching videos:", error);
            alert("Failed to fetch videos. Please try again later.");
        });
}

// Function to toggle selection of video
function toggleSelection(videoId) {
    const index = selectedVideos.indexOf(videoId);

    if (index > -1) {
        // Remove from selected
        selectedVideos.splice(index, 1);
    } else {
        // Add to selected
        selectedVideos.push(videoId);
    }

    // Highlight selected video item
    const videoItem = document.querySelector(`[data-id='${videoId}']`);
    if (videoItem) {
        videoItem.classList.toggle("selected");
    }
}

// Function to delete selected videos
function deleteSelectedVideos() {
    if (selectedVideos.length === 0) {
        alert("Please select videos to delete.");
        return;
    }

    const videoIds = selectedVideos.join(","); // Convert selected videos to a comma-separated string

    fetch("delete_videos.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `ids=${videoIds}`, // Send video IDs to the server
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                alert(data.success);
                fetchVideos(); // Refresh the video list after deletion
            } else {
                alert("Failed to delete videos. Please try again later.");
            }
        })
        .catch((error) => {
            console.error("Error deleting videos:", error);
            alert("Failed to delete videos. Please try again later.");
        });
}

// Function to play video
function playVideo(videoUrl, title, description) {
    // You can redirect to a video player or handle video playback here
    alert(`Playing video: ${title}`);
}

// Function to toggle theme mode (Day/Night) with icons
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    toggleModeButton.classList.toggle('fa-sun', !isDarkMode);
    toggleModeButton.classList.toggle('fa-moon', isDarkMode);

    // Save the theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Function to load the theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-mode');
        toggleModeButton.classList.add('fa-moon');
        toggleModeButton.classList.remove('fa-sun');
    } else {
        isDarkMode = false;
        document.body.classList.remove('dark-mode');
        toggleModeButton.classList.add('fa-sun');
        toggleModeButton.classList.remove('fa-moon');
    }
}

// Function to toggle dropdown menu visibility
function toggleDropdown() {
    dropdownMenu.classList.toggle('show');
}

// Function to close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown-menu') && !event.target.closest('.three-dots')) {
        dropdownMenu.classList.remove('show');
    }
});

// Function to toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block'; // Show the sidebar
    } else {
        sidebar.style.display = 'none'; // Hide the sidebar
    }
}

// Event listener for search input
document.querySelector('.search-bar').addEventListener('input', function (event) {
    searchTerm = event.target.value.toLowerCase(); // Update searchTerm with user input
    fetchVideos(); // Fetch and filter videos again with the updated search term
});

// Event listener for the toggle button
document.getElementById('toggleSidebar').addEventListener('click', toggleSidebar);

// Event listener for the theme toggle button
toggleModeButton.addEventListener('click', toggleTheme);

// Initial render of videos and load theme from localStorage
fetchVideos();
loadTheme();

// --- FOOTER DYNAMIC YEAR ------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();