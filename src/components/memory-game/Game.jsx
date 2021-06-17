import React from "react";
import * as R from "ramda";
import { useSnackbar } from "notistack";

import * as MaterialUi from "@material-ui/core";

import Card from "./Card.jsx";

export default function Game ({
    score,
    setScore,
    gameMode,
    moves,
    setMoves,
    setGameOver,
}) {
    const { enqueueSnackbar } = useSnackbar();
    const mapWithIndex = R.addIndex(R.map);
    const reOrderedCards = cards |> R.sort(() => Math.random() - 0.5);
    const [roundOver, setRoundOver] = React.useState(false);
    const [flippedCard1, setFlippedCard1] = React.useState(null);
    const [flippedCard2, setFlippedCard2] = React.useState(null);
    const [gameCards, setGameCards] = React.useState([]);
    const [solvedCards, setSolvedCards] = React.useState([]);

    const handleFlip = (currentCard) => {
        if (flippedCard1 == null && flippedCard2 == null) {
            if (moves === "") {
                setMoves(0);
            }
            setFlippedCard1(currentCard);
        }
        if (flippedCard1 != null && flippedCard2 == null) {
            setFlippedCard2(currentCard);
        }
    };

    React.useEffect(() => {
        if (flippedCard1 != null && flippedCard2 != null) {
            setMoves(R.add(moves, 1));
            setTimeout(() => {
                setRoundOver(true);
            }, 1500);
            if (flippedCard1 === flippedCard2) {
                enqueueSnackbar("You got a match!", { variant: "success" });
                setScore(score |> R.add(1));
                setSolvedCards(solvedCards |> R.append(flippedCard1.id));
            } else {
                enqueueSnackbar("You didn't get a match!", { variant: "warning" });
            }
        }
    }, [flippedCard2]);

    React.useEffect(() => {
        if (gameMode === "easy" && score == 2) {
            setScore("");
            setGameOver(true);
        } else if (gameMode === "medium" && score == 6) {
            setGameOver(true);
            setScore("");
        } else if (gameMode === "hard" && score == 8) {
            setGameOver(true);
            setScore("");
        }
    }, [score]);

    React.useEffect(() => {
        if (roundOver == true) {
            setFlippedCard1(null);
            setFlippedCard2(null);
            setRoundOver(false);
        }
    }, [roundOver]);

    React.useEffect(() => {
        if (gameMode === "easy") {
            setGameCards(
                reOrderedCards
          |> R.dropLast(6)
          |> R.concat((reOrderedCards |> R.dropLast(6)))
          |> R.sort(() => Math.random() - 0.5)
            );
        } else if (gameMode === "medium") {
            setGameCards(
                reOrderedCards
          |> R.dropLast(2)
          |> R.concat((reOrderedCards |> R.dropLast(2)))
          |> R.sort(() => Math.random() - 0.5)
            );
        } else if (gameMode === "hard") {
            setGameCards(
                reOrderedCards
          |> R.concat(reOrderedCards)
          |> R.sort(() => Math.random() - 0.5)
            );
        }
    }, [gameMode]);

    return (
    <>
        <MaterialUi.Box padding={3} bgcolor="#2286c3">
            <MaterialUi.Grid container spacing={4} justify="space-evenly">
                {gameCards
            |> mapWithIndex((currentCard, index) => (
                <Card
                    currentCard={currentCard}
                    handleFlip={() => handleFlip(currentCard)}
                    id={index}
                    key={index}
                    solvedCards={solvedCards}
                    roundOver={roundOver}
                    canFlip={flippedCard2 |> R.isNil}
                />
            ))}
            </MaterialUi.Grid>
        </MaterialUi.Box>
    </>
    );
}

const cards = [
    {
        id: "gameCard1",
        altText: "Castiel Cat",
    },
    {
        id: "gameCard2",
        altText: "Crowley with a Hat",
    },
    {
        id: "gameCard3",
        altText: "Crowley and Castiel following Pizza",
    },
    {
        id: "gameCard4",
        altText: "Crowley and Castiel Cuddling",
    },
    {
        id: "gameCard5",
        altText: "Crowley and Castiel cuddling",
    },
    {
        id: "gameCard6",
        altText: "Crowley with Easter Bunny Ears",
    },
    {
        id: "gameCard7",
        altText: "Castiel looking off in space",
    },
    {
        id: "gameCard8",
        altText: "Crowley and Castiel Cuddling",
    },
];
