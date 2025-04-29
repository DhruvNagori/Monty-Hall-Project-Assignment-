let prizeDoor;
let chosenDoor;
let revealedDoor;
let stayWins = 0;
let switchWins = 0;
let hasPlayed = false; // ✅ New flag to prevent multiple plays
let stayLosses = 0;
let switchLosses = 0;


// Start new game
function resetGame() {
    prizeDoor = Math.floor(Math.random() * 3) + 1;
    chosenDoor = null;
    revealedDoor = null;
    hasPlayed = false;
    document.getElementById('result').textContent = '';
    document.querySelectorAll('.door').forEach(btn => {
        btn.disabled = false;
        btn.style.background = "#eee"; // Optional: reset background
    });

    stayWins = 0;
    switchWins = 0;
    stayLosses = 0;
    switchLosses = 0;
    updateStats();
    document.getElementById('action-buttons').style.display = "none";
    document.getElementById('next-game-btn').style.display = 'none';
}



// Choose door
function chooseDoor(door) {
    if (chosenDoor !== null) return; // Already chosen
    chosenDoor = door;

    // Reveal a goat door
    do {
        revealedDoor = Math.floor(Math.random() * 3) + 1;
    } while (revealedDoor === chosenDoor || revealedDoor === prizeDoor);

    document.getElementById('door' + revealedDoor).style.background = "#f8d7da";
    document.getElementById('door' + revealedDoor).disabled = true;

    // Show Switch/Stay buttons
    document.getElementById('action-buttons').style.display = "block";
}

// Player stays
function stay() {
    if (chosenDoor === null || hasPlayed) return;
    hasPlayed = true;

    document.querySelectorAll('.door').forEach(btn => btn.disabled = true);
    document.getElementById('action-buttons').style.display = "none";

    if (chosenDoor === prizeDoor) {
        stayWins++;
        document.getElementById('result').textContent = "🎉 You Won by Staying!";
        confetti();
    } else {
        stayLosses++;
        document.getElementById('result').textContent = "😞 You Lost by Staying.";
    }
    updateStats();
    document.getElementById('next-game-btn').style.display = 'inline-block';
}


// Player switches
function switchDoor() {
    if (chosenDoor === null || hasPlayed) return;
    hasPlayed = true;

    let newChoice = [1, 2, 3].find(door => door !== chosenDoor && door !== revealedDoor);
    chosenDoor = newChoice;

    document.querySelectorAll('.door').forEach(btn => btn.disabled = true);
    document.getElementById('action-buttons').style.display = "none";

    if (chosenDoor === prizeDoor) {
        switchWins++;
        document.getElementById('result').textContent = "🎉 You Won by Switching!";
        confetti();
    } else {
        switchLosses++;
        document.getElementById('result').textContent = "😞 You Lost by Switching.";
    }
    updateStats();
    document.getElementById('next-game-btn').style.display = 'inline-block';
}


// Update wins
function updateStats() {
    document.getElementById('stayWins').textContent = stayWins;
    document.getElementById('stayLosses').textContent = stayLosses;
    document.getElementById('switchWins').textContent = switchWins;
    document.getElementById('switchLosses').textContent = switchLosses;
}


// Start a new round without resetting stats
function startNewRound() {
    prizeDoor = Math.floor(Math.random() * 3) + 1;
    chosenDoor = null;
    revealedDoor = null;
    hasPlayed = false;

    document.getElementById('result').textContent = '';
    document.querySelectorAll('.door').forEach(btn => {
        btn.disabled = false;
        btn.style.background = "#eee"; // reset background
    });

    document.getElementById('action-buttons').style.display = "none";
    document.getElementById('next-game-btn').style.display = 'none';
}

// Next Game Button Listener
document.getElementById('next-game-btn').addEventListener('click', () => {
    startNewRound();
});

// Auto simulate 1000 games
function autoSimulate(times) {
    for (let i = 0; i < times; i++) {
        prizeDoor = Math.floor(Math.random() * 3) + 1;
        chosenDoor = Math.floor(Math.random() * 3) + 1;

        do {
            revealedDoor = Math.floor(Math.random() * 3) + 1;
        } while (revealedDoor === chosenDoor || revealedDoor === prizeDoor);

        const newChoice = [1, 2, 3].find(d => d !== chosenDoor && d !== revealedDoor);
        if (newChoice === prizeDoor) {
            switchWins++;
        } else {
            switchLosses++;
        }

        if (chosenDoor === prizeDoor) {
            stayWins++;
        } else {
            stayLosses++;
        }
    }
    updateStats();
    document.getElementById('result').textContent = `Auto Simulated ${times} Games! 📈`;
}


// Start the first game
resetGame();
