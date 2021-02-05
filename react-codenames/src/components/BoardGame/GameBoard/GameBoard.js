import React from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import GameEndDialog from "./GameEndDialog/GameEndDialog";
import {useDispatch, useSelector} from "react-redux";
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
    const dispatch = useDispatch();
    const classes = useStyles();
    const {gameCode, redTurn} = useSelector(state => state)
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
    // useEffect( ()=> {
    // }
    //     const checkUpdate = () => {
    //         axios.get(`https://reactcodenames-7a986.firebaseio.com/${gameCode}.json`)
    //             .then(response => dispatch(updateState(response.data)))
    //     };
    //     const updateInterval = setInterval(
    //         checkUpdate,1000
    //     )
    //     return ()=>{clearInterval(updateInterval)}
    // }, )

    return (
        <Grid className={switchVisuals()} direction={"row"} container justify={"space-between"}>
            {mappedBoard}
            <GameEndDialog/>
        </Grid>
    )
}

export default GameBoard;