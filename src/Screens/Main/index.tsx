import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import { DataTable, Searchbar, Icon, Button, Text, ActivityIndicator, Tooltip } from 'react-native-paper';
import { Amostra, MainContainer, TableCell, TableTitle, ViewButtons } from './styles';
import ModalBox from '../../components/ModalBox';
import { mainStyles } from './styles';
import { api } from '../../utils/api';
import { ButtonVisibility, Data, ItemListaCartoes } from './types';
import DialogHelper from '../../components/DialogHelper';
import ModalProblemas from '../../components/ModalProblemas';
import ModalLargura from '../../components/ModalLargura';

export default function Main() {
	const arrayColor = [
		{ id: 'POKER16', icon: 'fruit-citrus', name: 'Banho Utilizando Corante Cítrico' },
		{ id: 'BLACKPIN16', icon: 'clipboard-alert', name: 'Marcado c/ Problema de Largura' },
		{ id: 'REDPIN16', icon: 'note-alert', name: 'Marcado c/ Problema de Gramatura' },
		{ id: 'OGIVA16', icon: 'file-alert', name: 'Marcado c/ Problema de Larg./Gram.' },
		{ id: 'BLUEPIN16', icon: 'folder-information', name: 'Banho Marcado para abrir' },
		{ id: 'WARNING', icon: 'clock-alert', name: 'Prioridade' },
		{ id: 'ERROR', icon: 'water-alert', name: 'Prioridade fora de cor' },
		{ id: 'NO', icon: 'close-circle', name: 'Fora de cor' },
		{ id: 'PRERAMA', icon: 'autorenew', name: 'Pré-Ramosa' },
		{ id: 'FINAL', icon: 'flag-checkered', name: 'Final' },
		{ id: 'SECAGEM', icon: 'hair-dryer', name: 'Secagem' },
		{ id: 'CALANDRA', icon: 'iron', name: 'Calandra' },
		{ id: 'FORADECOR', icon: 'close-circle', name: 'Fora de cor' },
		{ id: 'SUPERVISORIO', icon: 'monitor', name: 'Banho no Supervisório' },
		{ id: 'INFOPCP', icon: 'information', name: 'Instrução do Setor Pcp' },
		{ id: 'PROBLEMAS', icon: 'alert', name: 'Problemas' },
	];
	const [searchQueries, setSearchQuery] = useState({
		searchBarMode: '',
	});
	const [visible, setVisible] = useState<ButtonVisibility>({});
	const [dataTable, setDataTable] = useState<ItemListaCartoes[]>();
	const [showDialog, setShowDialog] = useState(false);
	const [lastData, setLastData] = useState<ItemListaCartoes[] | undefined>();
	const [lastDateUpdate, setLastDateUpdate] = useState('');
	const [loading, setLoading] = useState(false);
	const [cartao, setCurrentCartao] = useState('');

	const getVisible = (name: string) => !!visible[name];

	useEffect(() => {
		getTableData();
	}, []);

	useEffect(() => {
		const interval = setInterval(getTableData, 30000);
		return () => clearInterval(interval);
	}, []);

	function toggleModal(name: string) {
		setVisible({ ...visible, [name]: !visible[name] });
	}

	function getIcon(name: string) {
		const filter = arrayColor.find(({id}) => id.toUpperCase() === name.toUpperCase());
		return filter?.icon.toString();
	}

	async function getTableData(query = ''){
		setLoading(true);
		await api.post('AbrideiraDesenroladeira/chama-dll?deviceName=API', {
			nomeDll: 'GetFilaAbrideira',
			parametros: ['2']
		}).then((response) => {
			const data: Data = response.data.data;
			let currentData = Object.entries(data.ItemListaCartoes) as ItemListaCartoes[];

			if (query) {
				currentData = currentData.filter(([, item]) =>
					item.Cartao.toString().includes(query)
				);
			}

			// Verifica se os dados são diferentes dos últimos dados recebidos
			if (JSON.stringify(currentData) !== JSON.stringify(lastData)) {
				setDataTable(currentData);
				setLastData(currentData); // Atualiza o último resultado
			}
			const currentDate = new Date().toLocaleString();
			setLastDateUpdate(currentDate);

		})
			.catch((err) => console.log(err.message))
			.then(() => {
				setLoading(false);
			})
		;
	}

	return (
		<>
			<ModalBox close={() => toggleModal('modalBox')} visible={getVisible('modalBox')} />
			<ModalProblemas close={() => toggleModal('modalProblemas')} visible={getVisible('modalProblemas')} />
			<ModalLargura cartao={cartao} close={() => toggleModal('modalLargura')} visible={getVisible('modalLargura')} />

			<DialogHelper close={() => setShowDialog(false)} visible={showDialog}/>

			<MainContainer>

				<TouchableOpacity onPress={() => setShowDialog(!showDialog)} style={mainStyles.helpButton}>
					<Icon size={18} source="help" color="#fff" />
				</TouchableOpacity>

				<Searchbar
					onChangeText={(query) =>{
						setSearchQuery({ ...searchQueries, searchBarMode: query });
						getTableData(query);
					}}
					value={searchQueries.searchBarMode}
					placeholder="Pesquise pelo cartão..."
					onIconPress={() => console.log('')}
					style={mainStyles.searchbar}
					inputStyle={{ minHeight: 0}}
					cursorColor={'#418af0'}

				/>
				<ScrollView
					refreshControl={<RefreshControl refreshing={false} onRefresh={getTableData} />}
					stickyHeaderIndices={[1]}
					style={mainStyles.scrollView}
				>
					<Text style={{color: '#fff'}}>Última atualização: {lastDateUpdate}</Text>

					<DataTable.Header style={mainStyles.tableHeader}>
						<TableTitle textStyle={mainStyles.title}>#</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Cartão</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Tipo</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Cliente</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Artigo</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Cor</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Divisão</TableTitle>
						<TableTitle textStyle={mainStyles.title}>g/m²</TableTitle>
						<TableTitle textStyle={mainStyles.title}>lg.sol</TableTitle>
						<TableTitle textStyle={mainStyles.title}>#</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Larg.</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Espera</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Grupo</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Mq</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Seq</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Box</TableTitle>
						<TableTitle textStyle={mainStyles.title}>Amostra</TableTitle>
					</DataTable.Header>

					<DataTable style={mainStyles.dataTable}>
						{dataTable && dataTable.map(([,item]) => (
							<DataTable.Row

								onLongPress={() => {
									setCurrentCartao(item.Cartao);
									toggleModal('modalLargura');
								}}
								style={{backgroundColor: `rgb(${item.CorLinha})`, borderColor: '#000'}} key={item.Cartao}>

								<Tooltip title={arrayColor.find(({id}) => id === item.PrimeiroIcone)?.name || 'Nenhum Status'}>
									<TableCell numberOfLines={undefined} textStyle={mainStyles.row} color={getIcon(item.PrimeiroIcone)}>
										<Icon size={26} source={getIcon(item.PrimeiroIcone)}/>
									</TableCell>
								</Tooltip>

								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.Cartao}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.Tipo}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.NomeCliente}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.CodArt}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.CodCor} - {item.NomeCor}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.Divisao}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.GramaDataColor}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.LarguraSol}</TableCell>

								<Tooltip leaveTouchDelay={3000}
									title={item.IconeProcessoFazer === 'INFOPCP' ? item.InstrucaoPcp : (arrayColor.find(({ id }) => id === item.IconeProcessoFazer)?.name || 'Nenhum Status')}>
									<TableCell onPress={() => item.IconeProcessoFazer === 'PROBLEMAS' && toggleModal('modalProblemas')} numberOfLines={undefined} textStyle={mainStyles.row} color={getIcon(item.IconeProcessoFazer)}>
										<Icon size={26} source={getIcon(item.IconeProcessoFazer)}/>
									</TableCell>
								</Tooltip>

								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.LarguraInformada}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.Espera}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.Grupo}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.Rama}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.SequenciaBanhoAgrupa}</TableCell>
								<TableCell numberOfLines={undefined} textStyle={mainStyles.row}>{item.BoxAgrupamento}</TableCell>
								<TableCell>
									<Amostra color={item.CorAmostra} />
								</TableCell>
							</DataTable.Row>
						))}


					</DataTable>
					{dataTable && dataTable?.length === 0  &&
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text style={{color: '#fff', textAlign: 'center'}}>Nenhum resultado encontrado</Text>
          </View>
					}
					{
						loading && <ActivityIndicator size={40} color="#fff" />
					}
				</ScrollView>

				<ViewButtons>
					<Button
						textColor="#000"
						buttonColor="#598843"
						contentStyle={mainStyles.actionButtonContent}
						icon="play"
						mode="elevated"
						onPress={() => console.log('Pressed')}
					>
            INICIA/FINALIZA
					</Button>
					<Button
						textColor="#000"
						buttonColor="#CD3535"
						contentStyle={mainStyles.actionButtonContent}
						icon="border-bottom-variant"
						mode="elevated"
						onPress={() => toggleModal('modalBox')}
					>
            BOX
					</Button>
					<Button
						textColor="#000"
						buttonColor="#1557FF"
						contentStyle={mainStyles.actionButtonContent}
						icon="call-split"
						mode="elevated"
					>
            DESVIA
					</Button>
					<Button
						textColor="#000"
						buttonColor="#C1A200"
						contentStyle={mainStyles.actionButtonContent}
						icon="alert"
						mode="elevated"
						onPress={() => console.log('Pressed')}
					>
            APONTA
					</Button>
				</ViewButtons>
			</MainContainer>
		</>
	);
}
