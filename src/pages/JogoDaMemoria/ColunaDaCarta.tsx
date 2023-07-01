import { useContext, useState } from "react";
import { Card, Col } from "react-bootstrap";
import JogoDaMemoriaContext from "./context";

const ColunaDaCarta = ({ carta }: { carta: Carta }) => {
  const contexto = useContext(JogoDaMemoriaContext);
  const [hovering, setHovering] = useState(false);

  return (
    <Col xs="auto" className="m-0 p-3">
      <Card
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
          transition: "all ease-in-out .2s",
          height: 100,
          width: 60,
          backgroundColor: carta.exibida ? "white" : "blue",
        }}
      ></Card>
    </Col>
  );
};

export default ColunaDaCarta;
