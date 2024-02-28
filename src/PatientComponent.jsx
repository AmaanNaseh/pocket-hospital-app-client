import react, { useState, useRef, useEffect } from "react";
import AddPrescription from './AddPrescription'
import ShowPrescription from './ShowPrescription';
import CancelButton from "./CancelButton";

const disease = {
    "Bones": ['arthritis'],
    'Brain': ['brain_tumour'],
    'Heart': ['coronary_artery_disease'],
    "Kidney": ['kidney_failure'],
    'Lungs': ['breast_cancer', 'covid', 'lungs_cancer', 'tuberculosis']
}





const PatientComponent = ({ details }) => {
    const { patientsDetails, status, date, symptoms, labReport, prescription } = details
    const [popUp, setPopUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({});
    const [selectedDisease, setSelectedDisease] = useState("none");
    const [subCategory, setSubCategory] = useState('none');
    const [imgSrc, setImgSrc] = useState('');
    const popUpRef = useRef(null);
    const previewImage = useRef(null);



    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        // const res = await fetch(`http://localhost:5173/${imgSrc}`,{
        //     method:"POST",
        //     headers:{
        //         'content-type':'application/json'
        //     },
        //     body:
        // });
        // res.blob().then(async (file) => {
        // console.log(file);
        // const formData = new FormData();
        // formData.append('file', file, 'image.jpg')
        // formData.append('category',selectedDisease);
        // formData.append('subcategory',subCategory);
        const data = {
            image: imgSrc,
            category: selectedDisease,
            subCategory: subCategory
        }
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (response.status === 200) {
            setLoading(false)
            const data = await response.json();
            if (data) {

                console.log(data);
                setResult({ ...data })
            }
        }
        // });


    }

    const displayImage = (file) => {
        if (file && previewImage.current) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.current.src = e.target.result;
                setImgSrc(e.target.result)
                previewImage.current.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <div className={`popup p-4 rounded absolute bg-gray-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${!popUp ? "hidden" : "block"}`} ref={popUpRef}>

                <CancelButton setState={setPopUp} />
                <div>
                    <div className="flex flex-col justify-between  mb-4">
                        <div className="flex items-center">
                            <span className="mr-2 font-bold">Name:</span>
                            <span>{patientsDetails.name}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-2 font-bold">Age:</span>
                            <span>{patientsDetails.age}</span>
                        </div>
                    </div>

                    <div className="">
                        <span className="mr-2 font-bold">Symptoms:</span>
                        <div className="my-2">
                            {symptoms.map((symptom, index) => (
                                <span key={index} className="bg-gray-200  m-2 text-gray-800 rounded-md p-2 mb-2 border border-gray-400">
                                    {symptom}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>


                {
                    labReport.description ?
                        <form className="border-2 w-64" onSubmit={handleSubmit} encType="multipart/form-data">
                        <span className="mt-2 block font-bold">Check Possible Disease</span>
                            <div>
                                <select className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" onChange={(e) => { setSelectedDisease(e.target.value) }}>
                                    <option value="none">None</option>
                                    {Object.keys(disease).map((e) => (
                                        <option value={e} key={e}>{e}</option>
                                    ))}
                                </select>

                                {selectedDisease !== 'none' &&
                                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4" onChange={(e) => { setSubCategory(e.target.value) }}>
                                        <option value="none">None</option>
                                        {disease[selectedDisease].map((e) => (
                                            <option value={e} key={e}>{e}</option>
                                        ))}
                                    </select>
                                }

                                {(selectedDisease && selectedDisease !== 'none' && subCategory && subCategory !== 'none') &&
                                    <>
                                        <input type="file" name="file" onChange={(e) => { displayImage(e.target.files[0]) }} className="mb-4" />
                                        <span className="mr-2 font-bold">Report file:</span>
                                        <img ref={previewImage} className="block w-32 h-32 mb-4 border border-gray-300 rounded-md" src="" alt="" />
                                    </>
                                }
                            </div>

                            <button type="submit" className={`${loading ? '' : ""} hover:bg-slate-500  bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4`}> <svg width="32px" className={`animate-spin  ${loading ? 'inline-block' : 'hidden'} `} height="32px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g></svg> check</button>
                        </form>
                        : <div>No lab reports</div>
                }

                {
                    result.disease ?
                        <div>
                            <div>
                                <span className="mr-2 font-bold">Disease Detctected</span>
                                <p>{result.disease}</p>
                            </div>

                            <div>
                                <span className="mr-2 font-bold">Details</span>
                                <p>{result.description}</p>
                            </div>
                        </div>
                        : ""
                }

                {
                    status === 'prescribed' ? <ShowPrescription details={prescription} /> : ""
                }

                <button className={`${result.medicines ? 'inline-block' : "hidden"} hover:bg-slate-500  bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4`}> Add Prescription</button>

            </div>
            <div className="mx-8 flex justify-around items-center my-8">
                <div className="w-1/2 border-b-2 pb-2">
                    <p className="text-lg font-semibold">{patientsDetails.name}</p>
                </div>
                <div className="w-16 border-b-2 pb-2">
                    <p className="text-lg">{patientsDetails.age}</p>
                </div>
                <div className="w-32 border-b-2 pb-2">
                    <ul className="list-disc">
                        {symptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                        ))}
                    </ul>
                </div>
                <div className="w-32 border-b-2 pb-2">{status}</div>
                <div className="border-b-2 pb-2">{date}</div>
                <button className="hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 my-4" onClick={() => { setPopUp(true) }}>View more</button>
            </div>


        </>
    )
}

export default PatientComponent;