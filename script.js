function updateCounter() {
  const startDate = new Date("2021-10-15T00:00:00+05:30"); // October 15, 2021 in IST
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  document.getElementById("counter").innerHTML = `
        <p>${years} Years, ${months} Months</p>
        <p>${days} Days, ${hours} Hours</p>
        <p>${minutes} Minutes, ${seconds} Seconds</p>
    `;
}

// Update counter every second
setInterval(updateCounter, 1000);
updateCounter();

document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = document.getElementById("video-player");
  const prevButton = document.getElementById("prev-video");
  const nextButton = document.getElementById("next-video");

  const videos = [
    "https://www.youtube.com/embed/2HTKMy4v_YQ?si=wZ-S2-IDiJaE6y6B",
    "https://www.youtube.com/embed/M53gBWkk2WM?si=ZZkOkdzq3O0t4Y3M",
    "https://www.youtube.com/embed/X5qrZ_ZYvl4?si=F7QqmmPF2czxau6F",
  ];

  let currentVideoIndex = 0;

  function loadVideo(index) {
    videoPlayer.src = videos[index];
  }

  prevButton.addEventListener("click", function () {
    currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
    loadVideo(currentVideoIndex);
  });

  nextButton.addEventListener("click", function () {
    currentVideoIndex = (currentVideoIndex + 1) % videos.length;
    loadVideo(currentVideoIndex);
  });

  // Load the first video initially
  loadVideo(currentVideoIndex);
});
