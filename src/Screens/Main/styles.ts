import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import styled from 'styled-components/native';

export const MainContainer = styled.View`
  flex: 1;
  padding: 10px;
  background-color: #020617;
  align-items: center;
  justify-content: center;
`;

export const TableCell = styled.Text`
  flex: 1;
  margin: 2px;
  padding: 5px 2px;
  text-align: center;  /* Centraliza o texto horizontalmente */
  min-width: 65px;
  align-items: center;
  align-self: center;  /* Centraliza o próprio componente no eixo vertical */
  font-size: 12px;
  font-weight: 600;
`;

export const TouchableIcon = styled.TouchableOpacity`
  flex: 1;
  margin: 2px;
  padding: 5px 2px;
  min-width: 65px;
  align-items: center;
  justify-content: center;
`;
interface AmostraProps{
  color?: string;
}

export const Amostra = styled.View<AmostraProps>`
  background-color: rgb(${({color}: AmostraProps) => color ? color : '0,0,0'});
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #000;
`;


export const TableTitle = styled(DataTable.Title)`
  flex: 1;
  margin: 2px;
  padding: 5px 2px;
  align-items: center;
  justify-content: center;
`;

export const ViewButtons = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const ViewDesvia = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: #0005;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
`;

export const ViewContentDesvia = styled.View`
  background-color: #4F8FCA;
  height: 250px;
  min-width: 40%;
  border-radius: 5px;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

export const mainStyles = StyleSheet.create({
	helpButton: {
		height: 30,
		width: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#2196F3',
		borderRadius: 20,
		position: 'absolute',
		top: 30,
		right: 20,

	},
	description: {
		justifyContent: 'center',
		position: 'absolute',
		top: 30,
		left: 20,
	},
	searchbar: {
		width: '50%',
		margin: 15,
		borderRadius: 15,
		height: 45
	},
	scrollView: {
		width: '100%',
		maxHeight: 600,
		marginBottom: 5,
	},
	dataTable: {
		backgroundColor: '#94a3b8',
		borderTopRightRadius: 6,
		borderTopLeftRadius: 6,
	},
	tableHeader: {
		backgroundColor: '#1e293b',
		borderRadius: 5,
	},
	title: {
		fontSize: 15,
		fontWeight: '900',
		color: '#fff',
		textAlign: 'center',
		flexWrap: 'wrap',
		maxWidth: 60,


	},
	actionButtonContent: {
		width: 250,
		height: 50,
	},
});
