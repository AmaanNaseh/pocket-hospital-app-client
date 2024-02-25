
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CancelButton from "./CancelButton";
import ShowPrescription from './ShowPrescription';



function PatientProfile({ accessToken }) {
  const history = useNavigate();
  const [popUp, setPopUp] = useState(-1);
  const [patientDetails, setPatientDetails] = useState({});
  const [appointments, setAppointments] = useState([
    {
      doctor: {
        name: "Dr.Pandey Thakur",
        specialization: "Cardiologist",
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
      doctor: {
        name: "Dijakstra Roeindger",
        specialization: "Othomologist",
      },
      symptoms: ['reddish eye', 'eye swelling'],
      status: 'prescribed',
      date: '22-02-24',
      labReport: {
        description: "eye rtc scan",
        src: "/scans/Lungs_Train_15.jpg"
      },
      prescription: {
        disease: "myopia",
        description: "-4, eye specs necessary",
        medicines: [
          {
            name: "carboxymethylcellulose",
            dosage: {
              freq: '4 * day',
              qtn: '1 drop each eye'
            }
          }
        ]
      }
    },
  ]);






  useEffect(() => {
    (async function () {
      //fetch the patient details 
      const res = await fetch('http://127.0.0.1:5000/details/patient', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      if (res.status > 200) {
        history('/');
      }
      const data = await res.json();
      console.log(data);
      setPatientDetails({ ...data.data })
    })()

  }, [])

  return (

    <>
      {patientDetails && patientDetails.name ?
        <div>
          <div className="mx-8 my-8">
            <h2 className="text-xl font-bold">Patient {patientDetails.name}</h2>
          </div>
          <button className="hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4">
            <Link to="/bookappointment">Book an appointment</Link>
          </button>
          <h3 className="text-lg font-semibold ml-4">Your Appointments</h3>
          <div className="currentAppointmentStatus">
            {appointments.map((e, i) => {
              return (
                <>
                  <div className={`popup p-4 rounded absolute bg-red-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${popUp === i ? "block" : "hidden"}`}>
                    <CancelButton setState={setPopUp} />
                    <div className="w-64">
                      <div className="flex justify-between mb-4">
                        <div>
                          <div className="font-bold">Name: {patientDetails.name}</div>
                          <div className="font-bold">Age: {patientDetails.age}</div>
                        </div>
                      </div>
                      {e.labReport.description &&
                        <div className="border-2 mb-4 bg-white">
                          <span className="font-bold">Description:</span>
                          <p>{e.labReport.description}</p>
                          <span className="font-bold">Report file:</span>
                          <img className="block w-32 h-32" src={e.labReport.src} alt="" />
                        </div>
                      }
                      {e.status === 'prescribed' && <ShowPrescription details={e.prescription} />}
                    </div>
                  </div>
                  <div className="mx-8 flex flex-wrap  items-center my-8">
                    <div className="w-full md:w-1/2 border-2 m-2 p-2 md:mb-0 md:mr-2 bg-gray-100">
                      <div className="font-bold">Doctor: {e.doctor.name}</div>
                      <div className="font-bold">Specialization: {e.doctor.specialization}</div>
                    </div>
                    <div className="w-full md:w-1/2 border-2 m-2 p-2 bg-gray-100">
                      <div className="font-bold">Symptoms:</div>
                      <div>
                        {e.symptoms.map((s, index) => (
                          <div key={index}>{s}</div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full border-2 p-2 md:ml-2 bg-gray-100">
                      <div className="font-bold">Status: {e.status}</div>
                      <div>{e.date}</div>
                      <button className="hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4" onClick={() => { setPopUp(i) }}>View more</button>
                    </div>
                  </div>
                </>
              )
            })}
          </div>


        </div>

        : ""
      }
    </>
  )
}

export default PatientProfile
