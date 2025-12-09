import "./listButton.css";
import { Link } from 'react-router-dom'

export function ListButton() {
  return (
    <>
      <div className="container-button">
    <Link to = "/list" >
        <button>Lista ➜ </button>
      </Link>
        <p>2 Elementi</p>
      </div>
    </>
  );
}
