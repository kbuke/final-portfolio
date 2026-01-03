import { useOutletContext, useNavigate } from "react-router"

export function Admin(){
    const appData = useOutletContext()

    const loggedUser = appData?.loggedUser
    const setLoggedUser = appData?.setLoggedUser

    const navigate = useNavigate()

    console.log(loggedUser)

    const logOut = () => {
        fetch("/api/logout", {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                setLoggedUser(null)
            }
        })
        .then(navigate("/login"))
    }

    return(
        loggedUser
            ?<div>
                <button
                    className="bg-linear-to-r from-red-500 to-red-700 absolute right-3 uppercase"
                    onClick={() => logOut()}
                >
                    Log Out
                </button>
            </div>
            :<div>
                <h1>You must log in to access this page</h1>
            </div>
    )
}