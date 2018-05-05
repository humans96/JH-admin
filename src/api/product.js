import request from 'api/request';

import window from 'window';


// export const placeOrder = request('/placeOrder','POST');

export const allProduct = request('/allProduct');
export const getOrder = request('/order');
export const editProduct = request('/editProduct','POST');
export const addProduct = request('/addProduct','POST');
export const deleteProduct = request('/deleteProduct');
export const agreeOrder = request('/agreeOrder','POST');
export const agreeOrderError = request('/agreeOrderError','POST');
export const refuseOrder = request('/refuseOrder','POST');
