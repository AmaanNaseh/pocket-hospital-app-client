import react, { useState } from "react";

const AddPrescription = () => {
    const [inputCount, setInputCount] = useState(1)
    return (
        <>
            <form class="max-w-md mx-auto">
                {
                    Array.from({ length: inputCount }, (_, index) => index).map(() => {
                        return <>
                            <div class="mb-4">
                                <label class="block text-gray-700" for="">Medicine</label>
                                <input class="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="text" name="medicine" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700" for="">Dosage</label>
                                <input class="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="text" name="dosage" />
                            </div>
                        </>
                    })
                }
            </form>

            <button className="hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 " onClick={() => { setInputCount(inputCount + 1) }}>Add field</button>
            <br />
            <button className="hover:bg-slate-500 bg-slate-600 text-white font-bold py-2 px-4 rounded mx-4 mt-2" onClick={() => { setInputCount(inputCount - 1) }}>Delete field</button>
        </>
    )
}

export default AddPrescription;


