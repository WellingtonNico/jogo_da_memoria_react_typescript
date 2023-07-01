import { useContext } from "react";
import JogoDaMemoriaContext from "./context";

const Resultado = () => {
  const contexto = useContext(JogoDaMemoriaContext);

  const obterPorcentagemDeAcertos = () => {
    const tentativas = contexto.erros + contexto.acertos;
    return (contexto.acertos * 100) / tentativas;
  };

  const porcentagemDeAcertos = obterPorcentagemDeAcertos();

  const obterTextoDaPocentagem = () => {
    const textoDoNumero = porcentagemDeAcertos.toFixed(2).replace(".", ",");
    if (porcentagemDeAcertos === 100) {
      return (
        <span className="text-success">
          parabéns, você é um Deus %{textoDoNumero}
        </span>
      );
    } else if (porcentagemDeAcertos > 90) {
      return (
        <span className="text-primary">
          parabéns, você foi muitíssimo bem %{textoDoNumero}
        </span>
      );
    } else if (porcentagemDeAcertos > 70) {
      return <span className="text-warning">muito bom %{textoDoNumero}</span>;
    } else if (porcentagemDeAcertos > 40) {
      return <span className="text-secondary">bom %{textoDoNumero}</span>;
    }
    return <span className="text-secondary">%{textoDoNumero}</span>
  };

  return <h4>Porcentagem de Acertos: {obterTextoDaPocentagem()}</h4>;
};

export default Resultado;
