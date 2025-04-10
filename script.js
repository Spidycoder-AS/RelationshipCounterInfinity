let intervalId;

// Modal handling functions
function openBrokenHeartPopup() {
  document.getElementById("brokenHeartModal").style.display = "flex";
}

function closeBrokenHeartPopup() {
  document.getElementById("brokenHeartModal").style.display = "none";
}

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
  let timeInput = document.getElementById("startTime").value || "00:00";

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
