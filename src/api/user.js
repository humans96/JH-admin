import request from 'api/request';

import window from 'window';


// export const placeOrder = request('/placeOrder','POST');

export const allUser = request('/allUser');
export const check = request('/check');
export const register = request('/register','POST');
export const editUser = request('/editUser','POST');
export const deleteUser = request('/deleteUser');
// export const refuseOrder = request('/refuseOrder','POST');
