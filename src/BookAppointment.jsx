import react, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"

const specialist=[
    'cardiologist',
    'pulmonologist',
    'othopaedic',
    'neurologist'
]

const BookAppointment = ({accessToken}) => {
    const history=useNavigate();
    const [date,setDate]=useState();
    const [doctor,setDoctor]=useState();
    const [symptoms,setSysmptoms]=useState([]);
    const[temp,setTemp]=useState('');

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const payload={
            doctor,
            symptoms,
            date
        }
        const res =await fetch('http://127.0.0.1:5000/book', {
            method: "POST", 
            headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${accessToken}`
            },
            body: JSON.stringify(payload) 
          });
        const data=await res.json();
        if(res.status==200){
            history('/');
        }
    }   

    const handleSymptomInsertion=(e)=>{
        if(e.keyCode==32){
            setTemp("");
            setSysmptoms([...symptoms,temp])
        }
    }

    useEffect(()=>{
        console.log(temp)
    },[symptoms])
    return (
        <>
            <div className="px-4 mx-auto max-w-xl my-10 space-y-2">

                <form action=""  onSubmit={handleSubmit}>
                    <h1 className="text-black text-3xl font-bold" >Book appointment</h1>
                    <div> 
                        <label htmlFor="">Specialist</label>
                        <select onChange={(e) => { setDoctor(e.target.value) }}>
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
                    <div>
                        <label htmlFor="">symptoms</label>
                        <div>
                            {
                                symptoms.map(e=>{
                                    return(
                                        <span>{e}</span>
                                    )
                                })
                            }
                        </div>
                        <input type="text" name="fullname" id="fullname" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" value={temp}  onChange={e=>{setTemp(e.target.value)}} onKeyDown={(e)=>{handleSymptomInsertion(e)}}/>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" id="date" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" value={date}  onChange={(e)=>{setDate(e.target.value)}}/>
                    </div>
                    <div>
                        <input type="submit" className="hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4"  />
                    </div>
                </form>
            </div>
        </>
    )
}

export default BookAppointment