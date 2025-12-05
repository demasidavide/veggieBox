import "./Modal.css";
import cibo from "../../assets/cibo.jpg";
import close from "../../assets/icon-close.png";
import { useState } from "react";

export function Modal({onClose}) {
  return (
    <>
      <div className="container-modal">
        <button className="close" onClick={onClose}>
          <img src={close}></img>
        </button>
        <div className="container-title">
          <img src={cibo}></img>
          <h1>titolo</h1>
        </div>
        <hr></hr>
        <div className="container-ingredients">
          <h3>Ingredienti</h3>
          <ul>
            <li>uova</li>
            <li>farina</li>
            <li>acqua</li>
            <li>olio</li>
          </ul>
          <p>calorie: 300kcal</p>
        </div>
        <hr></hr>
        <div className="container-prep">
          <h3>Preparazione</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
            quisquam ab eligendi quaerat quis beatae libero saepe illo, corrupti
            repellendus aut sequi officiis natus soluta sed asperiores, eius
            dicta porro quod ducimus perspiciatis quos. Voluptate veniam fugit
            rem iste distinctio quaerat, ullam exercitationem tenetur
            necessitatibus at ad magni excepturi quibusdam obcaecati alias
            inventore atque corrupti commodi vitae repellendus! Ipsa quaerat
            magni aliquam possimus veniam! Consectetur quam, aliquid saepe quod
            earum quaerat totam consequatur debitis laborum quia doloribus,
            delectus hic eaque. Quisquam optio, quidem impedit accusantium
            eveniet et ipsa. Eaque vero veritatis ipsa quidem voluptatem soluta
            ab excepturi nostrum pariatur molestias.
          </p>
        </div>
      </div>
    </>
  );
}
