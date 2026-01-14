type userTypes = "admin" | "participant" | "volunteer" | null

/**
 * Redirect to /dashboard if the user is logged in
 * @returns {{ userType: userTypes }} The type of user
 */
function indexLoader(): { userType: userTypes } {
  return { userType: "admin" }
}

/**
 * Redirects to /login if the user is not logged in
 * @returns {{ userType: userTypes }} The type of user
 */
function protectedRoute(): { userType: userTypes } {
  return { userType: "admin" }
}

/**
 * Redirects to /dashboard if the user is not admin
 */
function adminRoute() {
}

/**
 * Redirects to /dashboard if the user is not admin
 */
function participantRoute() {
}

/**
 * Redirects to /dashboard if the user is not admin
 */
function volunteerRoute() {
}

export {
    indexLoader,
    protectedRoute,
    adminRoute,
    participantRoute,
    volunteerRoute
}