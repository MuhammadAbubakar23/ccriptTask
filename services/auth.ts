import http from './index';

const Auth = {
    loginWithEmail: async (username: string, password: string) => {
        return http
            .post('/api/login', {
                username,
                password,
            })
            .then((res) => res.data);
    },
    getRefreshToken: async (token: string) => {
        return await http.post(
            '/api/refresh-token',
            { headers: { Authorization: token } }
        )
            .then((res) => res.data);
    },
};

export default Auth;
