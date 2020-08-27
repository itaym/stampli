export const GET_ROW_DATA = Symbol('GET_ROW_DATA')
export const GET_DATA = Symbol('GET_DATA')

export const getRowData = (rowData) => async (dispatch) => {
    dispatch({
        type: GET_ROW_DATA,
        payload: rowData
    })
}

export const getData = (data) => async (dispatch) => {
    dispatch({
        type: GET_DATA,
        payload: data
    })
}

