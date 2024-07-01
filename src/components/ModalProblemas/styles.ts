import { Dimensions, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

export const MainContainer = styled.View`
  background-color: #4F8FCA;
  height: 90%;
  width: ${windowWidth - 200}px;
  border-radius: 5px;
  padding: 15px;
  justify-content: center;
  align-items: center;
`;
export const ViewInfo = styled.View`
  background-color: #152F46;
  flex: 1;
  justify-content: space-between;
  align-items: self-start;
  width: 100%;
  padding: 25px;
  border-radius: 10px;
`;



export const TableCell = styled(DataTable.Cell)`
  flex: 1;
  margin: 2px;
  padding: 5px 2px;
  align-items: center;
  justify-content: center;
  min-width: 60px;
`;

export const TableTitle = styled(DataTable.Title)`
  flex: 1;
  margin: 2px;
  padding: 5px 2px;
  align-items: center;
  justify-content: center;
`;

export const modalProblemasStyles = StyleSheet.create({
	modal: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeButton: {
		position: 'absolute',
		top: -30,
		right: -25,
		zIndex: 1,
	},
	dataTable: {
		backgroundColor: '#94a3b8',
		borderTopRightRadius: 6,
		borderTopLeftRadius: 6,
		flex: 1,
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
		maxWidth: 250,

	},
	row: {
		fontSize: 12,
		fontWeight: '700',
		color: '#000',
		textAlign: 'center',
		maxWidth: 250,
	},
	boldWhiteText: {
		fontSize: 24,
		color: '#fff',
		fontWeight: 'bold'
	},
	whiteText: {
		color: '#fff'
	},
	headerText: {
		fontSize: 24,
		color: '#fff',
		fontWeight: 'bold'
	},
	iconLegend: {
		flexDirection: 'row',
		gap: 15,
		marginTop: 5,
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '80%'
	}
});

