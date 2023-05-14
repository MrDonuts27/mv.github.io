var scores = {};

function incrementScore() {
    var numberInput = document.getElementById("numberInput");
    var selectedNumber = numberInput.value;
    if (selectedNumber.length === 2) {
        if (selectedNumber in scores) {
            scores[selectedNumber]++;
        } else {
            scores[selectedNumber] = 1;
        }
        updateScores();
        numberInput.value = "";
        saveScores("scores_2"); // เรียกใช้ฟังก์ชัน saveScores เพื่อบันทึกข้อมูล
    } else {
        alert("Please enter a 2-digit number.");
    }
}

function updateScores() {
    var scoresContainer = document.getElementById("scoresContainer");
    scoresContainer.innerHTML = "";

    for (var number in scores) {
        var score = scores[number];

        var scoreItem = document.createElement("div");
        scoreItem.className = "scoreItem";

        var partyName = document.createElement("span");
        partyName.className = "partyName";
        partyName.textContent = "Party " + number;

        var partyScore = document.createElement("span");
        partyScore.className = "partyScore";
        partyScore.textContent = score + " score(s)";

        var editButton = document.createElement("button");
        editButton.className = "editButton";
        editButton.textContent = "Edit Score";
        editButton.dataset.partyNumber = number;
        editButton.onclick = editScore;

        scoreItem.appendChild(partyName);
        scoreItem.appendChild(partyScore);
        scoreItem.appendChild(editButton);

        scoresContainer.appendChild(scoreItem);
    }
}

function calculateTotal() {
    var totalContainer = document.getElementById("totalContainer");
    var total = 0;
    for (var number in scores) {
        total += scores[number];
    }
    totalContainer.innerHTML = "Total Score: " + total;

    findTopParties();
}

window.onload = function() {
    calculateTotal();
};

function findTopParties() {
    var topPartiesContainer = document.getElementById("topPartiesContainer");
    topPartiesContainer.innerHTML = "";

    var sortedParties = Object.keys(scores).sort(function(a, b) {
        return scores[b] - scores[a];
    });

    var numPartiesToShow = Math.min(sortedParties.length, 5);

    for (var i = 0; i < numPartiesToShow; i++) {
        var partyNumber = sortedParties[i];
        var partyScore = scores[partyNumber];
        var partyElement = document.createElement("div");
        partyElement.innerHTML = "Party " + partyNumber + ": " + partyScore + " score(s)";
        topPartiesContainer.appendChild(partyElement);
    }
}

function editScore() {
    var partyNumber = this.dataset.partyNumber;
    var newScore = prompt("Enter new score for Party " + partyNumber + ":");

    if (newScore !== null && !isNaN(newScore)) {
        scores[partyNumber] = parseInt(newScore);
        updateScores();
        calculateTotal();
        saveScores("scores_2");
    }
}

function resetScores() {
    scores = {};
    saveScores("scores_2");
    updateScores();
}

function saveScores(storageKey) {
    localStorage.setItem(storageKey, JSON.stringify(scores));
}

function loadScores(storageKey) {
    if (localStorage.getItem(storageKey)) {
        scores = JSON.parse(localStorage.getItem(storageKey));
        updateScores();
    }
}

// เรียกใช้ฟังก์ชัน loadScores เพื่อโหลดคะแนนจาก localStorage เมื่อโหลดหน้าเว็บใหม่
loadScores("scores_2");

// สร้างปุ่ม Reset Scores
var resetButton = document.createElement("button");
resetButton.innerHTML = "Reset Scores";
resetButton.onclick = function() {
    resetScores("scores_2");
    resetScores("scores");
};
document.body.appendChild(resetButton);
