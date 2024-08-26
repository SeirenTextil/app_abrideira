import {  PaperProvider } from 'react-native-paper';
import Main from './src/Screens/Main';
import { StatusBar } from 'react-native';
import ModalCracha from './src/components/ModalCracha';
import { useState } from 'react';
import { CrachaOperadorProvider } from './src/context/crachaOperadorContext';


export default function App() {
	const [isModaVisible, setIsModalVisible] = useState(true);

	return (
		<CrachaOperadorProvider>
			<PaperProvider>
				<StatusBar />
				<ModalCracha close={() => setIsModalVisible(false)} visible={isModaVisible}/>
				<Main/>
			</PaperProvider>
		</CrachaOperadorProvider>
	);
}
