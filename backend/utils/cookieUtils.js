/**
 * Cookie configuration helper
 * Generates correct options for setting token cookies
 */

// TTL constants
const ACCESS_TOKEN_TTL = 5 * 60 * 1000; // 5 minutes
const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 1000; // 30 days

/**
 * Generates cookie options based on environment and TTL
 * @param {number} maxAge - Cookie lifetime in milliseconds
 * @returns {Object} Cookie options object
 */
const getCookieOptions = (maxAge = REFRESH_TOKEN_TTL) => ({
    maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/'
});

/**
 * Sets httpOnly cookie for accessToken (short-lived)
 * @param {Object} res - Express response object
 * @param {string} accessToken - Token to set in cookie
 */
const setAccessTokenCookie = (res, accessToken) => {
    res.cookie('accessToken', accessToken, getCookieOptions(ACCESS_TOKEN_TTL));
};

/**
 * Sets httpOnly cookie for refreshToken (long-lived)
 * @param {Object} res - Express response object
 * @param {string} refreshToken - Token to set in cookie
 */
const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, getCookieOptions(REFRESH_TOKEN_TTL));
};

/**
 * Sets both accessToken and refreshToken cookies
 * @param {Object} res - Express response object
 * @param {string} accessToken - Access token
 * @param {string} refreshToken - Refresh token
 */
const setTokenCookies = (res, accessToken, refreshToken) => {
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
};

/**
 * Clears accessToken cookie
 * @param {Object} res - Express response object
 */
const clearAccessTokenCookie = (res) => {
    res.clearCookie('accessToken', getCookieOptions(0));
};

/**
 * Clears refreshToken cookie
 * @param {Object} res - Express response object
 */
const clearRefreshTokenCookie = (res) => {
    res.clearCookie('refreshToken', getCookieOptions(0));
};

/**
 * Clears both accessToken and refreshToken cookies
 * @param {Object} res - Express response object
 */
const clearTokenCookies = (res) => {
    clearAccessTokenCookie(res);
    clearRefreshTokenCookie(res);
};

module.exports = {
    getCookieOptions,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    setTokenCookies,
    clearAccessTokenCookie,
    clearRefreshTokenCookie,
    clearTokenCookies,
    ACCESS_TOKEN_TTL,
    REFRESH_TOKEN_TTL
};
