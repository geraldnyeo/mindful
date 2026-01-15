// TODO: Import this from UserService
type userTypes = "admin" | "participant" | "volunteer" | null

/**
 * Redirect to /dashboard if the user is logged in
 * @returns {{ userType: userTypes }} The type of user
 */
function indexLoader(): { userType: userTypes } {
    return { userType: "admin" }
}

/**
 * Gets the user type for conditional loading
 * @returns {{ userType: userTypes }} The type of user
 */
function dashboardLoader(): { userType: userTypes } {
    return { userType: "admin" }
}

/**
 * Loader for /calendar
 * @returns events //todo
 */
function calendarLoader() {
    return {
	events: []
    }
}

export {
    indexLoader,
    dashboardLoader,
    calendarLoader
}