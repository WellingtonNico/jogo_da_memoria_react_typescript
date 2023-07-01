import { PropsWithChildren, createContext, useState } from "react";


type JogoDaMemoriaContextType = {
  cartas: Carta[]
  erros: number
  acertos: number
  exibirCarta: (id: number) => void
  reiniciarJogo: () => void
}


const JogoDaMemoriaContext = createContext<JogoDaMemoriaContextType>({} as JogoDaMemoriaContextType);


export const JogoDaMemoriaContextProvider = ({ children }: PropsWithChildren) => {

  // variáveis de controle que não precisam afetar o estado
  var cliqueBloqueado = false
  var cartaExibida: Carta | null = null

  const [acertos, setAcertos] = useState(0)
  const [erros, setErros] = useState(0)
  const [cartas, setCartas] = useState<Carta[]>([])



  const exibirCarta = (id: number) => {
    if (cliqueBloqueado) return
    cliqueBloqueado = true
    const cartaParaVirar = cartas.find(carta => carta.id === id) as Carta

    if (cartaExibida === null) {
      // caso ainda não tenha uma carta exibida a mesma é definida como exibida
      cartaParaVirar.exibida = true
      cartaExibida = cartaParaVirar
      setCartas(lista => lista.map(c => c.id === cartaParaVirar.id ? cartaParaVirar : c))
      cliqueBloqueado = false
    } else if (cartaExibida.letra === cartaParaVirar.letra) {
      // caso haja uma carta exibida e a letra é igual a carta para virar
      // então as cartas com a mesma letra são definidas como descoberta
      cartaExibida = null
      setCartas(lista => lista.map(c => c.letra === cartaParaVirar.letra ? { ...c, descoberta: true } : c))
      setAcertos(p => p + 1)
      cliqueBloqueado = false
    } else {
      // caso haja uma carta exibida e a letra é diferente
      // neste caso a carta é exibida por alguns segundos e depois é escondida novamente
      setCartas(lista => lista.map(c => c.id === cartaParaVirar.id ? { ...c, exibida: true } : c))
      setErros(p => p + 1)
      setTimeout(() => {
        setCartas(lista => lista.map(c => c.id === cartaParaVirar.id ? { ...c, exibida: false } : c))
        cartaExibida = null
        cliqueBloqueado = false
      }, 2000)
    }
  }

  // exibe uma carta por vez por um determinado tempo
  const exibirCartasDoJogo = (lista:Carta[],index:number=0) => {
    if(index > cartas.length){
      setCartas(lista.map(c=>({...c,exibida:false})))
      cliqueBloqueado = false
    }
    setCartas(lista.map((carta,i)=>({...carta,exibida:index==i})))
    setTimeout(()=>{
      // apos um tempo vai para próxima carta até acabar todas
      exibirCartasDoJogo(lista,index + 1)
    },200)
  }

  const reiniciarJogo = () => {
    cliqueBloqueado = true
    const novaLista = cartas.map(c => ({ ...c, descoberta: false, exibida: false }))
    const listaEmbaralhada = embaralharLista(novaLista)
    setErros(0)
    setAcertos(0)
    exibirCartasDoJogo(listaEmbaralhada)
    cliqueBloqueado = false
  }

  const value = {
    cartas,
    exibirCarta,
    acertos,
    erros,
    reiniciarJogo
  }



  return <JogoDaMemoriaContext.Provider value={value}>
    {children}
  </JogoDaMemoriaContext.Provider>

}

export default JogoDaMemoriaContext