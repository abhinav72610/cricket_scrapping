const matchForm = document.getElementById("matchForm");
const dateInput = document.getElementById("dateInput");
const matchesList = document.getElementById("matchesList");
const matchDetails = document.getElementById("matchDetails");
const venue = document.getElementById("venue");
const result = document.getElementById("result");
const bestPlayer = document.getElementById("bestPlayer");
const inningsSelect = document.getElementById("inningsSelect");
const bestBatterBtn = document.getElementById("bestBatter");
const bestBowlerBtn = document.getElementById("bestBowler");

let selectedMatchId = null;

matchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const date = dateInput.value;
    const response = await fetch(`http://localhost:4000/api/matches?date=${date}`);
    const matches = await response.json();

    // Clear previous matches and details
    matchesList.innerHTML = "";
    matchDetails.style.display = "none";

    if (matches.length === 0) {
        matchesList.innerHTML = "<p>No matches found for the selected date.</p>";
        return;
    }

    // Display match titles
    matches.forEach((match, index) => {
        const button = document.createElement("button");
        button.textContent = match.match_title;
        button.onclick = () => selectMatch(match);
        matchesList.appendChild(button);
    });
});

function selectMatch(match) {
    selectedMatchId = match.id;
    venue.textContent = `Venue: ${match.venue}`;
    result.textContent = `Result: ${match.result}`;
    matchDetails.style.display = "block";
    bestPlayer.textContent = ""; // Reset best player info
}

bestBatterBtn.addEventListener("click", async () => {
    const innings = inningsSelect.value;
    const response = await fetch(`http://localhost:4000/api/match/${selectedMatchId}?date=${dateInput.value}&innings=${innings}&role=batter`);
    const data = await response.json();
    bestPlayer.textContent = `Best Batter: ${data.bestPlayer.name}`;
});

bestBowlerBtn.addEventListener("click", async () => {
    const innings = inningsSelect.value;
    const response = await fetch(`http://localhost:4000/api/match/${selectedMatchId}?date=${dateInput.value}&innings=${innings}&role=bowler`);
    const data = await response.json();
    bestPlayer.textContent = `Best Bowler: ${data.bestPlayer.name}`;
});
