
interface Props {
    appointmentJsx: any
    handler: () => void
}


const MoreAppointments = ({ appointmentJsx, handler }: Props) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-x-hidden">
            <div className="bg-white p-8 rounded shadow-lg">
                <div className="flex flex-wrap gap-2 max-w-[600px] max-h-[500px] overflow-y-auto">
                    {appointmentJsx}
                </div>
                <button
                    type="button"
                    onClick={handler}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mx-auto w-full"
                >
                    Close Modal
                </button>
            </div>
        </div>

    );
}

export default MoreAppointments;