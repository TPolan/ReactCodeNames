import axios from "axios";

export const decrementCounter = cardType => {
    return {
        type: 'DECREMENT_COUNTER',
        payload: cardType
    }
};

export const passTurn = () => {
    return {
        type: 'PASS_TURN'
    }
};

export const endGame = triggerType => {
    return {
        type: 'END_GAME',
        payload: triggerType
    }
};


export const newGame = (payload) => {
    return {
        type: 'NEW_GAME',
        payload: {
            customWords: payload.customWords,
            gameCode: payload.gameCode
        }
    }

};

export const createNewGame = (payload) => {
    return dispatch => {
        axios.post(`https://reactcodenames-7a986.firebaseio.com/${payload.gameCode}.json`, payload)
            .then(response => console.log(response.data));

        dispatch(newGame(payload));
    }
};

export const switchView = () => {
    return {
        type: 'SWITCH_VIEW'
    }
}
