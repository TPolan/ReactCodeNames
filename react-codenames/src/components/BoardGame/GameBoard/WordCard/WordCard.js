import React, {useState} from 'react';
import {Button, Card, CardContent, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root_hidden: {
        minWidth: 180,
        maxWidth: 250,
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: 'black',
        backgroundColor: 'rgb(217,202,202)'
    },
    root_shown: {
        minWidth: 180,
        maxWidth: 250,
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: props => props.wordColor,
        backgroundColor: "gray"
    },

    title_hidden: {
        fontSize: 20,
        color: "black"
    },
    title_shown: {
        fontSize: 20,
        color: props => props.wordColor
    },
});

const WordCard = props => {
    const {word, index} = props;
    const classes = useStyles(props);
    const [shown, setShown] = useState(false)
    const handleWordClick = () => setShown(!shown);
    return (
        <Grid item key={`${word + index}`}>
            <Button onClick={handleWordClick}>
                <Card className={shown ? classes.root_shown : classes.root_hidden} variant="outlined">
                    <CardContent>
                        <Typography className={shown ? classes.title_shown : classes.title_hidden} color="textSecondary"
                                    gutterBottom>
                            {word}
                        </Typography>
                    </CardContent>
                </Card>
            </Button>
        </Grid>
    )
};

export default WordCard;