export type GameCardValue = "rock" | "paper" | "scissors";
export interface GameCard {
  title: GameCardValue;
  image: string;
  pos: "top" | "bottom";
}
