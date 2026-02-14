// VIOLATION: Global variables polluting the namespace
const list = document.getElementById("guest-list");

// Load data on startup
window.onload = function () {
  const savedData = localStorage.getItem("guestbook_entries");
  if (savedData) {
    const entries = JSON.parse(savedData);
    entries.forEach((entry) => renderEntry(entry.name, entry.learn));
  }
};

// VIOLATION: Single function doing too many things (Validation, Saving, UI Update)
function addEntry() {
  const name = document.getElementById("nameInput").value;
  const learn = document.getElementById("learnInput").value;

  if (name === "" || learn === "") {
    alert("Please fill in both fields!");
    return;
  }

  // 1. UI Logic
  renderEntry(name, learn);

  // 2. Data Persistence Logic
  saveToStorage(name, learn);

  // 3. Cleanup Logic
  document.getElementById("nameInput").value = "";
  document.getElementById("learnInput").value = "";
}

function renderEntry(name, learn) {
  const li = document.createElement("li");
  li.className = "guest-entry";
  li.innerHTML = `<div class="guest-info"><strong>${name}</strong><span>Learned: ${learn}</span></div>`;
  list.appendChild(li);
}

function saveToStorage(name, learn) {
  let entries = [];
  const savedData = localStorage.getItem("guestbook_entries");
  if (savedData) {
    entries = JSON.parse(savedData);
  }
  entries.push({ name: name, learn: learn });
  localStorage.setItem("guestbook_entries", JSON.stringify(entries));
}
