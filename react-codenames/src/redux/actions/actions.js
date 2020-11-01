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

export const switchView = () => {
    return {
        type: 'SWITCH_VIEW'
    }
}
