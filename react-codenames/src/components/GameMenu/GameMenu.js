import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {newGame} from "../../redux/actions/actions";

const GameMenu = props => {
    const dispatch = useDispatch();
    const [customWords, setCustomWords] = useState('');
    const [gameCode, setGameCode] = useState('');


    const startGame = wordPool => {

        const payload = {
            customWords: wordPool.split(','),
            gameCode: gameCode
        }
        dispatch(newGame(payload));
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
                helperText='separated by comma'
            />

        </Grid>
    )
}

export default GameMenu;