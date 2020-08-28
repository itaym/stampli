import React, { useState, useMemo, useEffect } from 'react'
import { getData } from "../redux/actions"
import getElement from "./getElement";
import { numericSort } from "../utils";
import './Grid.css'
import {connect} from "react-redux";

const typesArray = ['RADIO_BUTTON', 'TEXT_INPUT', 'SELECT', 'CHECKBOX']

function Grid (props) {

    const [data, setData] = useState(props.data || {})
    const { showEmpty } = props;

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    function onItemChange(data, row, col) {
        const { dispatch } = props
        return function (e) {
            switch (e.target.type) {
                case 'checkbox':
                    data[row][col].data = (!!e.target.checked).toString()
                    break
                case 'radio':
                    data[row][col].index = parseInt(e.target.getAttribute('index'))
                    break
                case 'text':
                    data[row][col].data = e.target.value
                    break
                default:
                    // here is the select element
                    data[row][col].index = e.target.value
            }
            setData({...data})
            dispatch(getData(data))
        }
    }

    const colsAndRows = useMemo(() => {
        const cols = {}
        const rows = {}

        for (let row in data) {
            if (data.hasOwnProperty(row)) {
                for (let col in data[row]) {
                    if (data[row].hasOwnProperty(col)) {
                        if (typesArray.indexOf(data[row][col].type) > -1 || showEmpty) {
                            cols[col] = true
                            rows[row] = true
                        }
                    }
                }
            }
        }
        return {rows, cols}
    }, [data, showEmpty])


    return (
        <div className='grid'>
            <table style={{width: '100%'}} border={1} cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>row / column</th>
                        {(() => {
                            const cols = Object.keys(colsAndRows.cols).sort(numericSort)
                            return cols.map((col, index) => {
                                return <th key={index}>{col}</th>
                            })
                        })()}
                    </tr>
                </thead>
                <tbody>
                {(() => {
                    const rows = Object.keys(colsAndRows.rows).sort(numericSort)

                    return rows.map((row) => {
                        const cols = Object.keys(data[row]).sort(numericSort)
                        return (
                            <tr key={`row-${row}`} className={'row'}>
                                <th>{row}</th>
                                {cols.map((col) => {
                                    const element = data[row][col];
                                    if (colsAndRows.cols[col]) {
                                        return (<td key={`col-${col}`} className={'column'}>
                                            {getElement(
                                                element,
                                                onItemChange(data, row, col),
                                                `element-key-${row}-${col}`)}
                                        </td>)
                                    }
                                    return null
                                })}
                            </tr>
                        )
                    })
                })()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return { data: state.data }
};

export default connect(mapStateToProps)(React.memo(Grid))