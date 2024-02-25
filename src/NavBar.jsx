import react from "react"
import { Link } from "react-router-dom"


const NavBar = () => {
    return (
        <>
            <div className="inline-block mt-8 w-full">
                {/* <Link to="/">
                    <button className='hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4'>Home</button>
                </Link> */}
                <Link to="/login" >
                    <button className='hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4'>Login</button>
                </Link>
                <Link to="/signup">
                    <button className='hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4'>SignUp</button>
                </Link>

            </div>
        </>
    )
}

export default NavBar