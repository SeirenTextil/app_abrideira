/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { MainContainerDesmarca, MainContainerMarca } from './styles';
import { Alert, StyleSheet, View } from 'react-native';
import { api } from '../../utils/api';

interface ModalLarguraProps {
  visible: boolean;
  close: () => void;
  cartao: string;
  desmarca: boolean;
  abrideira: string;
}

export default function ModalLargura({ visible, close, cartao, desmarca, abrideira }: ModalLarguraProps) {
	const [largura, setLargura] = useState(0);
	const [loading, setLoading] = useState(false);
	const [dialogVisible, setDialogVisible] = useState(false);
	const [message, setMessage] = useState('');

	async function marcaCartao(largura: number) {
		setLoading(true);
		if (largura > 0) {

			api.post('AbrideiraDesenroladeira/chama-dll?deviceName=API', {
				nomeDll: 'MarcaCartaoAbrideira',
				parametros: [`${cartao}|${largura}`]
			})
				.then((response) =>{
					const data = response.data.data;
					if (data.Situacao == '1') {
						setMessage(data.Mensagem);
					}else{
						setMessage(data.Mensagem);
					}
				})
				.catch((error) => Alert.alert('Atenção!', error.message))
				.finally(() =>
				{
					setDialogVisible(true);
					setLoading(false);
					setLargura(0);
					close();

				});
		} else{
			setLoading(false);
			setMessage('Insira um valor válido');
			setDialogVisible(true);

		}
	}

	async function desmarcaCartao() {
		setLoading(true);
		await api.post('AbrideiraDesenroladeira/chama-dll?deviceName=API', {
			nomeDll: 'DesmarcaCartao',
			parametros: [abrideira]
		})
			.then((response) =>{
				const data = response.data.data;
				if (data.Situacao == '1') {
					setMessage(data.Mensagem);
				}else{
					setMessage(data.Mensagem);
				}
			})
			.catch((error) =>  Alert.alert('Atenção!', error.message))
			.finally(() => {
				setDialogVisible(true);
				setLoading(false);
				close();

			});
	}

	return (
		<Portal>
			<Modal
				style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
				dismissableBackButton
				onDismiss={close}
				dismissable
				visible={visible}
			>
				{!desmarca &&
        <MainContainerMarca>
        	<IconButton
          		style={styles.closeButton}
          		onPress={close}
          		icon={'window-close'}
          		containerColor='#f00'
          		iconColor='#fff'
          	/>
          	<Text style={styles.text}>Insira a Largura  - {cartao}</Text>
        		<TextInput
          		mode="flat"
          		style={styles.searchbar}
          		keyboardType='numeric'
          		onChangeText={(a) => {
        			const value = Number(a);
        			value >= 100
        				? setLargura(value/100)
        				: setLargura(value);
        		}}
        		  cursorColor='#000'
        		  activeUnderlineColor='#000'
        	/>
          	<View style={{flexDirection: 'row', gap: 30}}>

          		<Button
          			textColor="#fff"
          			buttonColor="#aa0000"
          			contentStyle={styles.actionButtonContent}
          			mode="elevated"
          			onPress={() => close()}
          		>
          			<Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>CANCELAR</Text>

          		</Button>
          		<Button
        			  loading={loading}
          			textColor="#fff"
          			buttonColor="#63A346"
          			contentStyle={styles.actionButtonContent}
          			mode="elevated"
          			onPress={() => marcaCartao(largura)}
          		>
          			<Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>ENVIAR</Text>

          		</Button>
          	</View>
        </MainContainerMarca>
				}
				{desmarca &&
        <MainContainerDesmarca>
        	<IconButton
          		style={styles.closeButton}
          		onPress={close}
          		icon={'window-close'}
          		containerColor='#f00'
          		iconColor='#fff'
          	/>
        	<Text style={styles.text}>Deseja desmarcar o cartão: {cartao}?</Text>
        	<View style={{flexDirection: 'row', gap: 30}}>

        		<Button
        			textColor="#fff"
        			buttonColor="#aa0000"
        			contentStyle={styles.actionButtonContent}
        			mode="elevated"
        			onPress={() => close()}
        		>
        			<Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>CANCELAR</Text>

        		</Button>
        		<Button
        			loading={loading}
        			textColor="#fff"
        			buttonColor="#63A346"
        			contentStyle={styles.actionButtonContent}
        			mode="elevated"
        			onPress={() => desmarcaCartao()}
        		>
        			<Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>DESMARCAR</Text>

        		</Button>
        	</View>
        </MainContainerDesmarca>
				}
			</Modal>

			{message.length > 0 &&
				<Snackbar
					visible={dialogVisible}

					onDismiss={() => setDialogVisible(false)}
					action={{
						label: 'Fechar',
						onPress: () => {
							setDialogVisible(false);
						},
					}}>
					{message}
				</Snackbar>
			}
		</Portal>
	);
}

const styles = StyleSheet.create({
	closeButton: {
		position: 'absolute',
		top: -30,
		right: -25,
		zIndex: 1,
	},
	searchbar: {
		width: '100%',
		margin: 15,
		height: 45,

	},
	text: {
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fff'
	},
	actionButtonContent: {
		width: 250,
		height: 50,
	},
	dialogStyle:{

	}
});
