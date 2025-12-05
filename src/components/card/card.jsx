import "./card.css";

export function Card({id,img,title,kcal}) {
  console.log(`-card-ricevute ${id}${img}${title}`)
  return (
    <>
      <div className="card-style-2">
        <img
          src={img}
          alt={title || "immagine non disp"}
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p>{kcal}</p>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
    </>
  );
}
