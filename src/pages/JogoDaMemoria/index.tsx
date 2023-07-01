import { useContext } from 'react'
import JogoDaMemoriaContext from './context'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import ColunaDaCarta from './ColunaDaCarta'

function JogoDaMemoria() {

  const contexto = useContext(JogoDaMemoriaContext)


  return <Container className='text-center' fluid>
    <br />
    <h2>Jogo da Memória - react typescript</h2>
    <br />

    <Row className='justify-content-center'>
      <Col xs='12' sm='10' md='8' >
        <Card>
          <Card.Body>
            <div>
              <strong className='mx-2 text-success'>Acertos: {contexto.acertos}</strong>

              <strong className='mx-2 text-danger'>Erros: {contexto.erros}</strong>

              <strong className='mx-2 text-primary'>Tentativas: {contexto.erros + contexto.acertos}</strong>
            </div>

            <br />
            <br />

            <Row className='justify-content-center'>
              {contexto.cartas.map(carta=><ColunaDaCarta carta={carta}/>)}
            </Row>

            <br />
            <br />

            <div className='justify-content-center'>
              <Button variant='outline-dark'>Reiniciar</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
}

export default JogoDaMemoria