import axios from './Interceptor';

export default function getGoodsList(data = { type: 2, page: 1, size: 1000 }) {
  return axios.get('/getGoodsList', {
    params: {
      ...data,
    },
  });
}
