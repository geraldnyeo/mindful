function hasString(obj: any, field: string) {
    if(!obj.hasOwnProperty(field) || typeof(obj[field]) != 'string') {
        return false;
    }

    return true;
}

function hasDate(obj: any, field: string) {
    if(!obj.hasOwnProperty(field) || !(obj[field] instanceof Date)) {
        return false;
    }

    return true;
}

export {hasString, hasDate};