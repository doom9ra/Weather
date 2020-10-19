export const ACTION_CHANGE_DATE = 'ACTION_CHANGE_DATE'

export const actionChangeValues = (newDateObj) => {
    // должен возвращать объект с которым мы будем делать диспатч
    return {
        type: ACTION_CHANGE_DATE,
        payload: newDateObj,
    }
}