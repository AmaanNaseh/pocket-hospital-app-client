import react, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const specialist = [
    'cardiologist',
    'pulmonologist',
    'othopaedic',
    'neurologist'
]

const BookAppointment = ({ accessToken }) => {
    const history = useNavigate();
    const [date, setDate] = useState("");
    const [doctor, setDoctor] = useState("");
    const [symptoms, setSysmptoms] = useState([]);
    const [temp, setTemp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            doctor,
            symptoms,
            date
        }
        const res = await fetch('http://127.0.0.1:5000/bookappointment', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(payload)
        });
        if (res.status == 200) {
            const data = await res.json();
            console.log(data)
        }
    }

    const handleSymptomInsertion = (e) => {
        if (e.keyCode == 32) {
            setTemp("");
            setSysmptoms([...symptoms, temp])
        }
    }

    useEffect(() => {
        console.log(temp)
    }, [symptoms])
    return (
        <>
            <div className="px-4 mx-auto max-w-xl my-10 space-y-2">

                <form action="" onSubmit={handleSubmit}>
                    <h1 className="text-black text-3xl font-bold" >Book appointment</h1>
                    <div>
                        <label htmlFor="">Specialist</label>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => { setDoctor(e.target.value) }}>
                            <option value="none" >none</option>
                            {
                                specialist.map((e) => {
                                    return (
                                        <option value={e} >{e}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="">symptoms</label>
                        <div className=" py-1">
                            {
                                symptoms.map(e => {
                                    return (
                                        <span className='relative px-4 py-2 mx-2 inline-block border border-gray-200 rounded'>{e} <button className="absolute -top-0 right-0" data-id={`${e}`} onClick={(e) => { 
                                            const target=e.target.dataset.id;
                                           setSysmptoms(symptoms.filter(e=>{
                                                return e!==target
                                            }))
                                        }}>
                                            <svg width="18px" height="12px" viewBox="0 0 700 600" className="pointer-events-none">
                                                <g>
                                                    <g>
                                                        <path
                                                            d="m 300.60937,-12.792969 c -173.60599,0 -315.214839,141.724839 -315.214839,315.404299 0,173.67945 141.608849,315.40429 315.214839,315.40429 173.606,0 315.21485,-141.72484 315.21485,-315.40429 0,-173.67946 -141.60885,-315.404299 -315.21485,-315.404299 z m 0,84.082031 c 128.13278,10e-7 231.13086,103.052738 231.13086,231.322268 0,128.26952 -102.99808,231.32226 -231.13086,231.32226 C 172.4766,533.93359 69.476562,430.88085 69.476562,302.61133 69.476563,174.3418 172.4766,71.289062 300.60937,71.289062 Z"
                                                            fill="#000000"
                                                        />
                                                        <path
                                                            d="M 416.16211,144.93164 A 42.041401,42.041401 0 0 0 386.4375,157.25391 L 155.30469,388.53125 a 42.041401,42.041401 0 0 0 0.0195,59.45703 42.041401,42.041401 0 0 0 59.45508,-0.0195 L 445.91211,216.69141 a 42.041401,42.041401 0 0 0 -0.0195,-59.45704 42.041401,42.041401 0 0 0 -29.73047,-12.30273 z"
                                                            fill="#000000"
                                                        />
                                                        <path
                                                            d="m 185.05664,144.93164 a 42.041401,42.041401 0 0 0 -29.73242,12.30273 42.041401,42.041401 0 0 0 -0.0195,59.45704 L 386.4375,447.96875 a 42.041401,42.041401 0 0 0 59.45508,0.0195 42.041401,42.041401 0 0 0 0.0195,-59.45703 L 214.7793,157.25391 a 42.041401,42.041401 0 0 0 -29.72266,-12.32227 z"
                                                            fill="#000000"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>

                                        </button></span>
                                    )
                                })
                            }
                        </div>
                        <input type="text" name="fullname" id="fullname" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" value={temp} onChange={e => { setTemp(e.target.value) }} onKeyDown={(e) => { handleSymptomInsertion(e) }} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" id="date" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" value={date} onChange={(e) => { setDate(e.target.value) }} />
                    </div>
                    <div>
                        <input type="submit" className="hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded  my-4" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default BookAppointment
