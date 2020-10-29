import React from 'react';
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {passTurn} from "../../../redux/actions/actions";

const ControlPanel = props => {

    const dispatch = useDispatch();
    const pass = () => {
        dispatch(passTurn);
    };

    return (
        <Grid container justify={"space-evenly"}>
            <ButtonGroup>
                <Button>Guesser</Button>
                <Button>Spymaster</Button>
            </ButtonGroup>
            <Button onClick={pass}>Pass Turn</Button>
            <Button onClick={() => window.location.reload(false)}>Reset Game</Button>
        </Grid>
    )
}

export default ControlPanel;