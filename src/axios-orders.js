import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-app-caee4.firebaseio.com/'
});

export default instance;