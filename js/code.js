function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function selection(play) {
  let result = "";
  switch (play) {
    case 1:
      result = "rock 🪨";
      break;
    case 2:
      result = "paper 📃";
      break;
    case 3:
      result = "scissors ✂️";
      break;
    default:
      result = "TO LOSE";
      break;
  }
  return result;
}
function reportStatus(wins, losses, draws) {
  return (
    "Total wins: " +
    wins +
    "\nTotal losses: " +
    losses +
    "\nTotal draws: " +
    draws
  );
}

let pc = 0;
let player = 0;
let wins = 0;
let losses = 0;
let draws = 0;

while (wins < 3 && losses < 3) {
  pc = random(1, 3);
  player = parseInt(prompt("Select: 1 for rock, 2 for paper, 3 for scissors"));
  alert("You selected " + selection(player));
  alert("PC selects " + selection(pc));
  // COMBAT
  if (pc === player) {
    draws++;
    alert(`ROUND IS A DRAW\n${reportStatus(wins, losses, draws)}`);
  } else if (
    (player === 1 && pc === 3) ||
    (player === 2 && pc === 1) ||
    (player === 3 && pc === 2)
  ) {
    wins++;
    alert(`YOU WIN THE ROUND\n${reportStatus(wins, losses, draws)}`);
  } else {
    losses++;
    alert(`YOU LOST THE ROUND\n${reportStatus(wins, losses, draws)}`);
  }
}
let winner = wins >= 3 ? "YOU" : "PC";
alert(`Final winner is ${winner}!\n\n${reportStatus(wins, losses, draws)}`);
