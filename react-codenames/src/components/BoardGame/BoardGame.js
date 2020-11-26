import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import GameBoard from "./GameBoard/GameBoard";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import ControlPanel from "./ControlPanel/ControlPanel";
import {useSelector} from "react-redux";

const BoardGame = props => {
    const wordMap = useSelector(state => state.wordMap);
    const [board, setBoard] = useState([])
    useEffect(() => {
        setBoard(wordMap);
    }, [wordMap])


    return (
        <Container fixed>
            <ScoreBoard/>
            <GameBoard board={board}/>
            <ControlPanel history={props.history}/>
        </Container>
    )
};

export default BoardGame;