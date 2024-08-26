import {  Icon, Modal, Portal } from 'react-native-paper';
import { MainContainer, TableCell, TableHeader, TableRow, TableTitle } from './styles';
import { useEffect } from 'react';
import { Alert, FlatList } from 'react-native';

interface ModalCartaoBoxProps{
  visible: boolean;
  onClose: () => void;
  data: CartoesBox[];
}
export default function ModalCartaoBox({ visible, onClose, data}: ModalCartaoBoxProps){

	useEffect(() => {
		data != undefined && data.length <= 0 && Alert.alert('Sem Cartão!', 'Não há nenhum cartão neste box.');
	}, [data]);

	function getIcon(iconName: string){
		if (iconName == 'OK') {
			return(
				<Icon
					size={20}
					source={'check-circle'}
					color='#00ff5e'
					allowFontScaling={true}
				/>
			);
		}else if(iconName == 'OKYELLOW'){
			return(
				<Icon
					size={20}
					source={'check-circle'}
					color='#ffe600'
				/>
			);
		}else{
			return null;
		}
	}

	function getContrastColor(rgbColor: string): string {
		// Remove 'rgb(' and ')' then split the string into an array of RGB values
		const rgb = rgbColor.replace(/[^\d,]/g, '').split(',').map(Number);

		// Calculate the luminance value based on the perceived brightness
		const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;

		// If luminance is greater than 0.5, the background is light, so use black text
		return luminance > 0.5 ? '#000000' : '#FFFFFF';
	}


	function renderItem({ item }: { item: CartoesBox[] }) {
		return (
			<>
				{item.map(([, itemList]) => (
					<TableRow
						key={itemList.Cartao}>
						<TableCell style={{flex: 0.5}}>#</TableCell>
						<TableCell style={{flex: 0.5}}>{itemList.Sequencia}</TableCell>
						<TableCell style={{flex: 1.0}}>{itemList.Cartao}</TableCell>
						<TableCell style={{flex: 4.0}}>{itemList.cliente}</TableCell>
						<TableCell style={{flex: 1.0}}>{itemList.artigo}</TableCell>
						<TableCell style={{flex: 0.5}}>{itemList.divisao}</TableCell>
						<TableCell style={{flex: 0.5}}>{itemList.gramatura2}</TableCell>
						<TableCell style={{flex: 0.5}}>{itemList.LarguraSolicitada}</TableCell>
						<TableCell style={{flex: 0.5}}>{itemList.LarguraMedida}</TableCell>
						<TableCell style={{flex: 0.5}}>{itemList.CortaOurela}</TableCell>
						<TableCell style={{flex: 0.5}}>#</TableCell>
						<TableCell style={{flex: 0.5}}>{itemList.GrupoMaquina}</TableCell>
						<TableCell style={{flex: 0.5}}>{getIcon(itemList.R1)}</TableCell>
						<TableCell style={{flex: 0.5}}>{getIcon(itemList.R2)}</TableCell>
						<TableCell style={{flex: 0.5}}>{getIcon(itemList.R3)}</TableCell>
						<TableCell style={{flex: 0.5}}>{getIcon(itemList.R4)}</TableCell>
						<TableCell
							color={itemList.AmostraCor}
							style={{
								flex: 2.0,
								color: getContrastColor(itemList.AmostraCor),
								borderColor: getContrastColor(itemList.AmostraCor),
							}}
						>
							{itemList.cor}
						</TableCell>
					</TableRow>
				))}
			</>
		);
	}

	return(
		<Portal>
			{data && data.length > 0 &&
			<Modal style={{		alignItems: 'center', justifyContent: 'center', backgroundColor: '#0007'}} onDismiss={onClose} visible={visible}>
				<MainContainer >
					<TableHeader>
						<TableTitle style={{flex: 0.5}}>#</TableTitle>
						<TableTitle style={{flex: 0.5}}>Seq</TableTitle>
						<TableTitle style={{flex: 1.0}}>Cartão</TableTitle>
						<TableTitle style={{flex: 4.0}}>Cliente</TableTitle>
						<TableTitle style={{flex: 1.0}}>Art</TableTitle>
						<TableTitle style={{flex: 0.5}}>Div</TableTitle>
						<TableTitle style={{flex: 0.5}}>g/m²</TableTitle>
						<TableTitle style={{flex: 0.5}}>lg.so</TableTitle>
						<TableTitle style={{flex: 0.5}}>lg.</TableTitle>
						<TableTitle style={{flex: 0.5}}>
							<Icon
								size={20}
								source={'scissors-cutting'}
								color='#fff'
							/>
						</TableTitle>
						<TableTitle style={{flex: 0.5}}>#</TableTitle>
						<TableTitle style={{flex: 0.5}}>gm</TableTitle>
						<TableTitle style={{flex: 0.5}}>R1</TableTitle>
						<TableTitle style={{flex: 0.5}}>R2</TableTitle>
						<TableTitle style={{flex: 0.5}}>R3</TableTitle>
						<TableTitle style={{flex: 0.5}}>R4</TableTitle>
						<TableTitle style={{flex: 2.0}}>Cor/Amostra</TableTitle>
					</TableHeader>
					<FlatList
						data={[data]}
						renderItem={renderItem}
					/>
				</MainContainer>
			</Modal>
			}
		</Portal>
	);
}
