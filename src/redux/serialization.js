const DATA_ENUM = Object.freeze({
    LINE_NO: 0,
    COLUMN_NO: 1,
    ELEMENT_LABEL: 2,
    ELEMENT_TYPE: 3,
    INIT_VALUE: 4,
    INDEX_VALUE: 5,
});
const typesArray = ['RADIO_BUTTON', 'TEXT_INPUT', 'SELECT', 'CHECKBOX']

function serialize (rowData) {
    const objData = {}

    const arrData = rowData.split('\n')
    let minLine = Number.MAX_SAFE_INTEGER
    let maxLine = Number.MIN_SAFE_INTEGER
    let minColumn = Number.MAX_SAFE_INTEGER
    let maxColumn = Number.MIN_SAFE_INTEGER

    arrData.forEach((dataLine) => {
        try {
            const tmpArray = dataLine.split(';')

            let row = parseInt(tmpArray[DATA_ENUM.LINE_NO].toString().trim())
            let col = parseInt(tmpArray[DATA_ENUM.COLUMN_NO].toString().trim())

            if (!(!isNaN(row) && !isNaN(col) && typesArray.indexOf(tmpArray[DATA_ENUM.ELEMENT_TYPE]) > -1)) return
            if (maxLine < row) maxLine = row
            if (minLine > row) minLine = row
            if (maxColumn < col) maxColumn = col
            if (minColumn > col) minColumn = col

            if (!objData[row]) objData[row] = {}

            objData[row][col] = {
                label: tmpArray[DATA_ENUM.ELEMENT_LABEL].toString().trim(),
                type: tmpArray[DATA_ENUM.ELEMENT_TYPE].toString().trim(),
                data: tmpArray[DATA_ENUM.INIT_VALUE]?.toString().trim(),
                index: tmpArray[DATA_ENUM.INDEX_VALUE] ?
                    !isNaN(tmpArray[DATA_ENUM.INDEX_VALUE]) ?
                        parseInt(tmpArray[DATA_ENUM.INDEX_VALUE].toString().trim()) :
                        tmpArray[DATA_ENUM.INDEX_VALUE].toString().trim() :
                    undefined,
            }
        }
        catch {}
    })

    for (let line = minLine; line <= maxLine; line++) {
        if (!objData[line]) {
            objData[line] = {}
        }
        for (let emptyCol = minColumn; emptyCol <= maxColumn; emptyCol++) {
            if (!objData[line][emptyCol]) {
                objData[line][emptyCol] = {}
            }
        }
    }

    return objData
}

function deserialize (data) {
    let result = '';
    const rows = Object.keys(data)

    rows.forEach((row) => {
        const cols = Object.keys(data[row])
        cols.forEach((col) => {
            //simple compare
            if (!(JSON.stringify(data[row][col]) === JSON.stringify({}))) {
                const e = data[row][col]
                if (result !== '') result += '\n'
                result += `${row};${col};${e.label};${e.type};${e.data}`
                if (e.index !== undefined && ((e.type === 'RADIO_BUTTON') || (e.type === 'SELECT'))) {
                    result += `;${e.index}`
                }
            }
        })
    })
    return result
}
export {
    DATA_ENUM,
    serialize,
    deserialize
}