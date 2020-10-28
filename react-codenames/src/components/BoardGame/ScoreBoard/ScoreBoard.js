import React from 'react';
import {Grid, Typography} from "@material-ui/core";

const ScoreBoard = props => {

    const redTeamCounter = 9;
    const blueTeamCounter = 8;

    return (
        <Grid container justify={"center"}>
            <Grid item container justify={"space-around"}>
                <Typography item style={{color: 'red'}} variant={"h2"}>
                    {redTeamCounter}
                </Typography>
                <Typography item style={{color: 'blue'}} variant={"h2"}>
                    {blueTeamCounter}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ScoreBoard;