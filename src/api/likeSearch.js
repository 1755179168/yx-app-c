import axios from './Interceptor';

export default function likeSearch(value) {
  return axios.get('/likeSearch', {
    params: {
      likeValue: value,
    },
  });
}
