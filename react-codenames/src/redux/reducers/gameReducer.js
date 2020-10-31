const initialState = {
    cards: {
        red: 9,
        blue: 8,
        grey: 7,
        black: 1
    },
    gameOver: false,
    gameOverTrigger: '',
    redTurn: true,
    spymaster: false,
    words: []
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
        case 'END_GAME':
            return {
                ...state,
                gameOver: true,
                gameOverTrigger: action.payload
            }
        case 'NEW_GAME':
            return {
                ...state,
                gameOver: true,
                gameOverTrigger: action.payload
            }
        case 'SWITCH_VIEW':
            return {
                ...state,
                spymaster: !state.spymaster
            }
        default:
            return state
    }
}
export default gameReducer;