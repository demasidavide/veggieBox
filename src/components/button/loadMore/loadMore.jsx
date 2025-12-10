import "./loadMore.css";

export function ButtonMore({ load }) {
  return (
    <>
      <div className="container-more">
        <button className="more" type="button" onClick={load}>
          More
        </button>
      </div>
    </>
  );
}
