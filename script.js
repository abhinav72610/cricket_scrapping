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

let selectedMatchIndex = null; 

matchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const date = dateInput.value;
    const response = await fetch(`http://localhost:4000/api/matches?date=${date}`);
    const matches = await response.json();

    matchesList.innerHTML = "";
    matchDetails.style.display = "none";

    if (matches.length === 0) {
        matchesList.innerHTML = "<p>No matches found for the selected date.</p>";
        return;
    }

    matches.forEach((match, index) => {
        const button = document.createElement("button");
        button.textContent = match.match_title;
        button.onclick = () => selectMatch(index, match); 
        matchesList.appendChild(button);
    });
});

function selectMatch(index, match) {
    selectedMatchIndex = index; 
    result.textContent = `Result: ${match.result}`;
    matchDetails.style.display = "block";
    bestPlayer.textContent = "";  
}

bestBatterBtn.addEventListener("click", async () => {
    const innings = inningsSelect.value;
    console.log("Fetching Best Batter for innings: ", innings);  

    try {
        const url = `http://localhost:4000/api/match/${selectedMatchIndex}?date=${dateInput.value}&innings=${innings}&role=batter`;
        console.log("Best Batter URL:", url); 
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.bestPlayer) {
            bestPlayer.textContent = `Best Batter: ${data.bestPlayer.player_name}`;
        } else {
            bestPlayer.textContent = "No Best Batter data available.";
        }

    } catch (error) {
        console.error("Error fetching best batter: ", error);
        bestPlayer.textContent = "Error fetching best batter.";
    }
});

bestBowlerBtn.addEventListener("click", async () => {
    const innings = inningsSelect.value;
    console.log("Fetching Best Bowler for innings: ", innings);  

    try {
        const url = `http://localhost:4000/api/match/${selectedMatchIndex}?date=${dateInput.value}&innings=${innings}&role=bowler`;
        console.log("Best Bowler URL:", url); 
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.bestPlayer) {
            bestPlayer.textContent = `Best Bowler: ${data.bestPlayer.player_name}`;
        } else {
            bestPlayer.textContent = "No Best Bowler data available.";
        }

    } catch (error) {
        console.error("Error fetching best bowler: ", error);
        bestPlayer.textContent = "Error fetching best bowler.";
    }
});
