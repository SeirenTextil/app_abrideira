import { Button,  IconButton, Modal, Portal, Searchbar, SegmentedButtons } from 'react-native-paper';
import {  MainContainer, ViewActions, ViewBox, ViewButtons, modalBoxStyles } from './styles';
import React, { useState } from 'react';
import { ScrollView,  View } from 'react-native';

interface ModalBoxProps {
  visible: boolean;
  close: () => void;
}

export default function ModalBox({ visible, close }: ModalBoxProps) {
	const [searchQueries, setSearchQuery] = useState({
		searchBarMode: '',
		traileringIcon: '',
		traileringIconWithRightItem: '',
		rightItem: '',
		loadingBarMode: '',
		searchViewMode: '',
		searchWithoutBottomLine: '',
		loadingViewMode: '',
		clickableBack: '',
		clickableDrawer: '',
		clickableLoading: '',
	});
	const [value, setValue] = useState('boxFisico');

	return (
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
							inputStyle={{ minHeight: 0}}
							onChangeText={(query) =>
								setSearchQuery({ ...searchQueries, searchBarMode: query })
							}
							value={searchQueries.searchBarMode}
							placeholder="Search"
							onIconPress={() => console.log('')}
							style={modalBoxStyles.searchbar}
							cursorColor={'#418af0'}
							onEndEditing={() => console.log('')}
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
								onValueChange={setValue}
								buttons={[
									{
										value: 'boxFisico',
										label: 'Box Físico',
										style: [
											value === 'boxFisico' ? modalBoxStyles.selectedButton : modalBoxStyles.unselectedButton,
											modalBoxStyles.leftRadius,
										],
										labelStyle: value === 'boxFisico' ? modalBoxStyles.selectedLabel : modalBoxStyles.unselectedLabel,

									},
									{
										value: 'boxVirtual',
										label: 'Box Virtual',
										style: [
											value === 'boxVirtual' ? modalBoxStyles.selectedButton : modalBoxStyles.unselectedButton,
										],
										labelStyle: value === 'boxVirtual' ? modalBoxStyles.selectedLabel : modalBoxStyles.unselectedLabel,
									},
									{
										value: 'boxW',
										label: 'Box W',
										style: [
											value === 'boxW' ? modalBoxStyles.selectedButton : modalBoxStyles.unselectedButton,
											modalBoxStyles.rightRadius,
										],
										labelStyle: value === 'boxW' ? modalBoxStyles.selectedLabel : modalBoxStyles.unselectedLabel,
									},
								]}
							/>

							<ScrollView style={modalBoxStyles.scrollView} contentContainerStyle={modalBoxStyles.scrollViewContent}>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>
								<Button buttonColor='#CD3535' textColor='#fff' style={modalBoxStyles.boxButton} contentStyle={modalBoxStyles.boxButtonContent} mode='elevated'>
                  A1
								</Button>

							</ScrollView>
						</ViewBox>

						<ViewButtons>
							<ScrollView contentContainerStyle={modalBoxStyles.actionButtonsContainer}>
								<Button labelStyle={modalBoxStyles.actionButtonLabel} icon='lock-open' onPress={() => console.log('1')} contentStyle={modalBoxStyles.actionButton} textColor='#fff' buttonColor='#598843' mode='elevated'>
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
	);
}


