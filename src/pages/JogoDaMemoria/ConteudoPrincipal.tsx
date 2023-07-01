import { useContext, useEffect } from "react";
import JogoDaMemoriaContext from "../../contexts/JogoDaMemoriaContext";
import Resultado from "./Resultado";
import ColunaDaCarta from "./ColunaDaCarta";

const ConteudoPrincipal = () => {
  const contexto = useContext(JogoDaMemoriaContext);

  useEffect(()=>{
    contexto.iniciarJogo()
  },[])


  if (contexto.jogoEncerrado) {
    return <Resultado />;
  }

  return (
    <>
      {contexto.cartas.map((carta) => (
        <ColunaDaCarta key={carta.id} carta={carta} />
      ))}
    </>
  );
};

export default ConteudoPrincipal;
