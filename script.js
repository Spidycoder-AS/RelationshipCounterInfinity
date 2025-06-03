let intervalId;

// Initialize modal state
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("relationshipStartDate")) {
    document.getElementById("inputForm").style.display = "none";
    document.getElementById("resetButton").style.display = "block";
    document.querySelector(".heart-container").style.display = "flex";
    
    // Display saved names
    const yourName = localStorage.getItem("yourName");
    const partnerName = localStorage.getItem("partnerName");
    if (yourName && partnerName) {
      document.getElementById("displayYourName").textContent = yourName;
      document.getElementById("displayPartnerName").textContent = partnerName;
    }
    
    intervalId = setInterval(updateCounter, 1000);
  }
  updateCounter();
});

function saveDateTime() {
  const dateInput = document.getElementById("startDate").value;
  const timeInput = document.getElementById("startTime").value || "00:00";
  const yourName = document.getElementById("yourName").value.trim();
  const partnerName = document.getElementById("partnerName").value.trim();
  const errorMessage = document.getElementById("errorMessage");

  if (!dateInput) {
    errorMessage.innerHTML =
      '<img src="./assets/love.png" alt="love" style="width:24px;height:24px;vertical-align:middle;margin-right:6px;" /> please enter a date';
    errorMessage.classList.add("show");
    return;
  }

  if (!yourName || !partnerName) {
    errorMessage.innerHTML =
      '<img src="./assets/love.png" alt="love" style="width:24px;height:24px;vertical-align:middle;margin-right:6px;" /> please enter both names';
    errorMessage.classList.add("show");
    return;
  }

  errorMessage.classList.remove("show");
  const startDateTime = `${dateInput}T${timeInput}:00+05:30`;
  localStorage.setItem("relationshipStartDate", startDateTime);
  localStorage.setItem("yourName", yourName);
  localStorage.setItem("partnerName", partnerName);

  document.getElementById("inputForm").style.display = "none";
  document.getElementById("resetButton").style.display = "block";
  document.querySelector(".heart-container").style.display = "flex";

  // Update displayed names
  document.getElementById("displayYourName").textContent = yourName;
  document.getElementById("displayPartnerName").textContent = partnerName;

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
  "Falling in love with you was the bestest thing I've ever done.",
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

function createFullShareContainer() {
  const storedDate = localStorage.getItem("relationshipStartDate");
  if (!storedDate) return null;

  const startDate = new Date(storedDate);
  const duration = calculateISTDuration(startDate);
  const customQuote = document.getElementById("customQuote").value.trim();
  const randomQuote = getRandomQuote();
  const yourName = localStorage.getItem("yourName") || "";
  const partnerName = localStorage.getItem("partnerName") || "";

  // Calculate total years
  const totalYears = Math.floor(duration.months / 12);

  // Format numbers in Indian numbering system
  const formatter = new Intl.NumberFormat("en-IN");

  // Smaller, more centered preview
  const isMobile = window.innerWidth <= 768;
  const containerWidth = isMobile ? 300 : 340;
  const containerHeight = isMobile ? 400 : 450; // Increased height
  const heartWidth = isMobile ? 180 : 240;
  const fontSize = isMobile ? "8px" : "14px";
  const quoteFontSize = isMobile ? "16px" : "18px";

  // Create a temporary container for the image
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.background =
    "linear-gradient(135deg, #ff9aa2, #ffb7b2, #ffdac1, #e2f0cb, #a2e4ff, #c9afff, #ffb7b2, #ff9aa2)";
  container.style.padding = isMobile ? "12px" : "18px";
  container.style.borderRadius = "20px";
  container.style.width = `${containerWidth}px`;
  container.style.height = `${containerHeight}px`; // Using the new height
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.justifyContent = "center";
  container.style.textAlign = "center";
  container.style.fontFamily = '"Comic Neue", cursive';

  // Create a heart container with relative positioning
  const heartContainer = document.createElement("div");
  heartContainer.style.position = "relative";
  heartContainer.style.width = `${heartWidth}px`;
  heartContainer.style.height = `${heartWidth}px`;
  heartContainer.style.marginBottom = isMobile ? "8px" : "12px";

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
  counterText.style.top = "45%";
  counterText.style.left = "50%";
  counterText.style.transform = "translate(-50%, -50%)";
  counterText.style.fontFamily = '"Comic Neue", "Comic Sans MS", "cursive"';
  counterText.style.fontSize = isMobile ? "8px" : "14px";
  counterText.style.background = "transparent";
  counterText.style.webkitBackgroundClip = "text";
  counterText.style.webkitTextFillColor = "#222";
  counterText.style.textAlign = "center";
  counterText.style.textShadow = "0 2px 8px rgba(0,0,0,0.10)";
  counterText.style.width = "80%";
  counterText.style.maxWidth = "180px";
  counterText.style.padding = "0 6px";
  counterText.style.boxSizing = "border-box";
  counterText.style.fontWeight = "900";
  counterText.innerHTML = `
        <div style="margin-bottom: 6px">${formatter.format(
          totalYears
        )} Years, ${formatter.format(duration.months)} Months</div>
        <div style="margin-bottom: 6px">${formatter.format(
          duration.days
        )} Days, ${formatter.format(duration.hours)} Hours</div>
        <div style="margin-bottom: 6px">${formatter.format(
          duration.minutes
        )} Minutes</div>
        <div style="margin-bottom: 6px">${formatter.format(
          duration.seconds
        )} Seconds</div>
        <p>&#127799;</p>
    `;
  heartContainer.appendChild(counterText);

  // Add the heart container to the main container
  container.appendChild(heartContainer);

  // Add names display
  const namesDisplay = document.createElement("div");
  namesDisplay.style.display = "flex";
  namesDisplay.style.alignItems = "center";
  namesDisplay.style.justifyContent = "center";
  namesDisplay.style.gap = "10px";
  namesDisplay.style.padding = "8px 15px";
  namesDisplay.innerHTML = `
    <span style="font-family: 'Dancing Script', cursive; font-size: ${isMobile ? "16px" : "20px"}; font-weight: 700; color: #333;">${yourName}</span>
    <span style="font-size: ${isMobile ? "18px" : "24px"}; color: #ff4c6a;">❤️</span>
    <span style="font-family: 'Dancing Script', cursive; font-size: ${isMobile ? "16px" : "20px"}; font-weight: 700; color: #333;">${partnerName}</span>
  `;
  container.appendChild(namesDisplay);

  // Add the quote (either custom or random)
  const quoteText = document.createElement("div");
  quoteText.style.color = "#333";
  quoteText.style.fontSize = quoteFontSize;
  quoteText.style.fontFamily = '"Dancing Script", cursive';
  quoteText.style.fontWeight = "700";
  quoteText.style.marginTop = isMobile ? "8px" : "12px";
  quoteText.style.padding = isMobile ? "8px" : "12px";
  quoteText.style.borderTop = "2px dashed #ff4c6a";
  quoteText.style.borderBottom = "2px dashed #ff4c6a";
  quoteText.style.lineHeight = "1.4";
  quoteText.style.maxWidth = "90%";
  quoteText.textContent = `"${customQuote || randomQuote}"`;
  container.appendChild(quoteText);

  // Add the "SpidyCoder" text with the link
  const spidyCoderText = document.createElement("div");
  spidyCoderText.style.marginTop = isMobile ? "8px" : "12px";
  spidyCoderText.style.fontSize = isMobile ? "8px" : "15px";
  spidyCoderText.style.color = "#555";
  spidyCoderText.style.fontFamily = '"Dancing Script", cursive';
  spidyCoderText.innerHTML = `
        <p>Created by <strong>SpidyCoder</strong></p>
        <a href="https://helloearlybird.netlify.app" target="_blank" style="color: #007BFF; text-decoration: none;">https://helloearlybird.netlify.app/</a>
    `;
  container.appendChild(spidyCoderText);

  return container;
}

function shareCounter() {
  const container = createFullShareContainer();
  if (!container) return;

  // Append container off-screen for html2canvas to render it
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  // Wait for all images and fonts to load
  const images = container.querySelectorAll("img");
  let loaded = 0;

  function waitForFontsAndDelay() {
    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready.then(
        () => new Promise((res) => setTimeout(res, 100))
      );
    }
    return new Promise((res) => setTimeout(res, 100));
  }

  function startShare() {
    html2canvas(container, {
      backgroundColor: null,
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
    }).then((canvas) => {
      document.body.removeChild(container);
      canvas.toBlob((blob) => {
        const file = new File([blob], "EarlyBird_by-SpidyCoder_Iftikhar.png", {
          type: "image/png",
        });

        if (
          navigator.share &&
          navigator.canShare &&
          navigator.canShare({ files: [file] })
        ) {
          navigator
            .share({
              title: "Our Love Journey",
              text: "Check out our love counter! ❤️ \nCreated by SpidyCoder",
              url: "\nhttps://helloearlybird.netlify.app",
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

  if (images.length === 0) {
    waitForFontsAndDelay().then(startShare);
  } else {
    images.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === images.length) waitForFontsAndDelay().then(startShare);
      } else {
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded === images.length) waitForFontsAndDelay().then(startShare);
        };
      }
    });
  }
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

function previewImage() {
  const container = createFullShareContainer();
  if (!container) {
    alert("No relationship start date set. Please start counting first!");
    return;
  }

  // Off-screen but visible for html2canvas
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  // Wait for all images in the container to load
  const images = container.querySelectorAll("img");
  let loaded = 0;
  if (images.length === 0) {
    waitForFontsAndDelay().then(captureAndShow);
  } else {
    images.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === images.length)
          waitForFontsAndDelay().then(captureAndShow);
      } else {
        img.onload = () => {
          loaded++;
          if (loaded === images.length)
            waitForFontsAndDelay().then(captureAndShow);
        };
        img.onerror = () => {
          loaded++;
          if (loaded === images.length)
            waitForFontsAndDelay().then(captureAndShow);
        };
      }
    });
  }

  // Wait for web fonts and a small delay
  function waitForFontsAndDelay() {
    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready.then(
        () => new Promise((res) => setTimeout(res, 100))
      );
    }
    return new Promise((res) => setTimeout(res, 100));
  }

  function captureAndShow() {
    html2canvas(container, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
    })
      .then((canvas) => {
        document.body.removeChild(container);

        const modal = document.getElementById("previewModal");
        const previewContainer = document.getElementById("previewContainer");
        if (!modal || !previewContainer) {
          alert("Preview modal or container not found in HTML!");
          return;
        }
        previewContainer.innerHTML = "";

        // Convert canvas to image and show in modal
        const img = document.createElement("img");
        img.src = canvas.toDataURL("image/png");
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.width = "auto";
        img.style.height = "auto";
        img.style.objectFit = "contain";
        img.style.borderRadius = "16px";
        previewContainer.appendChild(img);

        // Remove any existing close button
        const oldCloseBtn = previewContainer.querySelector(".close-modal");
        if (oldCloseBtn) oldCloseBtn.remove();
        // Create and add the close button inside the previewContainer
        const closeBtn = document.createElement("span");
        closeBtn.className = "close-modal";
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener("click", closeModal);
        previewContainer.appendChild(closeBtn);

        // --- Add Download and Share buttons below the image ---
        // Remove any existing button container
        const oldBtnContainer = previewContainer.querySelector(
          ".preview-btn-container"
        );
        if (oldBtnContainer) oldBtnContainer.remove();
        const btnContainer = document.createElement("div");
        btnContainer.className = "preview-btn-container";
        btnContainer.style.display = "flex";
        btnContainer.style.justifyContent = "center";
        btnContainer.style.gap = "16px";
        btnContainer.style.margin = "24px 0 0 0";

        // Download Button with SVG
        const downloadBtn = document.createElement("button");
        downloadBtn.className = "preview-download-btn";
        downloadBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" style="vertical-align:middle;margin-right:8px;">
    <g fill="#fff">
      <polygon points="24,37.1 13,24 35,24"/>
      <rect x="20" y="4" width="8" height="4"/>
      <rect x="20" y="10" width="8" height="4"/>
      <rect x="20" y="16" width="8" height="11"/>
      <rect x="6" y="40" width="36" height="4"/>
    </g>
  </svg>
  Download
`;
        downloadBtn.onclick = function () {
          // Convert dataURL to Blob
          const arr = img.src.split(",");
          const mime = arr[0].match(/:(.*?);/)[1];
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Love-Counter.png";
          document.body.appendChild(a);
          a.style.display = "none";
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
        };
        btnContainer.appendChild(downloadBtn);

        // Share Button with SVG
        const shareBtn = document.createElement("button");
        shareBtn.className = "preview-share-btn";
        shareBtn.innerHTML = `Share <svg fill="#fff" width="18" height="18" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:8px;" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.58900253,18.0753965 C6.5573092,17.8852365 6.54138127,17.692783 6.54138127,17.5 C6.54138127,15.5670034 8.10838464,14 10.0413813,14 L12.5,14 C12.7761424,14 13,14.2238576 13,14.5 L13,17.7267988 C13,17.8027316 13.0270017,17.8761901 13.0761794,17.9340463 C13.190639,18.0687047 13.3925891,18.085079 13.5272475,17.9706194 L20.5626572,11.9905211 C20.6161112,11.9450852 20.6657995,11.8953969 20.7112354,11.8419429 C21.1762277,11.2948932 21.1097069,10.4744711 20.5626572,10.0094789 L13.5272475,4.02938061 C13.4693913,3.98020285 13.3959328,3.95320119 13.32,3.95320119 C13.1432689,3.95320119 13,4.09647007 13,4.27320119 L13,7.5 C13,7.77614237 12.7761424,8 12.5,8 L9.5,8 C5.91014913,8 3,10.9101491 3,14.5 C3,17.3494045 4.26637093,19.0973664 6.88288761,19.8387069 L6.58900253,18.0753965 Z M10.0413813,15 C8.66066939,15 7.54138127,16.1192881 7.54138127,17.5 C7.54138127,17.6377022 7.55275836,17.7751689 7.57539646,17.9109975 L7.99319696,20.4178005 C8.0506764,20.7626772 7.74549866,21.0585465 7.40256734,20.990415 C3.83673227,20.2819767 2,18.0778979 2,14.5 C2,10.3578644 5.35786438,7 9.5,7 L12,7 L12,4.27320119 C12,3.54418532 12.5909841,2.95320119 13.32,2.95320119 C13.6332228,2.95320119 13.9362392,3.06458305 14.1748959,3.26744129 L21.2103057,9.24753957 C22.1781628,10.0702182 22.2958533,11.5217342 21.4731747,12.4895914 C21.3927882,12.5841638 21.3048781,12.6720739 21.2103057,12.7524604 L14.1748959,18.7325587 C13.6194301,19.2047047 12.7863861,19.1371606 12.3142401,18.5816947 C12.1113819,18.343038 12,18.0400216 12,17.7267988 L12,15 L10.0413813,15 Z"/>
  </svg>
`;
        shareBtn.onclick = function () {
          if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({
              files: [
                dataURLtoFile(img.src, "EarlyBird_by-SpidyCoder_Iftikhar.png"),
              ],
            })
          ) {
            navigator
              .share({
                files: [
                  dataURLtoFile(
                    img.src,
                    "EarlyBird_by-SpidyCoder_Iftikhar.png"
                  ),
                ],
                title: "Love Counter",
                text: "Check out our love counter! ❤️",
              })
              .catch(() => {});
          } else {
            // fallback: download
            const a = document.createElement("a");
            a.href = img.src;
            a.download = "EarlyBird_by-SpidyCoder_Iftikhar.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        };
        btnContainer.appendChild(shareBtn);

        previewContainer.appendChild(btnContainer);

        // Add info/tip about changing the quote
        const tip = document.createElement("div");
        tip.style.fontSize = "12px";
        tip.style.color = "black";
        tip.style.margin = "18px 0 0 0";
        tip.style.textAlign = "center";
        tip.style.fontFamily = '"Comic Neue", cursive';
        tip.innerHTML = `
  <span style="font-weight:600;">Want to change the Quote?</span><br>
  <span>Just close this preview and click the <b>Preview</b> button again!</span>
`;
        previewContainer.appendChild(tip);

        // Helper to convert dataURL to File
        function dataURLtoFile(dataurl, filename) {
          var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, { type: mime });
        }

        modal.classList.add("show");

        // Close modal and remove listeners
        function closeModal() {
          modal.classList.remove("show");
          modal.removeEventListener("mousedown", outsideClickListener);
          previewContainer.innerHTML = "";
        }

        // Only close if click is on modal background, not modal-content or children
        function outsideClickListener(event) {
          if (event.target === modal) {
            closeModal();
          }
        }

        modal.addEventListener("mousedown", outsideClickListener);
      })
      .catch((err) => {
        alert("Error generating preview: " + err);
        console.error(err);
      });
  }
}

function downloadImage() {
  const container = createFullShareContainer();
  if (!container) return;

  // Append container off-screen for html2canvas to render it
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.zIndex = "9999";
  document.body.appendChild(container);

  // Wait for images and fonts to load
  const images = container.querySelectorAll("img");
  let loaded = 0;
  function waitForFontsAndDelay() {
    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready.then(
        () => new Promise((res) => setTimeout(res, 100))
      );
    }
    return new Promise((res) => setTimeout(res, 100));
  }
  function startCapture() {
    html2canvas(container, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
    }).then((canvas) => {
      document.body.removeChild(container);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Love-Counter.png";
        document.body.appendChild(a);
        a.style.display = "none";
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 100);
      }, "image/png");
    });
  }
  if (images.length === 0) {
    waitForFontsAndDelay().then(startCapture);
  } else {
    images.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === images.length) waitForFontsAndDelay().then(startCapture);
      } else {
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded === images.length)
            waitForFontsAndDelay().then(startCapture);
        };
      }
    });
  }
}

window.previewImage = previewImage;
window.downloadImage = downloadImage;
