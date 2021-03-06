const initialState = {
    documentId: null,
    redirect: null,
    wordMap: [],
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
    gameCode: '',
    words: [
        'Anglie', 'Nemecko', 'Francie', 'Amerika', 'Afrika',
        'Pilot', 'Psycholog', 'Podkova', 'Boty', 'Rukavice',
        'Šála', 'Stůl', 'Židle', 'Skříň', 'Svetr',
        'Postel', 'Vlk', 'Slon', 'Pes', 'Kočka',
        'Tank', 'Hora', 'Pošta', 'Karta', 'Planeta'
    ],
}

const gameReducer = (state = initialState, action) => {
    const {payload, type} = action;
    switch (type) {
        case 'DECREMENT_COUNTER':
            return {
                ...state,
                cards: {
                    ...state.cards,
                    ...payload.cards
                }
            }
        case 'UPDATE_WORD_MAP':
            return {
                ...state,
                wordMap: [...payload.wordMap]
            }
        case 'UPDATE_STATE':
            return {
                ...state,
                ...payload
            }
        case 'JOIN_GAME':
            return {
                ...payload
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
                gameOverTrigger: payload
            }
        case 'NEW_GAME':
            return {
                ...state,
                documentId:payload.documentId,
                redirect: payload.redirect,
                gameOver: false,
                words: [...payload.words],
                gameCode: payload.gameCode,
                wordMap: payload.wordMap,
                gameOverTrigger: payload.gameOverTrigger
            }
        case 'RESTART_GAME':
            return {
                ...state,
                gameOver: false,
                wordMap: payload.wordMap,
                gameOverTrigger: ''
            }
        case 'SWITCH_VIEW':
            return {
                ...state,
                spymaster: !state.spymaster
            }
        case 'CLOSE_LOBBY':
            return {
                ...initialState
            }
        default:
            return state
    }
}
export default gameReducer;