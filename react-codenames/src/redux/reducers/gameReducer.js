const initialState = {
    cards: {
        red: 9,
        blue: 8,
        grey: 7,
        black: 1
    },
    gameOver: {
        redWins: false,
        blueWins: false,
        killer: false
    },
    redTurn: true

}

const gameReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
        case 'DECREMENT_COUNTER':
            return {
                ...state,
                cards: {
                    ...state.cards,
                [payload]: state.cards[payload] - 1
                }
            }
        case 'PASS_TURN':
            return {
                ...state,
                redTurn: !state.redTurn
            }
        case 'ENDGAME':
            return {

            }
        default:
            return state
    }
}
export default gameReducer;