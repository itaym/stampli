import React from "react";

function getRadioButton(element, onChange, key) {
    const { data, label, index:checkedIndex } = element
    const values = (data || '').split('|')
    return (
        <fieldset key={key}>
            <label>{label}</label><br />
            {values.map((value, index) => {
                return (
                    <span  key={`${value}`}>
                    <input itemID={value}
                           onChange={onChange}
                           index={index}
                           checked={index === checkedIndex}
                           type={'radio'}
                           name='radio-group' />
                    <label htmlFor={value}>{value}</label><br />
                    </span>)
            })}
        </fieldset>)
}
function getTextInput(element, onChange, key) {
    const { data, label } = element
    return (
        <span key={key}>
            <label>{label}</label>
            <br />
            <input type={'text'} value={data} onChange={onChange} />
        </span>)
}
function getSelect(element, onChange, key) {
    const { data, label, index:selectedIndex } = element
    const values =  (data || '').split('|')
    return (
        <span key={key}>
            <label>{label}</label>
            <br />
            <select
                value={selectedIndex}
                onChange={onChange}>
                {values.map((value, index) => {
                    return (<option
                        key={index}
                        value={value}>{value}</option>)
                })}
            </select>
        </span>)
}
function getCheckBox(element, onChange, key) {
    const { data, label } = element
    return (
        <span key={key}>
             <label>{label}</label>
            <br />
            <input type={'checkbox'} checked={data==='true'} onChange={onChange} />
        </span>)
}

export default function getElement(element, onChange, key) {
    switch (element.type) {
        case 'RADIO_BUTTON':
            return getRadioButton(element, onChange, key)
        case 'TEXT_INPUT':
            return getTextInput(element, onChange, key)
        case 'SELECT':
            return getSelect(element, onChange, key)
        case 'CHECKBOX':
            return getCheckBox(element, onChange, key)
        default: return <span>&nbsp;</span>
    }
}