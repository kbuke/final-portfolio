export function FormGroup({
    errorMessage = "",
    children
}){
    return(
        <div className="text-red-500 text-center">
            {children}
            {errorMessage.length > 0 && <div>{errorMessage}</div>}
        </div>
    )
}