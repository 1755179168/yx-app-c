import axios from 'axios';

const Interceptor = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
});
Interceptor.interceptors.request.use((config) => {
  const newConfig = {
    ...config,
  };
  newConfig.params = {
    ...newConfig.params,
    appkey: '1755179168_1639361355771',
  };
  return newConfig;
});
Interceptor.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data;
  }
  return new Error(response.statusText);
}, (error) => Promise.reject(error.response.status));
export default Interceptor;
