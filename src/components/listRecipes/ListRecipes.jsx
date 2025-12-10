import "./ListRecipes.css";

export function ListRecipes({ onClose, title, id, key,servings }) {
  return (
    <>
      <div className="container-list">
        Ricette selezionate
        <ul>
          <li>
            <button onClick={onClose}>X</button>
            {title}
            <select className="number">
              {Array.from({ length: servings }, (_, i) => (
                <option key={i + 1} value={i + 1} selected>
                  {i + 1} /pers
                </option>
              ))}
            </select>
          </li>
        </ul>
      </div>
    </>
  );
}
