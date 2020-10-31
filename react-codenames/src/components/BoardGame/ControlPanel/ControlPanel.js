import React, {useState} from 'react';
import {Button, Grid} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {passTurn, switchView} from "../../../redux/actions/actions";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const ControlPanel = () => {
    const dispatch = useDispatch();
    const [switchOn, setSwitchOn] = useState(false);
    const pass = () => {
        dispatch(passTurn());

    };
    const handleChange = () => {
        setSwitchOn(!switchOn);
        dispatch(switchView());
    };

    return (
        <Grid container justify={"space-evenly"}>
            <FormControlLabel
                control={<Switch
                    checked={switchOn}
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />}
                label="Spymaster"
            />

            <Button onClick={pass}>Pass Turn</Button>
            <Button onClick={() => window.location.reload(false)}>Reset Game</Button>
        </Grid>
    )
}

export default ControlPanel;