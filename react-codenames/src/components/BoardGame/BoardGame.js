import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import GameBoard from "./GameBoard/GameBoard";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import ControlPanel from "./ControlPanel/ControlPanel";
import {useSelector} from "react-redux";
import axios from 'axios';

const BoardGame = () => {
    const {words} = useSelector(state => state);
    const [board, setBoard] = useState([])
    useEffect(() => {
        axios.get()
        setBoard();
    }, [words])

    return (
        <Container fixed>
            <ScoreBoard/>
            <GameBoard board={board}/>
            <ControlPanel/>
        </Container>
    )
};

export default BoardGame;