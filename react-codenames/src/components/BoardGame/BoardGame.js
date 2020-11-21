import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import GameBoard from "./GameBoard/GameBoard";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import ControlPanel from "./ControlPanel/ControlPanel";
import {useSelector} from "react-redux";

const BoardGame = () => {
    const {randomizedGameBoard} = useSelector(state => state);
    const [board, setBoard] = useState([])
    useEffect(() => {
        setBoard(randomizedGameBoard);
    }, [randomizedGameBoard])


    return (
        <Container fixed>
            <ScoreBoard/>
            <GameBoard board={board}/>
            <ControlPanel/>
        </Container>
    )
};

export default BoardGame;