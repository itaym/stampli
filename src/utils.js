function numericSort (a,b) {

    if (parseInt(a) > parseInt(b)) return 1
    if (parseInt(a) < parseInt(b)) return -1
    return 0
}

export {
    numericSort
}