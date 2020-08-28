import React from "react";

function getRadioButton(element, onChange, key) {
    const { data, label, index:checkedIndex } = element
    const values = (data || '').split('|')
    return (
        <fieldset key={key}>
            {values.map((value, index) => {
                return (
                    <span  key={`${value}`}>
                    <input itemID={value}
                           onChange={onChange}
                           index={index}
                           checked={index === checkedIndex}
                           type={'radio'}
                           name='radio-group' />
                    <label htmlFor={value}>{value}</label>
                    </span>)
            })}
            <h4>{label}</h4>
        </fieldset>)
}
function getTextInput(element, onChange, key) {
    const { data, label } = element
    return (
        <span key={key}>
            <input type={'text'} value={data} onChange={onChange} />
             <h4>{label}</h4>
        </span>)
}
function getSelect(element, onChange, key) {
    const { data, label, index:selectedIndex } = element
    const values =  (data || '').split('|')
    return (
        <span key={key}>
            <select
                value={selectedIndex}
                onChange={onChange}>
                {values.map((value, index) => {
                    return (<option
                        key={index}
                        value={value}>{value}</option>)
                })}
            </select>
             <h4>{label}</h4>
        </span>)
}
function getCheckBox(element, onChange, key) {
    const { data, label } = element
    return (
        <span key={key}>
            <input type={'checkbox'} checked={data==='true'} onChange={onChange} />
            <h4>{label}</h4>
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