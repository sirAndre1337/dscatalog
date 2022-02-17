import jwtDecode from "jwt-decode";

export const CLIENT_ID  = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

export type Role = "ROLE_OPERATOR" | "ROLE_ADMIN";

type AccessToken = {
    "exp": number;
    "user_name": string;
    "authorities": Role[];
}

export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
    const sessionData = localStorage.getItem('authData') ?? '{}';
    const parsedSessionData = JSON.parse(sessionData);
  
    return parsedSessionData as LoginResponse;
}

export const getAccessTokenDecode = () => {
    const sessionData = getSessionData();

    const tokenDecoded = jwtDecode(sessionData.access_token);
    return tokenDecoded as AccessToken;
}

export const isTokenValid = () => {
    const { exp } = getAccessTokenDecode();

    // Verifica se o token esta expirado
    if(Date.now() <= exp * 1000) {
        return true;
    }
    return false;
}

export const isAuthenticated = () => {
    const sessionData = getSessionData();

    // Verifica se o authData esta no localStore
    // Verifica se o token não esta expirado
    return sessionData.access_token && isTokenValid();
}

export const isAllowedByRole = (routeRoles: Role[] = []) => {
    if(routeRoles.length === 0) {
        return true;
    }

    const { authorities } = getAccessTokenDecode();
    // Verifica se as roles do usuario existem na role passada por parametro
    return routeRoles.some(role => authorities.includes(role));
}