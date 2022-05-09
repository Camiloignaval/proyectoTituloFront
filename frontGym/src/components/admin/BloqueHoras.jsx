import { useDispatch } from "react-redux";
import { guardarCausas } from "../../actions/admin";
import { HoraBloqueada } from "./HoraBloqueada";
import { useState } from "react";

export const BloquearHoras = ({ blockHours }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState([1, 2]);

  return (
    <div className="mt-4">
      {count.map((c, i) => (
        <HoraBloqueada
          count={count}
          setCount={setCount}
          key={i}
          pos={i}
          blockHours={blockHours}
        />
      ))}
      <div className="contBtnPlusCause d-flex justify-content-center">
        <div className="row w-75">
          <button
            onClick={() => setCount([...count, count.length + 1])}
            style={{ height: "40px", borderRadius: "8px" }}
            className=" mt-3 massive_btn col-10"
          >
            Agregar hora <i class="fas fa-plus-circle"></i>
          </button>
          <button
            onClick={() => {
              const arr = [...count];
              arr.pop();
              setCount(arr);
            }}
            style={{
              height: "40px",
              backgroundColor: "#8a0000",
              color: "white",
              borderRadius: "8px",
            }}
            className="mt-3 massive_btn col-2"
          >
            <i class="fas fa-minus-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
