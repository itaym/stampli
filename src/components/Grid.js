import React, { useState, useMemo, useEffect } from 'react'
import { getData } from "../redux/actions"
import getElement from "./getElement";
import { numericSort } from "../utils";
import './Grid.css'
import {connect} from "react-redux";

const typesArray = ['RADIO_BUTTON', 'TEXT_INPUT', 'SELECT', 'CHECKBOX']
function Grid (props) {

    const [data, setData] = useState(props.data || {})
    const keys = Object.keys(data).sort(numericSort);

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    function onItemChange(data, line, col) {
        const { dispatch } = props
        return function (e) {
            switch (e.target.type) {
                case 'checkbox':
                    data[line][col].data = (!!e.target.checked).toString()
                    break
                case 'radio':
                    data[line][col].index = parseInt(e.target.getAttribute('index'))
                    break
                case 'text':
                    data[line][col].data = e.target.value
                    break
                default:
                    // here is the select element
                    data[line][col].index = e.target.value
            }
            setData({...data})
            dispatch(getData(data))
        }
    }

    const headerCols = useMemo(() => {
        const headerCols = {}

        for (let row in data) {
            if (data.hasOwnProperty(row)) {
                for (let col in data[row]) {
                    if (data[row].hasOwnProperty(col)) {
                        if (typesArray.indexOf(data[row][col].type) > -1) {
                            headerCols[col] = true
                        }
                    }
                }
            }
        }
        return headerCols
    }, [data])


    return (
        <div className='grid'>
            Table:
            <table style={{width: '100%'}} border={1} cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Line / column</th>
                        {keys[0] ?
                            (() => {
                                const cols = Object.keys(headerCols)
                                return cols.map((col, index) => {
                                    return <th key={index}>{col}</th>
                                })
                            })()
                        :null}
                    </tr>
                </thead>
                <tbody>
                {keys.map((line) => {
                    const cols = Object.keys(data[line]).sort(numericSort)
                    return (
                        <tr key={`line-${line}`} className={'line'}>
                            <th>{line}</th>
                            {cols.map((col) => {
                                const element = data[line][col];
                                if (headerCols[col]) {
                                    return (<td key={`col-${col}`} className={'column'}>
                                        {getElement(
                                            element,
                                            onItemChange(data, line, col),
                                            `element-key-${line}-${col}`)}
                                    </td>)
                                }
                                return null
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => {
    return { data: state.data }
};

export default connect(mapStateToProps)(React.memo(Grid))