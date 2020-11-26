import './App.css';
import React from 'react';
import BoardGame from "./components/BoardGame/BoardGame";
import {Container} from "@material-ui/core";
import GameMenu from "./components/GameMenu/GameMenu";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
// import {useSelector} from "react-redux";

function App() {
    // const gameCode = useSelector(state => state.gameCode);

    return (
        <div className="App">
            <BrowserRouter>
                <Container fixed>
                    <Route
                        path='/'
                        component={GameMenu}
                        exact
                    />
                    <Route
                        path='/game'
                        component={BoardGame}
                        exact
                    />
                </Container>
            </BrowserRouter>
        </div>
    );
}


export default App;
