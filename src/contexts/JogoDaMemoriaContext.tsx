import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { embaralharLista } from "../helpers/listas";

export const NIVEIS = {
  Fácil: 4,
  Médio: 8,
  Difícil: 12,
  Profissional: 18,
};

export type Nivel = keyof typeof NIVEIS;

type JogoDaMemoriaContextType = {
  cartas: Carta[];
  erros: number;
  acertos: number;
  exibirCarta: (id: number) => void;
  iniciarJogo: () => void;
  jogoEncerrado: boolean;
  nivelSelecionado: Nivel | null;
  setNivelSelecionado: (v: SetStateAction<Nivel | null>) => void;
};

const JogoDaMemoriaContext = createContext<JogoDaMemoriaContextType>(
  {} as JogoDaMemoriaContextType
);

// variáveis de controle que não precisam afetar o estado
var cliqueBloqueado = false;
var cartaExibida: Carta | null = null;
var pararAnimacao = false

export const JogoDaMemoriaContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [nivelSelecionado, setNivelSelecionado] = useState<Nivel | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [erros, setErros] = useState(0);
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [jogoEncerrado, setJogoEncerrado] = useState(false);

  useEffect(() => {
    // retorna os demais itens ao estado inicial
    if (nivelSelecionado === null) {
      cartaExibida = null;
      pararAnimacao = true;
      cliqueBloqueado = false;
    }
  }, [nivelSelecionado]);

  useEffect(() => {
    if (acertos === cartas.length / 2) {
      setJogoEncerrado(true);
      setCartas([]);
    }
  }, [acertos]);

  const exibirCarta = (id: number) => {
    if (cliqueBloqueado) return;
    cliqueBloqueado = true;
    const cartaParaVirar = cartas.find((carta) => carta.id === id) as Carta;

    if (cartaExibida === null) {
      // caso ainda não tenha uma carta exibida a mesma é definida como exibida
      cartaParaVirar.exibida = true;
      cartaExibida = cartaParaVirar;
      setCartas((lista) =>
        lista.map((c) => (c.id === cartaParaVirar.id ? cartaParaVirar : c))
      );
      cliqueBloqueado = false;
    } else if (cartaExibida.letra === cartaParaVirar.letra) {
      // caso haja uma carta exibida e a letra é igual a carta para virar
      // então as cartas com a mesma letra são definidas como descoberta
      cartaExibida = null;
      setCartas((lista) =>
        lista.map((c) =>
          c.letra === cartaParaVirar.letra ? { ...c, descoberta: true } : c
        )
      );
      setAcertos((p) => p + 1);
      cliqueBloqueado = false;
    } else {
      // caso haja uma carta exibida e a letra é diferente
      // neste caso a carta é exibida por alguns segundos e depois é escondida novamente
      setCartas((lista) =>
        lista.map((c) =>
          c.id === cartaParaVirar.id ? { ...c, exibida: true } : c
        )
      );
      setErros((p) => p + 1);
      setTimeout(() => {
        setCartas((lista) =>
          lista.map((c) =>
            c.descoberta === false ? { ...c, exibida: false } : c
          )
        );
        cartaExibida = null;
        cliqueBloqueado = false;
      }, 500);
    }
  };

  // exibe uma carta por vez por um determinado tempo
  const exibirCartasDoJogo = (lista: Carta[], index: number = 0) => {
    if (index > lista.length || nivelSelecionado === null || pararAnimacao) {
      setCartas(lista.map((c) => ({ ...c, exibida: false })));
      cliqueBloqueado = false;
      pararAnimacao = true
      return;
    }
    setCartas(lista.map((carta, i) => ({ ...carta, exibida: index == i })));
    setTimeout(function () {
      if (pararAnimacao) return;
      // apos um tempo vai para próxima carta até acabar todas
      exibirCartasDoJogo(lista, index + 1);
    }, 400);
  };

  function obterLetrasParaListaDeCartas() {
    const qtdDeLetas = NIVEIS[nivelSelecionado as Nivel];
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alfabeto.slice(0, qtdDeLetas).split("");
  }

  const montarListaDeCartas = () => {
    const letras = obterLetrasParaListaDeCartas();
    const novaListaDeCartas: Carta[] = [];
    letras.forEach((letra) => {
      novaListaDeCartas.push({
        id: novaListaDeCartas.length + 1,
        descoberta: false,
        exibida: false,
        letra,
      });
      novaListaDeCartas.push({
        id: novaListaDeCartas.length + 1,
        descoberta: false,
        exibida: false,
        letra,
      });
    });
    return novaListaDeCartas;
  };

  const iniciarJogo = () => {
    if (cliqueBloqueado) return;
    pararAnimacao = false
    setJogoEncerrado(false);
    cliqueBloqueado = true;
    const novaLista = montarListaDeCartas();
    const listaEmbaralhada = embaralharLista(novaLista);
    setErros(0);
    setAcertos(0);
    exibirCartasDoJogo(listaEmbaralhada);
  };

  const value = {
    cartas,
    exibirCarta,
    setNivelSelecionado,
    nivelSelecionado,
    acertos,
    erros,
    iniciarJogo,
    jogoEncerrado,
  };

  return (
    <JogoDaMemoriaContext.Provider value={value}>
      {children}
    </JogoDaMemoriaContext.Provider>
  );
};

export default JogoDaMemoriaContext;
