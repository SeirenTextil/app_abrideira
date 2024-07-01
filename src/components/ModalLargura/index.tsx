import { Button, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import React from 'react';
import { MainContainer } from './styles';
import { StyleSheet, View } from 'react-native';

interface ModalBoxProps {
  visible: boolean;
  close: () => void;
  cartao: string;
}

export default function ModalLargura({ visible, close, cartao }: ModalBoxProps) {
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
					<Text style={styles.text}>Insira a Largura {cartao}</Text>
					<TextInput
						placeholder="Exemplo: 0,00"
						style={styles.searchbar}
						cursorColor='#000'
						activeUnderlineColor='#000'
						keyboardType='numeric'

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
							textColor="#fff"
							buttonColor="#00aa00"
							contentStyle={styles.actionButtonContent}
							mode="elevated"
							onPress={() => console.log('Pressed')}
						>
							<Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>ENVIAR</Text>

						</Button>
					</View>


				</MainContainer>

			</Modal>
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
		borderRadius: 0,
	},
	text:{
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#fff'
	},
	actionButtonContent: {
		width: 250,
		height: 50,
	},
});
