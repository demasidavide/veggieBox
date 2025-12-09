import "./loadMore.css"

export function ButtonMore({load}){
    return(
        <>
        <button className ="more" type="button" onClick={load}>More</button>
        
        </>
    )
}