import React from 'react';
import {Dialog, DialogTitle, Typography} from "@material-ui/core";

const GameEndDialog = props => {
    const {handler, open, trigger} = props

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

    const endMessage = createEndMessage(trigger);

    return (
        <Dialog onClose={handler} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handler}>
                {endMessage}
            </DialogTitle>
        </Dialog>
    )
}
export default GameEndDialog;