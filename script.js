let intervalId;

// Initialize modal state
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("relationshipStartDate")) {
    document.getElementById("inputForm").style.display = "none";
    document.getElementById("resetButton").style.display = "block";
    document.querySelector(".heart-container").style.display = "flex";
    intervalId = setInterval(updateCounter, 1000);
  }
  updateCounter();
});

function saveDateTime() {
  const dateInput = document.getElementById("startDate").value;
  const timeInput = document.getElementById("startTime").value || "00:00";
  const errorMessage = document.getElementById("errorMessage");

  if (!dateInput) {
    errorMessage.innerHTML =
      '<img src="./assets/love.png" alt="love" /> please enter a date';
    errorMessage.classList.add("show");
    return;
  }

  errorMessage.classList.remove("show");
  const startDateTime = `${dateInput}T${timeInput}:00+05:30`;
  localStorage.setItem("relationshipStartDate", startDateTime);

  document.getElementById("inputForm").style.display = "none";
  document.getElementById("resetButton").style.display = "block";
  document.querySelector(".heart-container").style.display = "flex";

  if (intervalId) clearInterval(intervalId);
  updateCounter();
  intervalId = setInterval(updateCounter, 1000);
}

function resetDateTime() {
  localStorage.removeItem("relationshipStartDate");
  location.reload();
}

function calculateISTDuration(startDate) {
  const now = new Date();

  // Convert to IST (UTC+5:30)
  const options = { timeZone: "Asia/Kolkata" };
  const istNow = new Date(now.toLocaleString("en-US", options));
  const istStart = new Date(startDate.toLocaleString("en-US", options));

  let years = istNow.getFullYear() - istStart.getFullYear();
  let months = istNow.getMonth() - istStart.getMonth();
  let days = istNow.getDate() - istStart.getDate();
  let hours = istNow.getHours() - istStart.getHours();
  let minutes = istNow.getMinutes() - istStart.getMinutes();
  let seconds = istNow.getSeconds() - istStart.getSeconds();

  // Adjust negative values
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
    const prevMonth = new Date(istNow.getFullYear(), istNow.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  // Calculate totals
  const totalMonths = years * 12 + months;
  const diffMs = istNow - istStart;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const totalSeconds = Math.floor(diffMs / 1000);

  return {
    years,
    months: totalMonths,
    days: totalDays,
    hours: totalHours,
    minutes: totalMinutes,
    seconds: totalSeconds,
  };
}

function updateCounter() {
  const storedDate = localStorage.getItem("relationshipStartDate");
  if (!storedDate) {
    document.getElementById("inputForm").style.display = "block";
    document.querySelector(".heart-container").style.display = "none";
    return;
  }

  const startDate = new Date(storedDate);
  const duration = calculateISTDuration(startDate);

  if (duration.seconds < 0) {
    document.getElementById("counter").innerHTML = "Invalid date (future date)";
    return;
  }

  // Calculate total years
  const totalYears = Math.floor(duration.months / 12);

  // Format numbers in Indian numbering system
  const formatter = new Intl.NumberFormat("en-IN");

  document.getElementById("counter").innerHTML = `
    <p>${formatter.format(totalYears)} Years, ${formatter.format(
    duration.months
  )} Months</p>
    <p>${formatter.format(duration.days)} Days, ${formatter.format(
    duration.hours
  )} Hours</p>
    <p>${formatter.format(duration.minutes)} Minutes</p>
    <p>${formatter.format(duration.seconds)} Seconds</p>
    <p>&#127799;</p>
  `;
}

// Array of random love quotes for couples
const loveQuotes = [
  "With you, every moment feels like a fairytale I never want to end.",
  "You're not just my love, you're my calm in the chaos, my peace in the storm.",
  "Falling in love with you was the bestest thing I’ve ever done.",
  "Your love is the melody that plays in my heart on repeat.",
  "I still get butterflies, even just thinking about you.",
  "You turned my ordinary life into a beautiful love story.",
  "Every day with you is my new favorite day.",
  "If I had a flower for every time I thought of you, I could walk through my garden forever.",
  "Your love is my favorite chapter in the book of life.",
  "In your eyes, I found my home. In your heart, I found my love. In your soul, I found my purpose.",
  "Every love story is beautiful, but ours is my favorite.",
  "I have loved you for a thousand years, and I'll love you for a thousand more.",
  "You are my today and all of my tomorrows.",
  "I choose you. And I'll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you.",
  "You are my favorite hello and my hardest goodbye.",
  "I love you more than coffee, and that's saying a lot.",
  "You are the missing piece I've been searching for all my life.",
  "My heart beats for you, now and forever.",
  "You are the reason I believe in love.",
  "Forever is a long time, but I wouldn't mind spending it by your side.",
  "You are my favorite notification.",
  "I love you to the moon and back, and then some.",
  "You are my favorite place to go when my mind searches for peace.",
  "I love you more than words can express, more than hearts can hold, more than stars in the sky.",
  "You are the first thing I think about when I wake up and the last thing I think about before I fall asleep.",
  "I love you more than pizza, and that's saying something.",
  "You are my favorite adventure.",
  "I love you more than all the stars in the sky and all the fish in the sea.",
  "You are my favorite hello and my hardest goodbye.",
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * loveQuotes.length);
  return loveQuotes[randomIndex];
}

function shareCounter() {
  const storedDate = localStorage.getItem("relationshipStartDate");
  if (!storedDate) return;

  const startDate = new Date(storedDate);
  const duration = calculateISTDuration(startDate);
  const customQuote = document.getElementById("customQuote").value.trim();
  const randomQuote = getRandomQuote();

  // Calculate total years
  const totalYears = Math.floor(duration.months / 12);

  // Format numbers in Indian numbering system
  const formatter = new Intl.NumberFormat("en-IN");

  // Create a temporary container for the image
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.background =
    "linear-gradient(135deg, #ff9aa2, #ffb7b2, #ffdac1, #e2f0cb, #a2e4ff, #c9afff, #ffb7b2, #ff9aa2)";
  container.style.padding = "40px";
  container.style.borderRadius = "20px";
  container.style.width = "600px";
  container.style.height = "600px";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.textAlign = "center";
  container.style.fontFamily = '"Comic Neue", cursive';

  // Create a heart container with relative positioning
  const heartContainer = document.createElement("div");
  heartContainer.style.position = "relative";
  heartContainer.style.width = "400px";
  heartContainer.style.height = "400px";
  heartContainer.style.marginBottom = "20px";

  // Add the heart image
  const heartImg = document.createElement("img");
  heartImg.src = "./assets/heart-of-love.png";
  heartImg.style.width = "100%";
  heartImg.style.height = "100%";
  heartImg.style.objectFit = "contain";
  heartContainer.appendChild(heartImg);

  // Add the counter text inside the heart
  const counterText = document.createElement("div");
  counterText.style.position = "absolute";
  counterText.style.top = "50%";
  counterText.style.left = "50%";
  counterText.style.transform = "translate(-50%, -50%)";
  counterText.style.fontFamily = '"Comic Neue", "Comic Sans MS", "cursive"';
  counterText.style.fontSize = "18px";
  counterText.style.color = "rgb(30, 249, 227)";
  counterText.style.textAlign = "center";
  counterText.style.textShadow = "0px 0px 6px black";
  counterText.style.width = "80%";
  counterText.style.maxWidth = "300px";
  counterText.style.padding = "0 10px";
  counterText.style.boxSizing = "border-box";
  counterText.style.fontWeight = "900";
  counterText.innerHTML = `
    <div style="margin-bottom: 10px">${formatter.format(
      totalYears
    )} Years, ${formatter.format(duration.months)} Months</div>
    <div style="margin-bottom: 10px">${formatter.format(
      duration.days
    )} Days, ${formatter.format(duration.hours)} Hours</div>
    <div style="margin-bottom: 10px">${formatter.format(
      duration.minutes
    )} Minutes, </div>
    <div style="margin-bottom: 10px">${formatter.format(
      duration.seconds
    )} Seconds, </div>
    <p>&#127799;</p>
  `;
  heartContainer.appendChild(counterText);

  // Add the heart container to the main container
  container.appendChild(heartContainer);

  // Add the quote (either custom or random)
  const quoteText = document.createElement("div");
  quoteText.style.color = "#333";
  quoteText.style.fontSize = "28px";
  quoteText.style.fontFamily = '"Dancing Script", cursive';
  quoteText.style.fontWeight = "700";
  quoteText.style.marginTop = "20px";
  quoteText.style.padding = "20px";
  quoteText.style.borderTop = "2px dashed #ff4c6a";
  quoteText.style.borderBottom = "2px dashed #ff4c6a";
  quoteText.style.lineHeight = "1.4";
  quoteText.style.maxWidth = "90%";
  quoteText.textContent = `"${customQuote || randomQuote}"`;
  container.appendChild(quoteText);

  // Add the "SpidyCoder" text with the link
  const spidyCoderText = document.createElement("div");
  spidyCoderText.style.marginTop = "20px";
  spidyCoderText.style.fontSize = "16px";
  spidyCoderText.style.color = "#555";
  spidyCoderText.style.fontFamily = '"Dancing Script", cursive';
  spidyCoderText.innerHTML = `
  <p>Created by <strong>SpidyCoder</strong></p>
  <a href="https://helloearlybird.netlify.app" target="_blank" style="color: #007BFF; text-decoration: none;">https://helloearlybird.netlify.app/</a>
`;
  container.appendChild(spidyCoderText);

  // Add the container to the document temporarily
  document.body.appendChild(container);

  // Create the image
  html2canvas(container, {
    backgroundColor: null,
    scale: 2, // Higher quality
    logging: false,
  }).then((canvas) => {
    // Remove the temporary container
    document.body.removeChild(container);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      // Create a File object
      const file = new File([blob], "EarlyBird by-SpidyCoder Iftikhar.png", { type: "image/png" });

      // Share the image
      if (navigator.share) {
        navigator
          .share({
            title: "Our Love Journey",
            text: "Check out our love counter! ❤️",
            files: [file],
          })
          .catch((error) => {
            console.log("Error sharing:", error);
            fallbackShare(canvas);
          });
      } else {
        fallbackShare(canvas);
      }
    }, "image/png");
  });
}

function fallbackShare(canvas) {
  // Create a download link
  const link = document.createElement("a");
  link.download = "EarlyBird by-SpidyCoder Iftikhar.png";
  link.href = canvas.toDataURL("image/png");

  // Show a notification
  const notification = document.createElement("div");
  notification.className = "share-notification";
  notification.textContent =
    "Click to download your love counter image with a lovely quote!";
  notification.style.cursor = "pointer";
  notification.onclick = () => link.click();
  document.body.appendChild(notification);

  // Remove the notification after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

//Instagram Link
function openInstagram(username) {
  const appLink = `instagram://user?username=${username}`;
  const webLink = `https://instagram.com/${username}`;

  // Try to open Instagram app
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = appLink;
  document.body.appendChild(iframe);

  // Open Instagram in the browser after a short delay if the app is not found
  setTimeout(() => {
    window.open(webLink, "_blank"); 
  }, 1000); // Wait 1 seconds before opening the link
}
