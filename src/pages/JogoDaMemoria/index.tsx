import { useContext } from "react";
import JogoDaMemoriaContext from "./context";
import { Button, Col, Row } from "react-bootstrap";
import ConteudoPrincipal from "./ConteudoPrincipal";

function JogoDaMemoria() {
  const contexto = useContext(JogoDaMemoriaContext);

  return (
    <>
      <div>
        <strong className="mx-2 text-secondary">
          Nível: {contexto.nivelSelecionado}
        </strong>

        <strong className="mx-2 text-success">
          Acertos: {contexto.acertos}
        </strong>

        <strong className="mx-2 text-danger">Erros: {contexto.erros}</strong>

        <strong className="mx-2 text-primary">
          Tentativas: {contexto.erros + contexto.acertos}
        </strong>
      </div>

      <br />
      <br />

      <Row className="justify-content-center">
        <ConteudoPrincipal />
      </Row>

      <br />
      <br />

      <Row className="justify-content-between">
        <Col>
          <Button
            onClick={() => contexto.iniciarJogo()}
            variant="light border border-dark"
          >
            Reiniciar
          </Button>
        </Col>

        <Col>
          <Button
            onClick={() => contexto.setNivelSelecionado(null)}
            variant="outline-dark"
          >
            Alterar Nível
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default JogoDaMemoria;
