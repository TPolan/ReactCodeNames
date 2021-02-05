import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import GameBoard from "./GameBoard/GameBoard";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import ControlPanel from "./ControlPanel/ControlPanel";
import {useDispatch, useSelector} from "react-redux";
import {projectFirestore} from "../../firebase/config";
import {updateState} from "../../redux/actions/actions";


const BoardGame = props => {
    const {wordMap, gameCode} = useSelector(state => state);
    const [board, setBoard] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        setBoard(wordMap);
    }, [wordMap])

    const gameRef = projectFirestore.collection(gameCode);
    gameRef.onSnapshot((snapshot) => {
        const newState = snapshot;
        // dispatch(updateState({...newState}));
        console.log(snapshot);
    })

    return (
        <Container fixed>
            <ScoreBoard/>
            <GameBoard board={board}/>
            <ControlPanel history={props.history}/>
        </Container>
    )
};

export default BoardGame;