export function ConfirmButton({name}){
    return(
        <>
        <button type="button" className="confirm-button" value={name}>{name}</button>
        </>
    )
}