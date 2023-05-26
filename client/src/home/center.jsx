
import "./home.css"
import { useNavigate } from "react-router-dom";
export const Center=(props)=>{

    const navigate=useNavigate()

    const handleClick=(e)=>{
        e.preventDefault();
        navigate("/camp",{state : {getresponse:props.getresponse.data[props.id],
        date_of_slot:props.selectedDate,
    }})
    }

    return(
        <>
        <div className="vaccination-center">
            <div className="vaccination-center-name">
                <p>{props.name}</p>
            </div>
            <div className="vaccination-center-slot">
                <p><span className="vaccination-center-slot-number">{props.slots}</span> slots left!</p>
            </div>
            <div className="vaccination-center-book">
                <div className="vaccination-center-book-text">
                <div onClick={handleClick} className="book">
                    Book
                </div>    
                </div>
            </div>
        </div>
        </>
    )
}