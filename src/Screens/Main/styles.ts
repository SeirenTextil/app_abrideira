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

export const TableCell = styled(DataTable.Cell)`
  flex: 1;
  margin: 2px;
  padding: 5px 2px;
  align-items: center;
  justify-content: center;
  min-width: 65px;

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
	row: {
		fontSize: 12,
		fontWeight: '700',
		color: '#000',
		textAlign: 'center',
		maxWidth: 60,
	},
	actionButtonContent: {
		width: 250,
		height: 50,
	},
});
