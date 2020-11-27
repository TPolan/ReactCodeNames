import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogTitle, Grid, Typography} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import {createNewGame, restartGame} from "../../../../redux/actions/actions";

const GameEndDialog = () => {

    const {gameOver, gameOverTrigger, words, gameCode, redTurn} = useSelector(state => state);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=> {
        if (gameOver) {
            setOpen(true);
        }
    }, [gameOver])
    const closeDialog = () => setOpen(false);
    const handleNewGame = () => {
        dispatch(restartGame());
    };

    const createEndMessage = (triggerType) => {
        switch (triggerType) {
            case 'red':
                return (
                    <Typography style={{color: 'red'}} variant={"h3"}>
                        RED TEAM WINS
                    </Typography>
                )
            case 'blue':
                return (
                    <Typography style={{color: 'blue'}} variant={"h3"}>
                        BLUE TEAM WINS
                    </Typography>
                )
            case 'black':
                return (
                    <Typography style={{color: 'black'}} variant={"h3"}>
                        GAME OVER! {redTurn ? 'RED TEAM' : 'BLUE TEAM'} FOUND THE KILLER!
                    </Typography>
                )
            default:
                return (
                    <Typography style={{color: 'orange'}} variant={"h3"}>
                        UNSUPPORTED TRIGGER
                    </Typography>
                )
        }
}

    const gameOverMessage = createEndMessage(gameOverTrigger);

    return (
        <Dialog onClose={closeDialog} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={closeDialog}>
                {gameOverMessage}
            </DialogTitle>
            {/*<DialogActions>*/}
            {/*    <Grid container justify={"center"}>*/}
            {/*        <Button item onClick={handleNewGame}>New Game</Button>*/}
            {/*    </Grid>*/}
            {/*</DialogActions>*/}
        </Dialog>
    )
}
export default GameEndDialog;