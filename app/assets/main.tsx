"use client";
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridCol,
  Modal,
  Stack,
  Text,
} from "@mantine/core";
import rockImage from "../assets/icon-rock.svg";
import paperImage from "../assets/icon-paper.svg";
import scissorImage from "../assets/icon-scissors.svg";
import GameCard from "../components/common/game-card";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import rulesImage from "../assets/image-rules-bonus.svg";
import logoImage from "../assets/logo-bonus.svg";
import closeImage from "../assets/icon-close.svg";
import { useEffect, useState } from "react";
import { isUserCardWinner, pickCard } from "../lib/utils/main";
import { cssBreakPoints } from "../constants/main";
import { GameCard as GameCardType, GameCardValue } from "../models/main";
const Main = () => {
  const gameCards: GameCardType[] = [
    { image: rockImage, pos: "second-right", title: "rock" },
    { image: paperImage, pos: "first-right", title: "paper" },
    { image: scissorImage, pos: "top", title: "scissors" },
    { image: scissorImage, pos: "first-left", title: "spock" },
    { image: scissorImage, pos: "second-left", title: "lizard" },
  ];

  const [isRulesModalOpen, { open: openRulesModal, close: closeRulesModal }] =
    useDisclosure();

  const [pickedByUser, setPickedByUser] = useState<GameCardValue | "">("");
  const [pickedByHouse, setPickedByHouse] = useState<GameCardValue | "">("");

  const [isPicked, setIsPicked] = useState(false);

  const [playerWins, setPlayerWins] = useState(false);

  const HOUSE_PICK_INVERVAL = 3000;

  const setHousePick = () => {
    const housePick = pickCard(pickedByUser as GameCardValue);
    if (housePick) {
      setPickedByHouse(housePick);
      if (isUserCardWinner(pickedByUser as GameCardValue, housePick)) {
        setPlayerWins(true);
        return setScore((prev) => prev + 1);
      }
      setPlayerWins(false);
      setScore((prev) => (prev === 0 ? 0 : prev - 1));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHousePick();
    }, HOUSE_PICK_INVERVAL);

    return () => clearTimeout(timer);
  }, [pickedByUser]);

  const onPlayCard = (card: { title: GameCardValue }) => {
    setPickedByHouse("");
    setPickedByUser(card.title);
    setIsPicked(true);
    setPlayerWins(false);
  };

  const [score, setScore] = useState(0);

  const isSmallScreen = useMediaQuery(
    `(max-width:${cssBreakPoints.SMALL_BREAKPOINT})`
  );

  const isTabletScreen = useMediaQuery(
    `(max-width:${cssBreakPoints.TABLET_BREAKPOINT})`
  );

  return (
    <Container
      fluid
      className="w-full !h-full !p-0 flex flex-col justify-center"
    >
      <Stack className="!h-[90%] !w-full">
        <Box className="rounded-md header-border-color border min-w-[90%] md:min-w-[30%] mx-auto p-5 mt-5">
          <Flex justify={"space-between"} align={"center"}>
            <Box>
              <Image src={logoImage} height={80} width={80} alt="Logo" />
            </Box>
            <Stack
              className="bg-white min-w-[4rem] min-h-[4rem] rounded-md"
              gap={0}
              justify="center"
              align="center"
            >
              <Text className="!txt-dark !text-xs !tracking-wider" fw={"bold"}>
                SCORE
              </Text>
              <Text className="!score-text !text-4xl">{score}</Text>
            </Stack>
          </Flex>
        </Box>
        <Box
          className="flex-1 min-w-[90%] md:min-w-[30%] mx-auto flex justify-center"
          mt={50}
        >
          {isPicked ? (
            <Box className="min-w-screen !h-full">
              <Grid
                className="!h-full w-[90%] md:!w-[60%] mx-auto items-stretch"
                justify="space-between"
                align="center"
              >
                <GridCol
                  span={4}
                  className="!h-full flex justify-center items-center"
                >
                  <Stack gap={30}>
                    <Text className="txt-white text-center" fw={"bold"}>
                      YOU PICKED
                    </Text>
                    <Box
                      className={`${playerWins && `winner-bg winner-bg-user`}`}
                    >
                      <GameCard
                        card={
                          gameCards.find(
                            (x) => x.title === pickedByUser
                          ) as GameCardType
                        }
                      />
                    </Box>
                  </Stack>
                </GridCol>
                {!isSmallScreen && (
                  <GridCol span={3}>
                    <Stack justify="center" align="center">
                      <Text fw={"bolder"} className="txt-white !text-2xl">
                        YOU{" "}
                        {!pickedByHouse ? "..." : playerWins ? "WIN" : "LOSE"}
                      </Text>
                      <Button
                        color={"white"}
                        variant="filled"
                        className={`!text-black ${
                          playerWins
                            ? `hover:!text-black`
                            : `hover:!text-red-600`
                        } hover:!bg-white`}
                        disabled={!pickedByHouse}
                        onClick={() => {
                          setIsPicked(false);
                          setPickedByHouse("");
                          setPickedByUser("");
                          setPlayerWins(false);
                        }}
                      >
                        PLAY AGAIN
                      </Button>
                    </Stack>
                  </GridCol>
                )}
                <GridCol
                  span={4}
                  className="!h-full flex justify-center items-center"
                >
                  <Stack gap={30} justify="center" align="center">
                    <Text className="txt-white text-center" fw={"bold"}>
                      THE HOUSE PICKED
                    </Text>
                    {!pickedByHouse ? (
                      <Box className="house-picking-bg w-[6rem] h-[6rem] rounded-full" />
                    ) : (
                      <Box
                        className={`${
                          !playerWins && `winner-bg winner-bg-house`
                        }`}
                      >
                        <GameCard
                          card={
                            gameCards.find(
                              (x) => x.title === pickedByHouse
                            ) as GameCardType
                          }
                        />
                      </Box>
                    )}
                  </Stack>
                </GridCol>
                {isSmallScreen && (
                  <GridCol span={12}>
                    <Stack justify="center" align="center">
                      <Text fw={"bolder"} className="txt-white !text-2xl">
                        YOU{" "}
                        {!pickedByHouse ? "..." : playerWins ? "WIN" : "LOSE"}
                      </Text>
                      <Button
                        color={"white"}
                        variant="filled"
                        className={`!text-black ${
                          playerWins
                            ? `hover:!text-black`
                            : `hover:!text-red-600`
                        } hover:!bg-white`}
                        disabled={!pickedByHouse}
                        onClick={() => {
                          setIsPicked(false);
                          setPickedByHouse("");
                          setPickedByUser("");
                          setPlayerWins(false);
                        }}
                      >
                        PLAY AGAIN
                      </Button>
                    </Stack>
                  </GridCol>
                )}
              </Grid>
            </Box>
          ) : (
            <Stack
              justify="space-between"
              align="center"
              className="!min-w-[90%] !h-[20rem] bg-pentagon"
              mt={50}
            >
              <Box
                className="cursor-pointer mt-[-15px]"
                onClick={() => {
                  onPlayCard(
                    gameCards.find((x) => x.pos === "top") as GameCardType
                  );
                }}
              >
                <GameCard
                  card={
                    gameCards.find((x) => x.pos === "bottom") as GameCardType
                  }
                />
              </Box>
              <Flex justify={"space-between"} className="w-full">
                {gameCards
                  .filter((x) => ["first-left", "first-right"].includes(x.pos))
                  .map((card) => (
                    <Box
                      key={card.title}
                      className="cursor-pointer mt-[-35px]"
                      onClick={() => {
                        onPlayCard(card);
                      }}
                    >
                      <GameCard card={card} />
                    </Box>
                  ))}
              </Flex>
              <Flex justify={"space-between"} className="w-full">
                {gameCards
                  .filter((x) =>
                    ["second-left", "second-right"].includes(x.pos)
                  )
                  .map((card) => (
                    <Box
                      key={card.title}
                      className="cursor-pointer mb-[-30px]"
                      onClick={() => {
                        onPlayCard(card);
                      }}
                    >
                      <GameCard card={card} />
                    </Box>
                  ))}
              </Flex>
            </Stack>
          )}
        </Box>
        <Box className="!w-full flex justify-center md:justify-end p-10">
          <Button color={"white"} variant="outline" onClick={openRulesModal}>
            RULES
          </Button>
        </Box>
      </Stack>
      <Modal
        onClose={closeRulesModal}
        title="RULES"
        opened={isRulesModalOpen}
        styles={{
          title: {
            color: "hsl(229, 25%, 31%)",
            fontSize: "1.5rem",
            fontWeight: "bold",
          },
          close: {
            color: "hsl(229, 25%, 31%)",
          },
        }}
        classNames={{
          title: `text-center w-full md:text-start md:w-auto`,
          close: `!hidden md:!inline`,
          body: `h-full ${
            isTabletScreen && `flex justify-center items-center`
          }`,
        }}
        fullScreen={isTabletScreen}
        centered
      >
        <Box className="p-5 flex gap-30 md:gap-0 flex-col justify-between md:justify-center items-center min-h-[15rem] md:h-auto">
          <Image src={rulesImage} alt="Rules" />
          {isTabletScreen && (
            <Box>
              <ActionIcon
                onClick={() => {
                  closeRulesModal();
                }}
                color="transparent"
              >
                <Image src={closeImage} alt="Close" />
              </ActionIcon>
            </Box>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Main;
