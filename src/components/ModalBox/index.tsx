import { ActivityIndicator, Button,  IconButton, Modal, Portal, Searchbar, SegmentedButtons } from 'react-native-paper';
import {  MainContainer, ViewActions, ViewBox, ViewButtons, modalBoxStyles } from './styles';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, ScrollView,  Text,  View } from 'react-native';
import { api } from '../../utils/api';
import ModalCartaoBox from '../ModalCartaoBox';

interface ModalBoxProps {
  visible: boolean;
  close: () => void;
}

type ListBoxProps = [string, {
  Box: string;
  Carrinho: string;
}]

export default function ModalBox({ visible, close }: ModalBoxProps) {
	const [searchQueries, setSearchQuery] = useState({
		searchBarMode: '',
	});
	const [value, setValue] = useState('F');
	const [listBox, setListBox] = useState<ListBoxProps[]>();
	const [cartoesBox, setCartoesBox] = useState<CartoesBox[]>();
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		getBox(value);
	}, [value]);

	async function getBox(box: string, query = '') {
		setLoading(true);
		await api.post('AbrideiraDesenroladeira/chama-dll?deviceName=API', {
			nomeDll: 'ListaBoxAcabamento',
			parametros: [box]
		})
			.then((response) => {
				const data = response.data.data;
				const ItemDetalheBox = Object.entries(data.ItemDetalheBox) as ListBoxProps[];
				let filteredList = ItemDetalheBox;
				if (query) {
					filteredList = ItemDetalheBox.filter(item =>
						item[1].Box.toLowerCase().includes(query.toLowerCase())
					);
				}
				setListBox(filteredList);
			})
			.catch((error) => Alert.alert('Atenção!', error.message))
			.finally(() => {
				setLoading(false);
			});
	}

	async function getCartoesBox(box:string) {
		setLoading(true);
		await api.post('AbrideiraDesenroladeira/chama-dll?deviceName=API', {
			nomeDll: 'ConteudoBoxAcabamento',
			parametros: [box]
		})
			.then((response) => {
				const data = response.data.data;
				const ItemDetalheCartoes = data && Object.entries(data.ItemDetalheCartoes) as CartoesBox[];
				setCartoesBox(ItemDetalheCartoes);
				setIsModalVisible(true);
			})
			.catch((error) => Alert.alert('Atenção!', error.message))
			.finally(() => {
				setLoading(false);
			});

	}

	function getColorByFirstDigit(digit: string): string {
		const colors: { [key: string]: string } = {
			'1': '#334155',
			'2': '#64748b',
			'3': '#334155',
			'4': '#64748b',
			'K': '#334155',
			'L': '#64748b',
		};
		return colors[digit] || '#334155';
	}

	function renderItem({item}: {item: ListBoxProps}) {
		const firstDigit = item[1].Box.charAt(0);
		const color = getColorByFirstDigit(firstDigit);
		return (
			<Button
				onPress={() => getCartoesBox(item[1].Box)}
				key={item[1].Box}
				buttonColor={color}
				textColor='#fff'
				style={modalBoxStyles.boxButton}
				contentStyle={modalBoxStyles.boxButtonContent}
				mode='elevated'
			>
				<View>
					<Text numberOfLines={20} style={{ color: '#fff', textAlign: 'center' }}>
						{item[1].Box} {item[1].Carrinho && '(' + item[1].Carrinho + ')'}
					</Text>
				</View>
			</Button>
		);
	}

	return (
		<>
			<ModalCartaoBox data={cartoesBox!}  visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
			<Portal>
				<Modal
					style={modalBoxStyles.modal}
					dismissableBackButton
					onDismiss={close}
					dismissable
					visible={visible}
				>
					<MainContainer>
						<IconButton onPress={() => close()} icon={'window-close'} containerColor='#f00' iconColor='#fff' style={modalBoxStyles.closeButton}/>
						<View style={modalBoxStyles.searchContainer}>
							<Searchbar
								inputStyle={{ minHeight: 0 }}
								onChangeText={(query) => {
									setSearchQuery({ ...searchQueries, searchBarMode: query });
									getBox(value, query);
								}}
								value={searchQueries.searchBarMode}
								placeholder="Pesquise pelo box..."
								style={modalBoxStyles.searchbar}
								cursorColor={'#418af0'}
							/>
							<Button textColor='#fff' style={modalBoxStyles.searchButton} contentStyle={modalBoxStyles.searchButtonContent}>
              Pesquisar
							</Button>
						</View>

						<ViewActions>
							<ViewBox>
								<SegmentedButtons
									density='regular'
									value={value}
									onValueChange={(value) => {
										setValue(value);
										getBox(value);
									}}

									buttons={[
										{
											value: 'F',
											label: 'Box Físico',
											style: [
												value === 'F' ? modalBoxStyles.selectedButton : modalBoxStyles.unselectedButton,
												modalBoxStyles.leftRadius,
											],
											labelStyle: value === 'F' ? modalBoxStyles.selectedLabel : modalBoxStyles.unselectedLabel,

										},
										{
											value: 'D',
											label: 'Box Virtual',
											style: [
												value === 'D' ? modalBoxStyles.selectedButton : modalBoxStyles.unselectedButton,
											],
											labelStyle: value === 'D' ? modalBoxStyles.selectedLabel : modalBoxStyles.unselectedLabel,
										},
										{
											value: 'W',
											label: 'Box W',
											style: [
												value === 'W' ? modalBoxStyles.selectedButton : modalBoxStyles.unselectedButton,
												modalBoxStyles.rightRadius,
											],
											labelStyle: value === 'W' ? modalBoxStyles.selectedLabel : modalBoxStyles.unselectedLabel,
										},
									]}
								/>

								{!loading &&
								<FlatList
									style={modalBoxStyles.scrollView}
									contentContainerStyle={modalBoxStyles.scrollViewContent}
									data={listBox}
									renderItem={renderItem}
									numColumns={5}
									columnWrapperStyle={{gap: 10}}
									refreshControl={<RefreshControl refreshing={false} onRefresh={() => getBox(value)} />}
								/>
								}
								{loading &&
								<View style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}>
									<ActivityIndicator color='#fff' />
								</View>
								}

							</ViewBox>

							<ViewButtons>
								<ScrollView contentContainerStyle={modalBoxStyles.actionButtonsContainer}>
									<Button labelStyle={modalBoxStyles.actionButtonLabel} icon='lock-open' onPress={() => console.log('1')} contentStyle={modalBoxStyles.actionButton} textColor='#fff' buttonColor='#598843' mode='elevated' elevation={5}>
                  Abrir
									</Button>
									<Button labelStyle={modalBoxStyles.actionButtonLabel} icon='lock' onPress={() => console.log('2')} contentStyle={modalBoxStyles.actionButton} textColor='#fff' buttonColor='#1557FF' mode='elevated'>
                  Trava
									</Button>
									<Button labelStyle={modalBoxStyles.actionButtonLabel} icon='arrow-left-right' onPress={() => console.log('3')} contentStyle={modalBoxStyles.actionButton} textColor='#fff' buttonColor='#C1A200' mode='elevated'>
                  Troca
									</Button>
									<Button labelStyle={modalBoxStyles.actionButtonLabel} icon='cancel' onPress={() => console.log('4')} contentStyle={modalBoxStyles.actionButton} textColor='#fff' buttonColor='#CD3535' mode='elevated'>
                  Cancela
									</Button>
								</ScrollView>
							</ViewButtons>
						</ViewActions>
					</MainContainer>
				</Modal>
			</Portal>
		</>

	);
}
