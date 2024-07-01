import { DataTable, Icon, IconButton, Modal, Portal, Text } from 'react-native-paper';
import { MainContainer, TableCell, TableTitle, ViewInfo, modalProblemasStyles } from './styles';
import React from 'react';
import { ScrollView, View } from 'react-native';

interface ModalBoxProps {
  visible: boolean;
  close: () => void;
}

export default function ModalProblemas({ visible, close }: ModalBoxProps) {
	return (
		<Portal>
			<Modal
				style={modalProblemasStyles.modal}
				dismissableBackButton
				onDismiss={close}
				dismissable
				visible={visible}
			>
				<MainContainer>
					<IconButton
						onPress={close}
						icon={'window-close'}
						containerColor='#f00'
						iconColor='#fff'
						style={modalProblemasStyles.closeButton}
					/>
					<ViewInfo>
						<Text style={modalProblemasStyles.boldWhiteText}>Cartão: <Text style={modalProblemasStyles.whiteText}>888888 - NOR</Text></Text>
						<Text style={modalProblemasStyles.boldWhiteText}>Cliente: <Text style={modalProblemasStyles.whiteText}>000228 - X</Text></Text>
						<Text style={modalProblemasStyles.boldWhiteText}>Artigo: <Text style={modalProblemasStyles.whiteText}>ARTIGO 1</Text></Text>
						<Text style={modalProblemasStyles.boldWhiteText}>Cor: <Text style={modalProblemasStyles.whiteText}>S.47 - BEGE</Text></Text>
					</ViewInfo>

					<Text style={modalProblemasStyles.headerText}>TABELA DE PROBLEMAS</Text>
					<DataTable style={modalProblemasStyles.dataTable}>
						<DataTable.Header style={modalProblemasStyles.tableHeader}>
							<TableTitle textStyle={modalProblemasStyles.title}>ÍCONE</TableTitle>
							<TableTitle textStyle={modalProblemasStyles.title}>ONDE</TableTitle>
							<TableTitle textStyle={modalProblemasStyles.title}>DATA/HORA</TableTitle>
							<TableTitle textStyle={modalProblemasStyles.title}>MÁQUINA</TableTitle>
							<TableTitle textStyle={modalProblemasStyles.title}>PROBLEMA</TableTitle>
						</DataTable.Header>

						<ScrollView style={{ maxHeight: '100%' }}>
							<DataTable.Row>
								<TableCell textStyle={modalProblemasStyles.row}>0</TableCell>
								<TableCell textStyle={modalProblemasStyles.row}>a</TableCell>
								<TableCell textStyle={modalProblemasStyles.row}>a</TableCell>
								<TableCell textStyle={modalProblemasStyles.row}>a</TableCell>
								<TableCell textStyle={modalProblemasStyles.row}>a</TableCell>
							</DataTable.Row>
						</ScrollView>
					</DataTable>

					<View style={modalProblemasStyles.iconLegend}>
						<Text><Icon size={26} source={'forklift'}/> = Estoque</Text>
						<Text><Icon size={26} source={'format-paint'}/> = Tingimento</Text>
						<Text><Icon size={26} source={'scissors-cutting'}/> = Acabamento</Text>
						<Text><Icon size={26} source={'package-variant-closed'}/> = Sala de Pano</Text>
					</View>

				</MainContainer>
			</Modal>
		</Portal>
	);
}


