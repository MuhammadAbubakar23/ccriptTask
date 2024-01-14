import http from './index';

const Appointments = {
    getAppointments: (token: string) => {
        return http.get(
            '/api/appointments',
            { headers: { Authorization: token } }
        )
            .then((res) => res.data);
    },
};

export default Appointments;
