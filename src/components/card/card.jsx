import "./card.css";

export function CreateCard(id,img,title,descr) {
  return (
    <>
      <div className="card-style-2">
        <img
          src={img}
          alt="Tiramisù"
          className="card-image"
        />
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">
            {descr}
          </p>
          <div className="buttons-style-2">
            <button className="btn btn-view">Vedi Ricetta</button>
            <button className="btn btn-save">Salva</button>
          </div>
        </div>
      </div>
    </>
  );
}
