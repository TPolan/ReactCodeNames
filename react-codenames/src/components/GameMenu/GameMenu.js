import React, {useState} from 'react';
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {checkGameStatus} from "../../redux/actions/actions";
import {Redirect} from "react-router";

const GameMenu = () => {
    const dispatch = useDispatch();
    const [customWords, setCustomWords] = useState('');
    const [gameCode, setGameCode] = useState('');
    const redirect = useSelector(state=> state.redirect);


    const startGame = wordPool => {
        dispatch(checkGameStatus({
            gameCode,
            customWords: wordPool.split(',')
        }));
    };

    const handleChange = event => {
        setCustomWords(event.target.value);
    };

    const handleChangeCode = event => {
        setGameCode(event.target.value)
    };

    if (redirect) {
        return <Redirect to={redirect}/>
    } else {
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
}

export default GameMenu;