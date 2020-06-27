import axios from 'axios'

export default axios.create({
    baseURL: 'https://saude-em-maos.herokuapp.com/',
  });