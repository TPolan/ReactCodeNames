import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import GameBoard from "./GameBoard/GameBoard";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import ControlPanel from "./ControlPanel/ControlPanel";
import {useDispatch, useSelector} from "react-redux";
import {projectFirestore} from "../../firebase/config";
import {updateState} from "../../redux/actions/actions";


const BoardGame = props => {
    const {wordMap, documentId} = useSelector(state => state);
    const gameRef = projectFirestore.collection('Games').doc(documentId);
    const [board, setBoard] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        setBoard(wordMap);
    }, [wordMap])

    useEffect(() => {

        const unsub = gameRef.onSnapshot((snapshot) => {
            if (snapshot) {
                dispatch(updateState({...snapshot.data()}));
            } else {
                props.history.push('/');
            }
        })
        return () => unsub();

    }, []);
    console.log('rendered')

    return (
        <Container fixed>
            <ScoreBoard/>
            <GameBoard board={board}/>
            <ControlPanel history={props.history}/>
        </Container>
    )
};

export default BoardGame;

