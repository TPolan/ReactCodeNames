import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {checkGameStatus} from "../../redux/actions/actions";

const GameMenu = props => {
    const dispatch = useDispatch();
    const [customWords, setCustomWords] = useState('');
    const [gameCode, setGameCode] = useState('');


    const startGame = wordPool => {
        dispatch(checkGameStatus({
            gameCode,
            customWords: wordPool.split(',')
        }));
        // props.history.push('/'+ gameCode);
        props.history.push('/game');
    };

    const handleChange = event => {
        setCustomWords(event.target.value);
    };

    const handleChangeCode = event => {
        setGameCode(event.target.value)
    };

    return (
        <Grid container justify={"center"} direction={'column'}>
            <Typography variant={"h2"}>React Codenames</Typography>
            <TextField
                id="outlined-basic"
                label="Choose game code"
                variant="outlined"
                value={gameCode}
                onChange={handleChangeCode}
            />
            <Button onClick={() => startGame(customWords)}>Start/Join Game</Button>
            <TextField
                variant={"outlined"}
                id="standard-multiline-flexible"
                label="Add custom words "
                multiline
                rowsMax={4}
                value={customWords}
                onChange={handleChange}
                helperText='Use comma to separate words'
            />

        </Grid>
    )
}

export default GameMenu;