import {  PaperProvider } from 'react-native-paper';
import Main from './src/Screens/Main';
import { StatusBar } from 'react-native';


export default function App() {
	return (
		<PaperProvider>
			<StatusBar />
			<Main/>
		</PaperProvider>
	);
}
