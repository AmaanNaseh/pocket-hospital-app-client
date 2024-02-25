import react, { useState } from "react"
import { Link } from "react-router-dom"
const Login = ({ getToken }) => {
    const [person, setPerson] = useState("patient");
    const [id, setId] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            person,
            email: id,
            password
        }
        const res = await fetch('http://127.0.0.1:5000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.status == 200) {
            getToken(data.accessToken, data.redirect);
        }
    }
    return (
        <>
            <div className="px-4 mx-auto max-w-xl my-10 space-y-2">
                {/* <BackButton /> */}

                <form action="" onSubmit={handleSubmit}>
                    <h1 className="text-black text-3xl font-bold" >Login</h1>
                    <div>
                        <p>Login as</p>
                        <button type="button" disabled={person === 'patient' ? true : false} className={`hover:bg-slate-500  ${person === 'patient' ? "bg-slate-500" : "bg-slate-600"} text-white font-bold py-2 px-4 rounded mx-4 my-4`} onClick={() => { setPerson('patient') }}>Patient</button>
                        <button type="button" disabled={person === 'doctor' ? true : false} className={`hover:bg-slate-500 ${person === 'doctor' ? "bg-slate-500" : "bg-slate-600"} text-white font-bold py-2 px-4 rounded mx-4 my-4`} onClick={() => { setPerson('doctor') }}>Doctor</button>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" value={id} onChange={(e) => { setId(e.target.value) }} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="border border-gray-400 block px-4 py-2 w-full rounded focus:outline-none focus:border-teal-500" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div>
                        <input type="submit" className="hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4" />
                    </div>
                </form>
                <div className="border border-gray-300 rounded p-4">
                    <p>Don't have an account? <Link to="/signup" className="text-blue-500">SignUp</Link></p>
                </div>

            </div>
        </>
    )
}

export default Login