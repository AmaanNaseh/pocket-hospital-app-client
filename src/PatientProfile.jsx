
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CancelButton from "./CancelButton";
import ShowPrescription from './ShowPrescription';



function PatientProfile({ accessToken }) {
  const history = useNavigate();
  const [popUp, setPopUp] = useState(-1);
  const [patientDetails, setPatientDetails] = useState({
    name: "Amaan Nashe",
    age: '44',
    gender: 'Not Specified',
    email: 'junk@mail.com',
    phone: '1234567890',
    address: {
      'stree': 'gali 10',
      'locality': 'zakir nagar',
      'city': 'new delhi',
      'state': 'delhi',
      'pin': '110025'
    }
  });
  const [currentAppointment, setCurrentAppointment] = useState({
    symptoms: ['chest pain', 'excessive cough'],
    doctor: {
      name: 'Dr. Amaan Nashe',
      specialization: 'Pulmonologist'
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
        },
        {
          name: "fyt6ioiu",
          dosage: {
            freq: '3 * day',
            qtn: '1 tablet'
          }
        }
      ]
    }

  })
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
          },
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
    // (async function () {
    //   //fetch the patient details 
    //   const res = await fetch('http://127.0.0.1:5000/details/patient', {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${accessToken}`
    //     }
    //   })
    //   if (res.status > 200) {
    //     history('/');
    //   }
    //   const data = await res.json();
    //   console.log(data);
    //   setPatientDetails({ ...data.data })
    // })()

  }, [])

  return (

    <>

      <div className='grid grid-rows-3 grid-cols-3 gap-8  p-8'>
        <div className='bg-lime-50  p-6 rounded text-gray-600'>
          <h1 className='text-2xl first-letter:text-6xl mb-2'>Patient Details</h1>
          {
            Object.keys(patientDetails).map(key => {
              if (key == 'address') {
                let str = ""
                for (let k in patientDetails['address']) {
                  str += patientDetails['address'][k]
                  if (k !== 'pin') {
                    str += ', '
                  }
                }
                return <div className='flex'><span className=' w-1/4 capitalize font-medium subpixel-antialiased '>{key}</span> <span className='capitalize font-light subpixel-antialiased'>{str}</span></div>
              }
              return <div className='flex'><span className='w-1/4 capitalize  font-medium subpixel-antialiased'>{key}</span> <span className='capitalize font-light subpixel-antialiased'>{patientDetails[key]}</span></div>
            })
          }
        </div>

        <div className='bg-blue-50   p-6 rounded text-gray-600'>
          <h1 className='text-2xl first-letter:text-6xl mb-2'>Appointments</h1>
          <div className='flex items-center justify-center'>
            <button type="button" class="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{history('/bookappointment')}}>Book now</button>
          </div>
        </div>

        <div className='bg-violet-50   p-6 rounded text-gray-600'>
          {/* <h1 className='text-2xl first-letter:text-6xl mb-2'>Chat</h1> */}
          <div className='flex  flex-col items-center justify-center'>
            <div>
              <a href="https://chat.openai.com/" target="_blank"type="button" className=" text-violet-700 transition-all  border border-violet-700 hover:p-2.5 hover:text-white focus:ring-4 focus:outline-none focus:ring-violet-300  rounded-full  p-2 text-center inline-flex items-center dark:border-violet-500 dark:text-violet-500 dark:hover:text-white dark:focus:ring-violet-800 dark:hover:bg-violet-500 ">

                <svg viewBox="0 0 24 24" width="32px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M13.6288 20.4718L13.0867 21.3877C12.6035 22.204 11.3965 22.204 10.9133 21.3877L10.3712 20.4718C9.95073 19.7614 9.74049 19.4063 9.40279 19.2098C9.06509 19.0134 8.63992 19.0061 7.78958 18.9915C6.53422 18.9698 5.74689 18.8929 5.08658 18.6194C3.86144 18.1119 2.88807 17.1386 2.3806 15.9134C2 14.9946 2 13.8297 2 11.5V10.5C2 7.22657 2 5.58985 2.7368 4.38751C3.14908 3.71473 3.71473 3.14908 4.38751 2.7368C5.58985 2 7.22657 2 10.5 2H13.5C16.7734 2 18.4101 2 19.6125 2.7368C20.2853 3.14908 20.8509 3.71473 21.2632 4.38751C22 5.58985 22 7.22657 22 10.5V11.5C22 13.8297 22 14.9946 21.6194 15.9134C21.1119 17.1386 20.1386 18.1119 18.9134 18.6194C18.2531 18.8929 17.4658 18.9698 16.2104 18.9915C15.36 19.0061 14.9349 19.0134 14.5972 19.2098C14.2595 19.4062 14.0492 19.7614 13.6288 20.4718Z" fill="#8251b3" ></path> <path d="M7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H16C16.4142 8.25 16.75 8.58579 16.75 9C16.75 9.41421 16.4142 9.75 16 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9Z" fill="#8251b3" ></path> <path d="M7.25 12.5C7.25 12.0858 7.58579 11.75 8 11.75H13.5C13.9142 11.75 14.25 12.0858 14.25 12.5C14.25 12.9142 13.9142 13.25 13.5 13.25H8C7.58579 13.25 7.25 12.9142 7.25 12.5Z" fill="#8251b3" ></path> </g></svg>
              </a>
              <a href="https://chat.openai.com/" target="_blank" className='block underline cursor-pointer text-xl first-letter:text-4xl mt-2'>Chat</a>
            </div>

            <div className='mt-4 text-center'>

              <button type="button" class="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Locate</button>
              <p>check near by hospital</p>
            </div>
          </div>
        </div>

        <div className='bg-white flex flex-col gap-2 p-6 rounded text-gray-600'>
          <h1 className='text-2xl first-letter:text-6xl mb-2'>Current Appointment Details</h1>
          <div className='flex items-center gap-2'>

            <span className='w-1/4 capitalize  font-medium subpixel-antialiased'>Symptoms</span>
            {
              currentAppointment.symptoms.map((e) => {
                return <span className='p-4 border border-gray-200 rounded'>{e}</span>
              })
            }
          </div>

          <div>
            <span className='w-1/4 inline-block capitalize  font-medium subpixel-antialiased'>Disease</span>
            <span className='capitalize  font-light subpixel-antialiased'>{currentAppointment.prescription.disease} <br />
              {currentAppointment.prescription.description}
            </span>
          </div>
          <div>
            <span className='w-1/4 inline-block capitalize  font-medium subpixel-antialiased'>Docotor</span>
            <span className='capitalize  font-light subpixel-antialiased'>{currentAppointment.doctor.name}
              <span className='pl-4'>
                {currentAppointment.doctor.specialization}
              </span>
            </span>
          </div>

          <div>
            <span className='w-1/4 inline-block capitalize  font-medium subpixel-antialiased'>Medications</span>
            {
              currentAppointment.prescription.medicines.map(e => {
                return <div className=' flex justify-between '><span className='border border-gray-200 rounded p-2'>{e.name}</span> <span className='border border-gray-200 rounded p-2'>{e.dosage.freq}</span> <span className='border border-gray-200 rounded p-2'>{e.dosage.qtn}</span></div>
              })
            }
          </div>

        </div>

        <div className='  p-6 rounded text-gray-600'>
          <h1 className='text-2xl first-letter:text-6xl mb-2'>Downloads</h1>
          <div className='flex cursor-pointer m-2 border border-gray-200 rounded p-2'><button className='uppercase  font-light subpixel-antialiased'>Prescription</button> </div>
          <div className='flex m-2  cursor-pointer border border-gray-200 rounded p-2'><button className='uppercase  font-light subpixel-antialiased'>Bill</button> </div>
          <div className='flex m-2 cursor-pointer border border-gray-200 rounded p-2'><button className='uppercase  font-light subpixel-antialiased'>Report</button> </div>
        </div>

      </div>
      {/* {patientDetails && patientDetails.name ?
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
      } */}
    </>
  )
}

export default PatientProfile
