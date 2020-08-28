import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getRowData } from "../redux/actions"
import './DataSource.css'

function DataSource (props) {

    const [value, setValue] = useState('')

    useEffect(() => {
        setValue(props.rowData)
    }, [props.rowData])

    const onChange = (e) => {
        const { dispatch } = props
        setValue(e.target.value)
        dispatch(getRowData(e.target.value))
    }
    return (
        <div className='data-source'>
            <textarea onChange={onChange} rows={15} value={value} />
        </div>
    )
}

const mapStateToProps = state => {
    return { rowData: state.rowData }
};

export default connect(mapStateToProps)(React.memo(DataSource))