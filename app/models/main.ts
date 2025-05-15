export type GameCardValue = "rock" | "paper" | "scissors" | "spock" | "lizard";
export interface GameCard {
  title: GameCardValue;
  image: string;
  pos: "top" | "first-left" | "first-right" | "second-left" | "second-right";
}
