import axios from './Interceptor';

export default function getProduct(type = { type: '时令水果' }) {
  return axios.get('/getsidebar', {
    params: {
      ...type,
    },
  });
}
