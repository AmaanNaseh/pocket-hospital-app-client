import react from "react";

const ShowPrescription = ({ details }) => {
    const { disease, description, medicines } = details
    return (
        <div>
            <div>
                <span className="mr-2 font-bold">Disease Detctected</span>
                <p>{disease}</p>
            </div>

            <div>
                <span className="mr-2 font-bold">Details</span>

                <p>{description}</p>
            </div>
            {
                details.medicines.map(e=>{
                    return(
                        <>
                          <div>
                            <span>Meidicne</span>
                            <span>{e.name}</span>
                          </div>
                          <div>
                            <span>Dosage</span>
                            <span>{e.dosage.freq}</span>
                            <span>{e.dosage.qtn}</span>
                          </div>
                        </>
                    )
                })
            }

        </div>
    )
}

export default ShowPrescription;