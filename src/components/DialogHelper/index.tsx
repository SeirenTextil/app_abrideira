import { Button, Dialog, Icon, Portal, Text } from 'react-native-paper';
import { TextInfo, ViewInfo } from './styles';

interface DialogHelperProps{
  visible: boolean;
  close: () => void;
}
export default function DialogHelper({visible, close}: DialogHelperProps){

	return(
		<Portal>
			<Dialog style={{backgroundColor: '#ccc', minHeight: 100}} visible={visible} onDismiss={close}>
				<Dialog.Title style={{fontWeight: 'bold', textAlign: 'center'}}>Informações</Dialog.Title>
				<Dialog.Content style={{alignItems: 'center'}}>
					<ViewInfo>
						<>
							<TextInfo>
								<Icon size={28} source={'fruit-citrus'}/> = Banho Utilizando Corante Cítrico
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'clipboard-alert'}/> = Marcado c/ Problema de Largura
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'note-alert'}/> = Marcado c/ Problema de Gramatura
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'file-alert'}/> = Marcado c/ Problema de Larg./Gram.
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'folder-information'}/> = Banho Marcado para abrir
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'clock-alert'}/> = Prioridade
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'water-alert'}/> = Prioridade fora de cor
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'close-circle'}/> = Fora de cor
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'autorenew'}/> = Pré-Ramosa
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'flag-checkered'}/> = Final
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'hair-dryer'}/> = Secagem
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'iron'}/> = Calandra
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'monitor'}/> = Banho no Supervisório
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'information'}/> = Instrução do Setor Pcp
							</TextInfo>
						</>
						<>
							<TextInfo>
								<Icon size={28} source={'alert'}/> = Problemas
							</TextInfo>
						</>




					</ViewInfo>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={close}>
						<Text style={{fontWeight: 'bold'}}>OK</Text>
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}
