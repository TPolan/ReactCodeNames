import './App.css';
import React from 'react';
import BoardGame from "./components/BoardGame/BoardGame";
import {Container} from "@material-ui/core";
import GameMenu from "./components/GameMenu/GameMenu";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";

function App() {

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
