import React from "react";
import * as R from "ramda";
import { useStopwatch } from "react-timer-hook";

import * as MaterialUi from "@material-ui/core";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { makeStyles } from "@material-ui/core/styles";

import Game from "./Game.jsx";

const useStyles = makeStyles((theme) => ({
    gameDialog: {
        textAlign: "center",
    },
    gameDialogTitle: {
        textAlign: "center",
    },
    gameInfoAndActionsGrid: {
        paddingBottom: "6px",
    },
    gameInfoItem: {
        padding: "6px",
    },
    gameActionButton: {
        marginLeft: "16px",
    },
}));

export default function GameSetup () {
    const searchParams = new URLSearchParams(window.location.search);
    const [difficulty, setDifficulty] = React.useState(
        searchParams.get("difficulty")
    );
    const classes = useStyles();
    const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });
    const [score, setScore] = React.useState("");
    const [gameMode, setGameMode] = React.useState("");
    const [moves, setMoves] = React.useState("");
    const [gameOver, setGameOver] = React.useState(false);
    const [pauseGame, setPauseGame] = React.useState(false);

    React.useEffect(() => {
        console.log("difficulty", difficulty);
    }, [difficulty]);

    const startOver = () => {
        setScore("");
        setGameMode("");
        searchParams.delete("difficulty");
        setMoves("");
        reset();
        pause();
    };

    const gameOverCleanUp = () => {
        setGameOver(false);
        startOver();
    };

    const unPauseGame = () => {
        setPauseGame(false);
        start();
    };

    React.useEffect(() => {
        if (moves === 0) {
            start();
        }
    }, [moves]);

    React.useEffect(() => {
        if (gameOver) {
            pause();
        }
    }, [gameOver]);

    React.useEffect(() => {
        if (pauseGame) {
            pause();
        }
    }, [pauseGame]);

    return (
    <>
        <MaterialUi.Box padding={2}>
            {R.isEmpty(gameMode) ? (
                <MaterialUi.Box textAlign="center">
                    <MaterialUi.Typography>
                Please Select a Game Mode to Start a New Game!
                    </MaterialUi.Typography>
                    <br />
                    <MaterialUi.Button
                        color="primary"
                        variant="outlined"
                        onClick={() => setGameMode("easy")}
                        style={{ margin: "6px" }}
                    >
                Easy
                    </MaterialUi.Button>
                    <MaterialUi.Button
                        color="primary"
                        variant="outlined"
                        onClick={() => setGameMode("medium")}
                        style={{ margin: "6px" }}
                    >
                Medium
                    </MaterialUi.Button>
                    <MaterialUi.Button
                        color="primary"
                        variant="outlined"
                        onClick={() => setGameMode("hard")}
                        style={{ margin: "6px" }}
                    >
                Hard
                    </MaterialUi.Button>
                </MaterialUi.Box>
            ) : (
                <MaterialUi.Box>
                    <MaterialUi.Box
                        display="flex"
                        alignContent="center"
                        justifyContent="center"
                        padding={2}
                    >
                        <MaterialUi.Typography>
                            {`You are playing on ${gameMode}! Good Luck!`}
                        </MaterialUi.Typography>
                    </MaterialUi.Box>
                    <MaterialUi.Grid
                        container
                        justify="center"
                        spacing={2}
                        className={classes.gameInfoAndActionsGrid}
                    >
                        <MaterialUi.Grid item xs={4}>
                            <MaterialUi.Box display="flex" className={classes.gameInfoItem}>
                                <QueryBuilderIcon />
                                <MaterialUi.Typography>
                                    {`${days}:${hours}:${minutes}:${seconds}`}
                                </MaterialUi.Typography>
                            </MaterialUi.Box>
                        </MaterialUi.Grid>
                        <MaterialUi.Grid item xs={4}>
                            <MaterialUi.Box className={classes.gameInfoItem}>
                                <MaterialUi.Typography>{`Moves: ${moves}`}</MaterialUi.Typography>
                            </MaterialUi.Box>
                        </MaterialUi.Grid>
                        <MaterialUi.Grid item xs={4}>
                            <MaterialUi.Box
                                id="gameActions"
                                display="flex"
                                justifyContent="flex-end"
                            >
                                <MaterialUi.Tooltip title="Pause">
                                    <MaterialUi.Button
                                        variant="outlined"
                                        onClick={() => setPauseGame(true)}
                                        size="small"
                                        className={classes.gameActionButton}
                                    >
                                        <PauseIcon />
                                    </MaterialUi.Button>
                                </MaterialUi.Tooltip>
                                <MaterialUi.Tooltip title="Restart">
                                    <MaterialUi.Button
                                        variant="outlined"
                                        onClick={startOver}
                                        size="small"
                                        className={classes.gameActionButton}
                                    >
                                        <ReplayIcon />
                                    </MaterialUi.Button>
                                </MaterialUi.Tooltip>
                            </MaterialUi.Box>
                        </MaterialUi.Grid>
                    </MaterialUi.Grid>
                    <Game
                        score={score}
                        setScore={setScore}
                        gameMode={gameMode}
                        moves={moves}
                        setMoves={setMoves}
                        setGameOver={setGameOver}
                    />
                </MaterialUi.Box>
            )}
        </MaterialUi.Box>
        <MaterialUi.Dialog open={gameOver} onClose={gameOverCleanUp}>
            <MaterialUi.DialogTitle className={classes.gameDialogTitle}>
            Game Over
            </MaterialUi.DialogTitle>
            <MaterialUi.DialogContent className={classes.gameDialog}>
                <MaterialUi.DialogContentText>
                    <strong>{`You did it You won!`}</strong>
                    <br />
                    {`You were playing on ${gameMode} mode`}
                    <br />
                    {`It took you ${moves} moves and `}
                    <br />
                    {`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`}
                    <br />
                    {` to clear the board!`}
                </MaterialUi.DialogContentText>
                <br />
                <MaterialUi.Button variant="outlined" onClick={gameOverCleanUp}>
                Return to Home
                </MaterialUi.Button>
            </MaterialUi.DialogContent>
        </MaterialUi.Dialog>
        <MaterialUi.Dialog fullScreen open={pauseGame} onClose={unPauseGame}>
            <MaterialUi.DialogTitle className={classes.gameDialogTitle}>
            Paused Game
            </MaterialUi.DialogTitle>
            <MaterialUi.DialogContent className={classes.gameDialog}>
                <MaterialUi.DialogContentText>
                    <strong>{`Here are your quick stats about the current game:`}</strong>
                    <br />
                    {`You are playing on ${gameMode} mode`}
                    <br />
                    {`You have made ${moves} moves and taken`}
                    <br />
                    {`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds, so far`}
                </MaterialUi.DialogContentText>
                <br />
                <MaterialUi.DialogContentText>
                Would you like to ...
                </MaterialUi.DialogContentText>
                <MaterialUi.Button
                    variant="outlined"
                    onClick={unPauseGame}
                    className={classes.gameActionButton}
                >
                Resume Game
                </MaterialUi.Button>
                <MaterialUi.Button
                    variant="outlined"
                    onClick={startOver}
                    className={classes.gameActionButton}
                >
                Quit Game
                </MaterialUi.Button>
            </MaterialUi.DialogContent>
        </MaterialUi.Dialog>
    </>
    );
}
