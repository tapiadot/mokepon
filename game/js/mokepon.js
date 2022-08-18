"use strict";

function getSelectedPetInfo(petId) {
  switch (petId) {
    case "hipodoge":
      return {
        name: "Hipodoge",
        emoji: "🔥",
      };
    case "capipepo":
      return {
        name: "Capipepo",
        emoji: "💧",
      };
    case "ratigueya":
      return {
        name: "Ratigüeya",
        emoji: "🌱",
      };
  }
}

function getSelectedPetMsg(selectedPet) {
  return selectedPet
    ? `You selected ${selectedPet.name.toUpperCase()}! ${selectedPet.emoji}`
    : "No pet selected...";
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

function startGame() {
  const btnPlayerPet = document.getElementById("pet-btn");
  const spanPlayerPet = document.getElementById("player-pet");
  let selectedPet;
  btnPlayerPet.addEventListener("click", () => {
    const petId = getPetId();
    selectedPet = getSelectedPetInfo(petId);
    if (selectedPet) labelWithPetName(spanPlayerPet, selectedPet.name);
    alert(getSelectedPetMsg(selectedPet));
  });
}

window.addEventListener("load", startGame);
