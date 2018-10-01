const camelCaseToRegularForm =(text) => {
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}

const customTrim = (text) => {
    return (text.trim().length > 0) ? text : text.trim();
}

const isEmpty = (text) => {
    return text.trim().length > 0
}

export {camelCaseToRegularForm, customTrim, isEmpty};