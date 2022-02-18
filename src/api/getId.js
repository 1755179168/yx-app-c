import axios from './Interceptor';

export default function getId(data) {
  return axios.get('/getGoodsByIds', {
    params: {
      value: data,
    },
  });
}
