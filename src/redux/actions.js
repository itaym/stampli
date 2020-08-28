export const GET_ROW_DATA = Symbol('GET_ROW_DATA')
export const GET_DATA = Symbol('GET_DATA')

export const getRowData = (payload) => async (dispatch) => {
    dispatch({
        type: GET_ROW_DATA,
        payload
    })
}

export const getData = (payload) => async (dispatch) => {
    dispatch({
        type: GET_DATA,
        payload
    })
}

