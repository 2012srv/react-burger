import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-6119f-default-rtdb.firebaseio.com/'
})

export default instance;