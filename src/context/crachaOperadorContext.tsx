import { createContext, useEffect, useState } from 'react';

interface CrachaOperadorType{
  codOperador: string;
  hanldeSetCodOperador: (codOperador: string) => void;
  nomeOperador: string;
  hanldeSetNomeOperador: (nome: string) => void;
  isLider: boolean;
  hanldeSetIsLider: (isLider: boolean) => void;
}

interface CrachaOperadorProps {
 children: React.ReactNode;
}

export const CrachaOperadorContext =  createContext({} as CrachaOperadorType );
export function CrachaOperadorProvider({children}: CrachaOperadorProps){
	const [codOperador, setOperador] = useState('');
	const [nomeOperador, setNomeOperador] = useState('');
	const [isLider, setIsLider] = useState<boolean>(false);

	useEffect(() => {
		console.log(isLider);
	}, [isLider]);


	function hanldeSetCodOperador(codOperador: string){
		setOperador(codOperador);
	}

	function hanldeSetNomeOperador(nome: string){
		setNomeOperador(nome);
	}

	function hanldeSetIsLider(isLider: boolean){
		setIsLider(isLider);
	}

	return(
		<CrachaOperadorContext.Provider value={{
			codOperador, hanldeSetCodOperador,
			nomeOperador, hanldeSetNomeOperador,
			isLider, hanldeSetIsLider
		}}>
			{children}
		</CrachaOperadorContext.Provider>
	);
}
