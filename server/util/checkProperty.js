function hasString(obj, field) {
    if(!obj.hasOwnProperty(field) || typeof(obj[field]) != 'string') {
        return false;
    }

    return true;
}

function hasDate(obj, field) {
    if(!obj.hasOwnProperty(field) || !(obj[field] instanceof Date)) {
        return false;
    }

    return true;
}

module.exports = {
    hasString,
    hasDate
}