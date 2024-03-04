
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientComponent from './PatientComponent';
import CancelButton from './CancelButton';


function DoctorProfile({ accessToken }) {
    const history = useNavigate();
    const [docDetails, setDocDetails] = useState(null);
    const [appointmentRequest, setAppointmentRequest] = useState(null);
    const [popUp, setPopUp] = useState(false);
    const [data, setData] = useState({
        appointments: [
            {
                patientsDetails: {
                    name: "someone",
                    age: 21,
                },
                symptoms: ['chest pain', 'excessive cough'],
                status: 'checked',
                date: '22-02-24',
                labReport: {
                    description: "chest x-ray scan",
                    src: "/scans/Lungs_Train_15.jpg"
                },
                prescription: {
                    disease: "lung cancer",
                    description: "early stage, treatable",
                    medicines: [
                        {
                            name: "fyt6ioiu",
                            dosage: {
                                freq: '3 * day',
                                qtn: '1 tablet'
                            }
                        }
                    ]
                }
            },
            {
                patientsDetails: {
                    name: "Anonymous",
                    age: 25,
                },
                symptoms: ['swalling', 'bleeding'],
                status: 'checked',
                date: '22-02-24',
                labReport: {
                    description: "ct scan",
                    src: "/scans/Lungs_Train_15.jpg"
                },
                prescription: {
                    disease: "healthy",
                    description: "you are safe",
                    medicines: [
                        {
                            name: "ao8reo",
                            dosage: {
                                freq: '3 * day',
                                qtn: '1/2 tablet'
                            }
                        }
                    ]
                }
            }
        ]
    });

    useEffect(() => {
        (async function () {
            // fetch the patient details 
            let res1 = await fetch(' http://127.0.0.1:5000/details/doctor', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const res2 = await fetch(' http://127.0.0.1:5000/appointmentRequest', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })

            const jsonData1 = await res1.json();
            const jsonData2 = await res2.json();

            setDocDetails({ ...jsonData1.data });
            console.log(jsonData2.data)
            setAppointmentRequest([...jsonData2.data]);
        })()
    }, [])

    useEffect(() => {
        console.log(appointmentRequest)
    }, [appointmentRequest])


    async function acceptAppointment(e){
        const res=await fetch('http://127.0.0.1:5000/appointmentRequest/accept',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${accessToken}`
            },
            body:JSON.stringify({
                "patientEmail":e.target.dataset.patientEmail
            })
        })
        const data=await res.json();
        console.log(data);
    }

    async function rejectAppointment(e){
        const res=await fetch('http://127.0.0.1:5000/appointmentRequest/reject',{
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${accessToken}`
            },
            body:JSON.stringify({
                "patientEmail":e.target.dataset.patientEmail
            })
        })
        const data=await res.json();
        console.log(data);
    }

    return (
        <>
            <div className={`popup p-4 rounded absolute w-1/2 bg-gray-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${!popUp ? "hidden" : "grid"}`} >

                <CancelButton setState={setPopUp} />
                <div>
                    {
                        appointmentRequest && appointmentRequest.map(e => {
                            return (
                                <div >
                                    <div className="flex flex-col justify-between  mb-4">
                                        <div className="flex items-center">
                                            <span className="mr-2 font-bold">Name:</span>
                                            <span>{e.patientDetails.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-2 font-bold">Age:</span>
                                            <span>{e.patientDetails.age}</span>
                                        </div>
                                    </div>

                                    <div className="">
                                        <span className="mr-2 font-bold">Symptoms:</span>
                                        <div className="my-2">
                                            {e.symptoms.map((symptom, index) => (
                                                <span key={index} className="bg-gray-200  m-2 text-gray-800 rounded-md p-2 mb-2 border border-gray-400">
                                                    {symptom}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between  mb-4">
                                        <div className="flex items-center">
                                            <span className="mr-2 font-bold">Date:</span>
                                            <span>{e.date}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <button data-patientEmail={`${e.patientDetails.email}`} type="submit" onClick={(e)=>{rejectAppointment(e)}} className="hover:bg-slate-500 bg-red-600 text-white font-bold py-2 px-4 rounded mx-4 my-4">Reject</button>
                                        <button data-patientEmail={`${e.patientDetails.email}`} type="submit" onClick={(e)=>{acceptAppointment(e)}} className="hover:bg-slate-500 bg-green-600 text-white font-bold py-2 px-4 rounded mx-4 my-4">Accept</button>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
            </div>
            {
                docDetails ?
                    <>
                        <div className='mx-8 my-8 flex justify-between'>
                            <div>
                                <h2 className="text-2xl font-bold">Dr. {docDetails.name}</h2>
                                <h3 className="text-lg">{docDetails.specialization}</h3>
                            </div>
                            <button className='cursor-pointer' onClick={() => { setPopUp(true) }} >
                                <svg viewBox="0 0 24 24" width="32px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29664 4.72727V5.25342C6.60683 6.35644 4.7276 9.97935 4.79579 13.1192L4.79577 14.8631C3.4188 16.6333 3.49982 19.2727 6.93518 19.2727H9.29664C9.29664 19.996 9.57852 20.6897 10.0803 21.2012C10.582 21.7127 11.2625 22 11.9721 22C12.6817 22 13.3622 21.7127 13.8639 21.2012C14.3656 20.6897 14.6475 19.996 14.6475 19.2727H17.0155C20.4443 19.2727 20.494 16.6278 19.1172 14.8576L19.1555 13.1216C19.2248 9.97811 17.3419 6.35194 14.6475 5.25049V4.72727C14.6475 4.00395 14.3656 3.31026 13.8639 2.7988C13.3622 2.28734 12.6817 2 11.9721 2C11.2625 2 10.582 2.28734 10.0803 2.7988C9.57852 3.31026 9.29664 4.00395 9.29664 4.72727ZM12.8639 4.72727C12.8639 4.72727 12.8633 4.76414 12.8622 4.78246C12.5718 4.74603 12.2759 4.72727 11.9757 4.72727C11.673 4.72727 11.3747 4.74634 11.082 4.78335C11.0808 4.76474 11.0803 4.74603 11.0803 4.72727C11.0803 4.48617 11.1742 4.25494 11.3415 4.08445C11.5087 3.91396 11.7356 3.81818 11.9721 3.81818C12.2086 3.81818 12.4354 3.91396 12.6027 4.08445C12.7699 4.25494 12.8639 4.48617 12.8639 4.72727ZM11.0803 19.2727C11.0803 19.5138 11.1742 19.7451 11.3415 19.9156C11.5087 20.086 11.7356 20.1818 11.9721 20.1818C12.2086 20.1818 12.4354 20.086 12.6027 19.9156C12.7699 19.7451 12.8639 19.5138 12.8639 19.2727H11.0803ZM17.0155 17.4545C17.7774 17.4545 18.1884 16.5435 17.6926 15.9538C17.4516 15.6673 17.3233 15.3028 17.3316 14.9286L17.3723 13.0808C17.4404 9.99416 15.0044 6.54545 11.9757 6.54545C8.94765 6.54545 6.51196 9.99301 6.57898 13.0789L6.61916 14.9289C6.62729 15.303 6.49893 15.6674 6.25806 15.9538C5.76221 16.5435 6.17325 17.4545 6.93518 17.4545H17.0155ZM16.9799 3.20202C17.2945 2.74813 17.9176 2.63524 18.3715 2.94988C19.5192 3.74546 20.8956 5.65348 21.6471 7.9126C21.8214 8.43664 21.5379 9.00279 21.0139 9.17712C20.4898 9.35145 19.9237 9.06795 19.7493 8.5439C19.0892 6.55949 17.9221 5.07189 17.2321 4.59358C16.7782 4.27894 16.6653 3.65592 16.9799 3.20202ZM5.4303 2.94988C5.8842 2.63524 6.50722 2.74813 6.82185 3.20202C7.13649 3.65592 7.0236 4.27894 6.56971 4.59358C5.87969 5.07189 4.71256 6.55949 4.05242 8.5439C3.87809 9.06795 3.31194 9.35145 2.78789 9.17712C2.26384 9.00279 1.98034 8.43664 2.15467 7.9126C2.90619 5.65348 4.2826 3.74546 5.4303 2.94988Z" fill="#000000"></path> </g></svg>
                            </button>
                        </div>

                        <div>
                            {
                                data.appointments.map(e => {
                                    return <PatientComponent details={e} />
                                })
                            }
                        </div>
                    </>
                    :
                    ""
            }
        </>
    )
}

export default DoctorProfile
