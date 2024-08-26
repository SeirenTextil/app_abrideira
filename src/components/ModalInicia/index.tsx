/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { MainContainer } from './styles';
import { Alert, StyleSheet, View } from 'react-native';
import { api } from '../../utils/api';

interface ModalIniciaProps {
  visible: boolean;
  close: () => void;
  abrideira: string;
  cracha: string;
}

export default function ModalInicia({ visible, close, cracha,  abrideira }: ModalIniciaProps) {
	const [carrinho, setCarrinho] = useState('');
	const [loading, setLoading] = useState(false);
	const [dialogVisible, setDialogVisible] = useState(false);
	const [message, setMessage] = useState('');

	async function marcaCartao(carrinho: string) {
		setLoading(true);
		if (carrinho.length > 0) {

			api.post('AbrideiraDesenroladeira/chama-dll?deviceName=API', {
				nomeDll: 'IniciaCartaoAbrideira',
				parametros: [`${abrideira}|${cracha}|${carrinho}`]
			})
				.then((response) => {
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
					close();

				});
		} else{
			setLoading(false);
			setMessage('Insira um valor válido');
			setDialogVisible(true);

		}
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
				<MainContainer>
        	<IconButton
          		style={styles.closeButton}
          		onPress={close}
          		icon={'window-close'}
          		containerColor='#f00'
          		iconColor='#fff'
          	/>
          	<Text style={styles.text}>Insira o Carrinho</Text>
        		<TextInput
          		mode="flat"
          		style={styles.searchbar}
          		onChangeText={(a) => setCarrinho(a)}
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
          			onPress={() => marcaCartao(carrinho)}
          		>
          			<Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>ENVIAR</Text>

          		</Button>
          	</View>


				</MainContainer>

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
