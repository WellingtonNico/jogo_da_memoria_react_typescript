import React from "react";
import ReactDOM from "react-dom/client";
import JogoDaMemoria from "./pages/JogoDaMemoria";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import JogoDaMemoriaContext, {
  JogoDaMemoriaContextProvider,
} from "./contexts/JogoDaMemoriaContext";
import { Card, Col, Container, Row } from "react-bootstrap";
import SeletorDeNivel from "./pages/SelecionarNivel";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <JogoDaMemoriaContextProvider>
      <Container className="text-center" fluid>
        <br />
        <h2>Jogo da Memória - react typescript</h2>
        <br />

        <Row className="justify-content-center mx-0">
          <Col xs="12" sm="10" md="8">
            <Card>
              <Card.Body>
                <JogoDaMemoriaContext.Consumer>
                  {(contexto) =>
                    contexto.nivelSelecionado === null ? (
                      <SeletorDeNivel />
                    ) : (
                      <JogoDaMemoria />
                    )
                  }
                </JogoDaMemoriaContext.Consumer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </JogoDaMemoriaContextProvider>
  </React.StrictMode>
);
