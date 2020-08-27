import { serialize, deserialize } from './serialization'
import { GET_ROW_DATA, GET_DATA } from "./actions"

export default (state, action) => {

    switch (action.type) {
        case GET_ROW_DATA :
            return {
                ...state,
                data: serialize(action.payload),
            };
        case GET_DATA :
            return {
                ...state,
                rowData: deserialize(action.payload),
            };
        default:
            return state || {
                data: {},
                rowData: '',
            };
    }
}