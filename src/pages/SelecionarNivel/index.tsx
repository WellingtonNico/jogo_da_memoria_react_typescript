import { useContext } from "react";
import JogoDaMemoriaContext, { NIVEIS, Nivel } from "../../contexts/JogoDaMemoriaContext";
import { Button, Col, Row } from "react-bootstrap";

const SeletorDeNivel = () => {
  const contexto = useContext(JogoDaMemoriaContext);

  return (
    <>
      <h4>Selecione um Nível</h4>

      <br />

      <div>
        {Object.entries(NIVEIS).map(([nivel, qtdLetras]) => (
          <Row key={nivel} className="my-3 justify-content-between">
            <Col>
              <strong>{nivel} </strong>
            </Col>
            <Col>
              <span> {qtdLetras} letras </span>
            </Col>
            <Col>
              <span> {qtdLetras * 2} cartas </span>
            </Col>
            <Col>
              <Button
                size="sm"
                onClick={() => contexto.setNivelSelecionado(nivel as Nivel)}
              >
                Selecionar
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    </>
  );
};

export default SeletorDeNivel;
