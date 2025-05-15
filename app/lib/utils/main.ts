import { GameCardValue } from "@/app/models/main";

export const pickCard: (x: GameCardValue) => GameCardValue = (userPick) => {
  const choices = ["rock", "paper", "scissors", "spock", "lizard"].filter(
    (x) => x !== userPick
  );
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex] as GameCardValue;
};

export const isUserCardWinner: (
  x: GameCardValue,
  y: GameCardValue
) => boolean = (userPick, housePick) => {
  let userWins = false;
  console.log("game", userPick, housePick);
  if (
    (userPick === "rock" && ["scissors", "lizard"].includes(housePick)) ||
    (userPick === "scissors" && ["paper", "lizard"].includes(housePick)) ||
    (userPick === "paper" && ["rock", "spock"].includes(housePick)) ||
    (userPick === "spock" && ["scissors", "rock"].includes(housePick)) ||
    (userPick === "lizard" && ["spock", "paper"].includes(housePick))
  )
    userWins = true;
  return userWins;
};
