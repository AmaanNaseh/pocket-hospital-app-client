import react, { useState, useRef, useEffect } from "react";
import AddPrescription from './AddPrescription'
import ShowPrescription from './ShowPrescription';
import CancelButton from "./CancelButton";


const VideoCamra = ({ details }) => {
    const [popUp, setPopUp] = useState(true);
    const [imgSrc, setImgSrc] = useState('');
    const popUpRef = useRef(null);
    const previewVideo = useRef(null);


    useEffect(()=>{
        window.location.href="http://localhost:8501/"
    },[])

    const displayImage = (file) => {
        if (file && previewVideo.current) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewVideo.current.src = e.target.result;
                setImgSrc(e.target.result)
                previewVideo.current.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <div className="inline-block mt-8 w-full">
                <button className='hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4' >Recorded Video</button>
                <button className='hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4'>Live Video</button>

            </div>
            <div className={`popup p-4 rounded absolute bg-gray-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${popUp?'block':'hidden'} `} ref={popUpRef}>
                <CancelButton setState={setPopUp} />
                <form className="border-2 w-96 h-96"  >
                    <div>
                        {/* <video ref={previewVideo} className="block w-32 h-32 mb-4 border border-gray-300 rounded-md" src="" alt="" /> */}
                        <video ref={previewVideo} src=""></video>
                    </div>

                </form>

            </div>

        </>
    )
}

export default VideoCamra;
