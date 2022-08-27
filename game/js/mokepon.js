"use strict";

function getSelectedPetInfo(petsList, petId) {
  let pet;
  for (let i = 0; i < petsList.length; i++) {
    const listItem = petsList[i];
    if (petId === listItem.id) pet = listItem;
  }
  return pet;
}

function getSelectedPetMsg(selectedPet) {
  return selectedPet
    ? `You selected ${selectedPet.name.toUpperCase()}! ${selectedPet.emoji}`
    : "No pet selected...";
}

function getAttackMsg(pet, attack, isPlayer) {
  const petUser = isPlayer ? "Your" : "Enemy's";
  return (
    `${petUser} pet ${pet.name.toUpperCase()} ` +
    `has attacked with ${attack.name.toUpperCase()}! ${attack.emoji}`
  );
}

function getPetId() {
  const petsToSelect = document.querySelectorAll("input[name='pet']");
  let petId;
  for (let i = 0; i < petsToSelect.length; i++) {
    const pet = petsToSelect[i].id;
    const isChecked = petsToSelect[i].checked;
    if (isChecked) petId = pet;
  }
  return petId;
}

function labelWithPetName(span, petName) {
  span.innerHTML = petName;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomItem(arr) {
  const randomIndex = random(0, arr.length - 1);
  return arr[randomIndex];
}

function createParagraph(node, msg) {
  const p = document.createElement("p");
  p.innerHTML = msg;
  node.appendChild(p);
}

function getBattleResult(yourAttName, enemyAttName) {
  if (yourAttName === enemyAttName) return "draw";
  return (yourAttName === "ground" && enemyAttName === "water") ||
    (yourAttName === "water" && enemyAttName === "fire") ||
    (yourAttName === "fire" && enemyAttName === "ground")
    ? "win"
    : "lose";
}

function getResultMsg(yourAttack, enemyAttack) {
  const result = getBattleResult(yourAttack.name, enemyAttack.name);
  if (result === "draw") {
    return "It's a draw... Both attacked with " + yourAttack.name + " 😑";
  }
  const msgResult = result === "win" ? "win!" : "lose...";
  const winner = result === "win" ? yourAttack.name : enemyAttack.name;
  const loser = result === "win" ? enemyAttack.name : yourAttack.name;
  const winnerEmoji = result === "win" ? yourAttack.emoji : enemyAttack.emoji;
  const reactionEmoji = result === "win" ? "😎" : "🥲";
  return (
    `You ${msgResult} ${winner.toUpperCase()} ` +
    `${winnerEmoji} beats ${loser} ${reactionEmoji}`
  );
}

function startGame() {
  const pets = [
    {
      name: "Hipodoge",
      id: "hipodoge",
      emoji: "🔥",
    },
    {
      name: "Capipepo",
      id: "capipepo",
      emoji: "💧",
    },
    {
      name: "Ratigüeya",
      id: "ratigueya",
      emoji: "🌱",
    },
  ];

  const attacks = [
    {
      name: "fire",
      id: "fire-attack",
      emoji: "🔥",
    },
    {
      name: "water",
      id: "water-attack",
      emoji: "💧",
    },
    {
      name: "ground",
      id: "ground-attack",
      emoji: "🌱",
    },
  ];

  const btnPlayerPet = document.getElementById("pet-btn");
  const spanPlayerPet = document.getElementById("player-pet");
  const spanEnemyPet = document.getElementById("enemy-pet");
  const btnAttacks = document.querySelectorAll("#attacks button");
  const msgSection = document.getElementById("messages");
  let playerPet;
  let enemyPet;
  let playerAttack;
  let enemyAttack;

  btnPlayerPet.addEventListener("click", () => {
    const petId = getPetId();
    playerPet = getSelectedPetInfo(pets, petId);
    if (playerPet) {
      enemyPet = getRandomItem(pets);
      labelWithPetName(spanPlayerPet, playerPet.name);
      labelWithPetName(spanEnemyPet, enemyPet.name);
    }
    alert(getSelectedPetMsg(playerPet));
    if (enemyPet)
      alert(
        "Enemy has selected " +
          `${enemyPet.name.toUpperCase()}! ${enemyPet.emoji}`
      );
  });
  btnAttacks.forEach((button) => {
    button.addEventListener("click", () => {
      if (playerPet) {
        for (let i = 0; i < attacks.length; i++) {
          const listItem = attacks[i];
          if (button.id === listItem.id) playerAttack = listItem;
        }
        enemyAttack = getRandomItem(attacks);
        const playerAttackMsg = getAttackMsg(playerPet, playerAttack, true);
        const enemyAttackMsg = getAttackMsg(enemyPet, enemyAttack, false);
        const battleResultMsg = getResultMsg(playerAttack, enemyAttack);
        createParagraph(msgSection, playerAttackMsg);
        createParagraph(msgSection, enemyAttackMsg);
        createParagraph(msgSection, battleResultMsg);
      } else {
        alert("You can't attack without a pet...");
      }
    });
  });
}

window.addEventListener("load", startGame);
