import { CSSProperties, useContext, useState } from "react";
import { Col } from "react-bootstrap";
import JogoDaMemoriaContext from "./context";

const tamanho = {
  height: '10vh',
  width: "calc(10vh * 0.6)",
};

const estiloDasFaces: CSSProperties = {
  backgroundColor: "blue",
  position: "absolute",
  borderRadius: 10,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  ...tamanho ,
};

const ColunaDaCarta = ({ carta }: { carta: Carta }) => {
  const contexto = useContext(JogoDaMemoriaContext);
  const [hovering, setHovering] = useState(false);

  return (
    <Col xs="auto" className="m-0" style={{padding:'.5rem'}}>
      <div
        onClick={
          !carta.descoberta && !carta.exibida
            ? () => contexto.exibirCarta(carta.id)
            : undefined
        }
        role="button"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          ...(hovering && !carta.descoberta && !carta.exibida
            ? { transform: "scale(1.1)" }
            : undefined),
          ...(carta.exibida || carta.descoberta
            ? {
                transform: "rotateY(180deg)",
              }
            : undefined),
          // position: "relative",
          transformStyle: "preserve-3d",
          transition: "all ease-in-out .2s",
          ...tamanho,
        }}
      >
        {/* costas da carta */}
        <div style={{ ...estiloDasFaces, backgroundColor: "red" }}></div>

        {/* frente da carta */}
        <div
          style={{
            ...estiloDasFaces,
            backgroundColor: "white",
            transform: "rotateY(180deg)",
          }}
          className="d-flex align-items-center justify-content-center border border-1"
        >
          <b style={{ fontSize: "2rem" }} className="text-primary">
            {carta.letra}
          </b>
        </div>
      </div>
    </Col>
  );
};

export default ColunaDaCarta;
