import React from "react";
import * as R from "ramda";

import * as MaterialUi from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import gameCard1 from "../../images/gameCard1.jpg";
import gameCard2 from "../../images/gameCard2.jpg";
import gameCard3 from "../../images/gameCard3.jpg";
import gameCard4 from "../../images/gameCard4.jpg";
import gameCard5 from "../../images/gameCard5.jpg";
import gameCard6 from "../../images/gameCard6.PNG";
import gameCard7 from "../../images/gameCard7.jpg";
import gameCard8 from "../../images/gameCard8.jpg";
import gameDefault from "../../images/gameDefault.jpg";

const useStyles = makeStyles((theme) => ({
    gameCardLocation: {
        textAlign: "center",
        padding: theme.spacing(2),
    },
    gameCard: {
        height: "175px",
    },
    gameCardInlay: {
        padding: "8px",
    },
    gameCardImage: {
        height: "159px",
    },
}));

const flippedImage = R.cond([
    [R.equals("gameCard1"), R.always(gameCard1)],
    [R.equals("gameCard2"), R.always(gameCard2)],
    [R.equals("gameCard3"), R.always(gameCard3)],
    [R.equals("gameCard4"), R.always(gameCard4)],
    [R.equals("gameCard5"), R.always(gameCard5)],
    [R.equals("gameCard6"), R.always(gameCard6)],
    [R.equals("gameCard7"), R.always(gameCard7)],
    [R.equals("gameCard8"), R.always(gameCard8)],
]);

export default function Card ({
    currentCard,
    handleFlip,
    solvedCards,
    roundOver,
    canFlip,
}) {
    const classes = useStyles();
    const [flipped, setFlipped] = React.useState(false);

    React.useEffect(() => {
        setFlipped(R.includes(currentCard.id, solvedCards));
    }, [roundOver]);

    const flip = () => {
        setFlipped(true);
    };

    return (
    <>
    <MaterialUi.Grid item md={3} xs={12} className={classes.gameCardLocation}>
        <MaterialUi.Box display="flex" justifyContent="center">
            <MaterialUi.Card variant="elevation" className={classes.gameCard}>
                <MaterialUi.CardContent className={classes.gameCardInlay}>
                    {flipped ? (
                        <MaterialUi.CardMedia
                            component="img"
                            image={currentCard.id |> flippedImage}
                            alt={currentCard.altText}
                            className={classes.gameCardImage}
                        />
                    ) : (
                        <MaterialUi.CardMedia
                            component="img"
                            image={gameDefault}
                            alt="Flip me over to see what card I am"
                            onClick={() => {
                                if (canFlip) {
                                    handleFlip();
                                    flip();
                                }
                            }}
                            className={classes.gameCardImage}
                        />
                    )}
                </MaterialUi.CardContent>
            </MaterialUi.Card>
        </MaterialUi.Box>
    </MaterialUi.Grid>
    </>
    );
}
