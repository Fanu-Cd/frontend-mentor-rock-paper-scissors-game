import type { GameCard } from "@/app/models/main";
import { Box } from "@mantine/core";
import Image from "next/image";
import React from "react";

const GameCard = ({ card }: { card: GameCard }) => {
  return (
    <Box
      className={`rounded-full bg-white w-[6rem] h-[6rem] flex justify-center items-center ${
        card?.title === "rock"
          ? "game-card-rock"
          : card?.title === "paper"
          ? "game-card-paper"
          : "game-card-scissor"
      }`}
    >
      <Image src={card?.image} alt="Card Image" width={25} height={25} />
    </Box>
  );
};

export default GameCard;
