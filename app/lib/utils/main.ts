import { GameCardValue } from "@/app/models/main";

export const pickCard: (x: GameCardValue) => GameCardValue = (userPick) => {
  const choices = ["rock", "paper", "scissors"].filter((x) => x !== userPick);
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex] as GameCardValue;
};

export const isUserCardWinner: (
  x: GameCardValue,
  y: GameCardValue
) => boolean = (userPick, housePick) => {
  //rule: rock beats scissor, scissor beats paper, paper beats rock
  let userWins = false;
  console.log("game", userPick, housePick);
  if (
    (userPick === "rock" && housePick === "scissors") ||
    (userPick === "scissors" && housePick === "paper") ||
    (userPick === "paper" && housePick === "rock")
  )
    userWins = true;
  return userWins;
};
