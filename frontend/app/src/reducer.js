import { createStore } from 'redux'
import { ACTION_CHANGE_DATE } from './actions.js'


const initialState = {
    humidity: [],
    pressure: [],
    temp: [],
    date: [],
}



const rootReducer = (state = initialState, action) => {
    //  Принимает исходный стейт и действие
    //  Возвращает новый стейт.
    switch (action.type) {
        case ACTION_CHANGE_DATE:
            return {
                ...state,
                humidity: action.payload.humidity,
                pressure: action.payload.pressure,
                temp: action.payload.temp,
                date: action.payload.date,
            }
    }
    return state
}
export const store = createStore(rootReducer)