import React from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import GameEndDialog from "./GameEndDialog/GameEndDialog";
import {useSelector} from "react-redux";
import WordCard from "./WordCard/WordCard";


const useStyles = makeStyles({
    redTurn: {
        borderStyle: "solid",
        borderColor: "red",
        borderWidth: 5,
    },
    blueTurn: {
        borderStyle: "solid",
        borderColor: "blue",
        borderWidth: 5,
    }
});

const GameBoard = props => {
    const classes = useStyles();
    const {redTurn} = useSelector(state => state)
    const switchVisuals = () => {
        if (redTurn) {
            return classes.redTurn;
        }
        return classes.blueTurn;
    }
    const mappedBoard = props.board.map((item, index) => {
            return (<WordCard
                word={item.word}
                index={index}
                color={item.color}
                isShown={item.isShown}
            />)
        }
    );

    return (
        <Grid className={switchVisuals()} direction={"row"} container justify={"space-between"}>
            {mappedBoard}
            <GameEndDialog/>
        </Grid>
    )
}

export default GameBoard;