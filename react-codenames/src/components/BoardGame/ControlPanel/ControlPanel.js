import React from 'react';
import {Button, ButtonGroup, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {passTurn, switchView} from "../../../redux/actions/actions";

const ControlPanel = () => {
    const spymasterOn = useSelector(state => state.spymaster);
    const dispatch = useDispatch();
    const pass = () => {
        dispatch(passTurn());
    };
    const changeView = () => {
        dispatch(switchView());
    }

    return (
        <Grid container justify={"space-evenly"}>
            <ButtonGroup>
                <Button onClick={changeView}>{
                    spymasterOn ?
                        'Spymaster view' :
                        'Player view'
                }
                </Button>
            </ButtonGroup>
            <Button onClick={pass}>Pass Turn</Button>
            <Button onClick={() => window.location.reload(false)}>Reset Game</Button>
        </Grid>
    )
}

export default ControlPanel;