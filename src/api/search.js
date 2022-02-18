import axios from './Interceptor';

export default function (data) {
  return axios.get('/search', {
    params: {
      page: 1,
      size: 100,
      type: data,
    },
  });
}
