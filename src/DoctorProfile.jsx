
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientComponent from './PatientComponent';


function DoctorProfile({ accessToken }) {
    const history = useNavigate();
    const [docDetails, setDocDetails] = useState(null);
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
            //fetch the patient details 
            // const res = await fetch('http://127.0.0.1:5000/details/doctor', {
            //   method: 'GET',
            //   headers: {
            //     'Authorization': `Bearer ${accessToken}`
            //   }
            // })
            // const data=await res.json();

            // console.log(data);
            let res = await fetch(' http://127.0.0.1:5000/details/doctor', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            const jsonData =await res.json();
            setDocDetails({...jsonData.data});
        })()
    }, [])

    useEffect(()=>{
        console.log(docDetails)
    },[docDetails])

    return (
        <>
            {
                docDetails ?
                    <>
                        <div className='mx-8 my-8'>
                            <h2 className="text-2xl font-bold">Dr. {docDetails.name}</h2>
                            <h3 className="text-lg">{docDetails.specialization}</h3>
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
