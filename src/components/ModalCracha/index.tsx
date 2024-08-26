/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-mixed-spaces-and-tabs */
import { ActivityIndicator, Modal, Portal, Snackbar, Text } from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import { MainContainer, ViewCam, ViewText } from './styles';
import { CameraView } from 'expo-camera';
import { api } from '../../utils/api';
import { CrachaOperadorContext } from '../../context/crachaOperadorContext';
import { View } from 'react-native';

interface ModalBoxProps {
  visible: boolean;
  close: () => void;
}

export default function ModalCracha({ visible, close }: ModalBoxProps) {
	const [scanned, setScanned] = useState(false);
	const [message, setMessage] = useState('');
	const [showMessage, setShowMessage] = useState(false);
	const [loading, setLoading] = useState(false);
	const { hanldeSetCodOperador, hanldeSetNomeOperador, hanldeSetIsLider } = useContext(CrachaOperadorContext);

	useEffect(() => {
		handleScan({data: '1030101005'});
	}, []);


	async function validaLider(data: string){
		await api.get(`Cracha/cracha-maquina?codBar=${data}&codMaquina=LAV-X&deviceName=Api`)
			.then((response) => {
				const data = response.data.data;
				if (data.situacao === '0'){
					hanldeSetIsLider(true);
					close();
				}else if (data.situacao != '0') {
					hanldeSetIsLider(false);
				}
			})
			.catch((error) => console.error(error))
			.finally(() => {
				setScanned(false);
				setLoading(false);

			});
	}

	async function handleScan({ data }: any) {
		setScanned(true);
		setLoading(true);
		await api.get(`Cracha/cracha-maquina?codBar=${data}&codMaquina=X&deviceName=Api`)
			.then((response) => {
				const data = response.data.data;

				if (data.situacao === '1') {
					setMessage(data.descricao);
					setShowMessage(true);
				}
				else if (data.situacao === '0'){
					const codOperador = data.descricao.substring(0, 4);
					const split = data.descricao.split(' - ');
					const nomeOperador = split[1];
					hanldeSetCodOperador(codOperador);
					hanldeSetNomeOperador(nomeOperador);
					close();
				}
			})
			.catch((error) => console.error(error))
			.finally(() => {
			});

		await validaLider(data);
	}



	return (
		<>
			<Portal>
				<Modal
					dismissableBackButton
					onDismiss={close}
					dismissable
					visible={visible}
				>
					<MainContainer>
						<ViewCam>
							<CameraView onBarcodeScanned={scanned ? undefined : handleScan} facing='front' style={{ width: '100%', height: '100%' }}>
								{loading &&
									<View style={{flex: 1, backgroundColor: '#0005', position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
										<ActivityIndicator color='#fff'/>
									</View>
								}
							</CameraView>
						</ViewCam>
						<ViewText>
							<Text style={{ color: '#ffffff', textAlign: 'center', fontSize: 55, fontWeight: 'bold' }}>
                INFORME O CRACHÁ PARA O APONTAMENTO
							</Text>
						</ViewText>
					</MainContainer>
				</Modal>
				{showMessage &&
         		<Snackbar
         			visible={showMessage}
         			onDismiss={() => setShowMessage(false)}
         			action={{
         				label: 'Fechar',
         				onPress: () => {
         					setShowMessage(false);
         				},
         			}}>
         			{message}
         		</Snackbar>
				}

			</Portal>
		</>
	);
}
