import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export function PopUp({
    formContainer,
    setPopUp
}){
    return(
        <div
            className="h-full w-full fixed top-0 z-10 bg-black flex flex-col justify-center items-center"
        >
            <FontAwesomeIcon 
                icon={faTimes}
                className='text-red-400 h-20 absolute top-1 right-3 cursor-pointer rounded-full p-2 bg-white'
                onClick={() => setPopUp(false)}
            />
            {formContainer}
        </div>
    )
}