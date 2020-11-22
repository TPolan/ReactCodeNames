import React, {useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {closeLobby, newGame, passTurn, switchView} from "../../../redux/actions/actions";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const ControlPanel = props => {
    const gameOver = useSelector(state => state.gameOver)
    const {words,gameCode} = useSelector(state => state);
    const dispatch = useDispatch();
    const [switchOn, setSwitchOn] = useState(false);
    const pass = () => {
        dispatch(passTurn());

    };
    const handleChange = () => {
        setSwitchOn(!switchOn);
        dispatch(switchView());
    };
    const handleNewGame = () => {
        dispatch(newGame({words, gameCode}));
    };

    const handleCloseLobby = () => {
        props.history.push('/');
        dispatch(closeLobby());
    };

    return (
        <Grid container justify={"space-evenly"}>
            <FormControlLabel
                control={<Switch
                    checked={switchOn}
                    disabled={gameOver}
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />}
                label="Spymaster"
            />

            <Button onClick={pass}>Pass Turn</Button>
            <Button onClick={handleNewGame}>New Game</Button>
            <Button onClick={handleCloseLobby}>Close Lobby</Button>
        </Grid>
    )
}

export default ControlPanel;