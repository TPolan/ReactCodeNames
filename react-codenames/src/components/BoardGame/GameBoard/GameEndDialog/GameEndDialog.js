import React, {useEffect, useState} from 'react';
import {Dialog, DialogTitle, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";

const GameEndDialog = props => {

    const gameOver = useSelector(state => state.gameOver);
    const trigger = useSelector(state => state.gameOverTrigger);
    const [open, setOpen] = useState(false);

    useEffect(()=> {
        if (gameOver) {
            setOpen(true);
        }
    }, [gameOver])

    const closeDialog = () => setOpen(false);

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
                        GAME OVER! YOU FOUND THE KILLER!
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

    const gameOverMessage = createEndMessage(trigger);

    return (
        <Dialog onClose={closeDialog} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={closeDialog}>
                {gameOverMessage}
            </DialogTitle>
        </Dialog>
    )
}
export default GameEndDialog;