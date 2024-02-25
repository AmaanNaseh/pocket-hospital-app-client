import react, { useState } from "react"

import { Link } from "react-router-dom"

const Signup = ({ getToken }) => {
    const [person, setPerson] = useState("patient");
    const [name, setName] = useState('');
    const [age, setAge] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState()
    const [specialization,setSpecialization]=useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            person,
            name,
            email,
            age,
            phone,
            password
        }
        const res = await fetch('http://127.0.0.1:5000/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log(data);
        if (res.status == 200) {
            getToken(data.accessToken, data.redirect);
        }
    }
    return (
        <div className='px-4 mx-auto max-w-xl my-10 space-y-2'>
            <div>
                <p>Register as</p>
                <button type="button" disabled={person === 'patient' ? true : false} className={`hover:bg-slate-500  ${person === 'patient' ? "bg-slate-500" : "bg-slate-600"} text-white font-bold py-2 px-4 rounded mx-4 my-4`} onClick={() => { setPerson('patient') }}>Patient</button>
                <button type="button" disabled={person === 'doctor' ? true : false} className={`hover:bg-slate-500 ${person === 'doctor' ? "bg-slate-500" : "bg-slate-600"} text-white font-bold py-2 px-4 rounded mx-4 my-4`} onClick={() => { setPerson('doctor') }}>Doctor</button>
            </div>

            <form action="" onSubmit={(e) => { handleSubmit(e) }} className="" >
                <h1 className="text-black text-3xl font-bold" >SignUp</h1>
                <div>
                    <label htmlFor="fullname">Full Name</label>
                    <br />
                    {person==='doctor'?<span>Dr.</span>:""}
                    <input type="text" name="fullname" id="fullname" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" val={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" val={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                {
                   person &&  person==='patient'?    <div>
                    <label htmlFor="age">Age</label>
                    <input type="number" name="age" id="age" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" val={age} onChange={(e) => { setAge(e.target.value) }} />
                </div>:<div>
                    <label htmlFor="age">Specialization</label>
                    <input type="text" name="specialization" id="specialization" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" val={specialization} onChange={(e) => { setSpecialization(e.target.value) }} />
                </div>
                }

            
                <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="number" name="phone" id="phone" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" val={phone} onChange={(e) => { setPhone(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" val={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div>
                    <input type="submit" className="hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4" />
                </div>
            </form>
            <p>Already have an account <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Signup