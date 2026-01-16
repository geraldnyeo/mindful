/**
 * Input Filtering allowing some special characters
 * @param s string: text string to filter
 * @return boolean: true if input is safe
 */
function filter_input_special(s: string): boolean {
    const r = /^[a-zA-Z0-9_\-\=\+`~!@#\$%\^&\*.,? ]*$/;
    return r.test(s);
}

/**
 * Input Filtering for Emails
 * @param s string: text string to filter
 * @return boolean: true if input is safe
 */
function filter_input_email(s: string): boolean {
    const r = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return r.test(s);
}

export {
    filter_input_special,
    filter_input_email
}
