export const decrementCounter = cardType => {
    return {
        type: 'DECREMENT_COUNTER',
        payload: cardType
    }
}

export const passTurn = () => {
    return {
        type: 'PASS_TURN'
    }
}

export const endGame = () => {
    return {
        type: 'ENDGAME'
    }
}