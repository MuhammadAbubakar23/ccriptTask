'use client'
import React, { useEffect, useState } from 'react';
import { useAdmin } from '../../context/auth';
import Appointments from '../../services/appointments';
import Image from 'next/image';
import Link from 'next/link';
import MoreAppointments from './moreAppointments ';
import Auth from '../../services/auth';

const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
]

const Index = () => {

    const { token } = useAdmin();
    const [table, setTable] = useState<any>(null);
    const [moreAppointments, setMoreAppointments] = useState<any>(null)

    const tableHandler = (values: any) => {

        let table: any = {};
        let appointments = Object.values(values).slice(0, -2);
        let MIN_HOUR = values.MIN_HOUR;
        let MAX_HOUR = values.MAX_HOUR;

        for (let hour = MIN_HOUR; hour <= MAX_HOUR; hour++) {
            table[
                hour > 12
                    ? `${hour - 12} PM`
                    : hour === 12
                        ? '12 PM'
                        : `${hour} AM`
            ] = {};
        }

        const tablesKeys = Object.keys(table);
        for (let i = 0; i < tablesKeys.length; i++) {
            for (const day of Days) {
                table[tablesKeys[i]][day] = [];
            }
        }

        appointments.forEach((appointment: any) => {
            const startHour = parseInt(appointment.startTimeFormatted, 10);
            const endHour = parseInt(appointment.endTimeFormatted, 10);

            const currentRecord = table[appointment.startTimeFormatted][appointment.weekDay];
            const currentRecordLength = table[appointment.startTimeFormatted][appointment.weekDay].length;


            table[appointment.startTimeFormatted][appointment.weekDay] = [(
                <td key={currentRecordLength + 1} rowSpan={endHour - startHour + 1}>
                    <div
                        className={`w-[160px] rounded-2xl bg-[#58c3ff69] border-2 border-[#58c3ffed] flex flex-col justify-center items-center py-4 px-2`}
                    >
                        <p className="w-[110px] text-center font-bold mb-3 line-clamp-2 text-[20px]">{appointment.name}</p>
                        <p className='mb-2 text-[10px]'>Reason</p>
                        <p className='w-[110px] text-center line-clamp-4 text-[16px]'>{appointment.reason}</p>
                        <p className='w-[110px] text-center line-clamp-4 text-[16px]'>{appointment.startTimeFormatted} - {appointment.endTimeFormatted}</p>
                    </div>
                </td>
            ),
            ...(currentRecord ? currentRecord : [])
            ];

        });

        setTable(table)
    }

    const fetchAppointmets = async () => {
        try {
            if (token) {
                const data = await Appointments.getAppointments(token);
                tableHandler(data);
            }
        } catch (e: any) {
            if (e.response.data === 'Token expired') {
                const response = await Auth.getRefreshToken(token || '');
                console.log({ response })
            }
        }
    }

    const closeModalHandler = () => {
        setMoreAppointments(null);
    }

    useEffect(() => {
        fetchAppointmets();
    }, [token])

    return (
        <>
            <div className='flex justify-between items-center px-[55px] shadow-[0_0_16px_0_#D9D9D9] bg-[#fff] py-7'>
                <div>
                    <Image
                        src={'/ccriptLogoGreen.svg'}
                        alt={'Ccript Logo Green'}
                        width={150}
                        height={50}
                    />
                </div>
                <Link href={'/'}>
                    <Image
                        src={'/signout.svg'}
                        alt={'Ccript Logo Green'}
                        width={45}
                        height={45}
                    />
                </Link>
            </div>
            {table
                ? (<table className="border-collapse border rounded-2xl mx-auto mt-[70px]" style={{ position: 'relative' }}>
                    <thead>
                        <tr>
                            <th className="border p-2">
                                <svg
                                    className='cursor-pointer'
                                    onClick={() => fetchAppointmets()}
                                    xmlns="http://www.w3.org/2000/svg" width="140" height="60" viewBox="0 0 140 60" fill="none">
                                    <path d="M60.0024 40H66.2516V39.2725M66.2516 39.2725C64.1995 38.4427 62.4807 36.9554 61.3645 35.0437C60.2483 33.132 59.7979 30.904 60.0838 28.7088C60.3696 26.5136 61.3757 24.4753 62.9442 22.9133C64.5128 21.3513 66.5552 20.3539 68.7513 20.0775M66.2516 39.2725V33.75M80 20H73.7507V20.7262M73.7507 20.7262C75.8016 21.5573 77.5191 23.045 78.6343 24.9565C79.7495 26.868 80.1994 29.0953 79.9136 31.2899C79.6278 33.4844 78.6225 35.5223 77.055 37.0843C75.4875 38.6464 73.4463 39.6446 71.251 39.9225M73.7507 20.7262V26.25" stroke="#0AA36E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </th>
                            {Days.map((day) => (
                                <th key={day} className="border p-2 w-[160px] text-black text-center font-rajdhani text-22 font-bold leading-22">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table !== null &&
                            Object.keys(table).map((hour, index) => (
                                <tr key={hour} className="border">
                                    <td className="p-2 w-[160px] text-black text-center font-rajdhani text-22 font-bold leading-22">{hour}</td>
                                    {Object.keys(table[hour]).map((day) => (
                                        <td
                                            key={day}
                                            className={`relative overflow-hidden border ${table[hour][day].length > 1 ? 'bg-[#58c3ff69]' : ''}`}
                                        >
                                            {table[hour][day].length > 1
                                                ? <div
                                                    onClick={() => setMoreAppointments(table[hour][day])}
                                                >
                                                    <p className='text-center cursor-pointer'>{`See more ${table[hour][day].length - 1}+`}</p>
                                                </div>
                                                : <div
                                                    className='cursor-pointer absolute top-0 !py-0'
                                                    onClick={() => setMoreAppointments(table[hour][day])}
                                                >
                                                    {table[hour][day]}
                                                </div>
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>)
                : null
            }
            {
                moreAppointments
                    ? <MoreAppointments appointmentJsx={moreAppointments} handler={closeModalHandler} />
                    : null
            }
        </>
    );
}

export default Index;