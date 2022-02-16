import axios, { Method } from "axios";
import qs from 'qs';
import { CLIENT_ID, CLIENT_SECRET, getSessionData } from "./auth";

type RequestParams = {
    method?: Method;
    url: string;
    data?: object | string;
    params?: object;
}

type LoginData = {
    username: string;
    password: string;
}

const BASE_URL = 'http://localhost:8080';
const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

export const makeRequest = ({ method = 'GET', url , data , params }:RequestParams , req?:string) => {
    
    const sessionData = getSessionData();
    var headers = {}

    if (req === 'login') {
        headers = {
        Authorization: `Basic ${window.btoa(token)}`,
       'Content-Type': 'application/x-www-form-urlencoded'}
    }
    else if (req === 'addProduct') {
        headers = {
            Authorization: `Bearer ${sessionData.access_token}`}
    }    
        
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        params,
        headers : headers
    });
}

export const makeLogin = (loginData: LoginData , req:string) => {   

    const payload = qs.stringify({...loginData, grant_type: 'password'});

    return makeRequest({url: '/oauth/token', data: payload , method: 'POST'} , req);

}