import axiosOrig from 'axios';

const axios = axiosOrig.create({
  withCredentials: true,
  maxRedirects: 0,
});

axios.defaults.baseURL = 'http://localhost:9000';

export { axios };
