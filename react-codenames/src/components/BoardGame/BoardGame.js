import React from 'react';
import {Container} from "@material-ui/core";
import GameBoard from "./GameBoard/GameBoard";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import ControlPanel from "./ControlPanel/ControlPanel";

const BoardGame = () => {

    return (
        <Container fixed>
            <ScoreBoard/>
            <GameBoard/>
            <ControlPanel/>
        </Container>
    )
}

export default BoardGame;