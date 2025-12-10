import "./CardIng.css";

export function CardIng({ing,qta,id,key,unit}) {
  return (
    <>
      <div className="card-ing">
        <span className="name">{ing}</span>
        <span className="number">{qta}</span>
        <p>{unit}</p>
      </div>
    </>
  );
}
