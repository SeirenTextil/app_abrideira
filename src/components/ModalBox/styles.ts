import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

export const MainContainer = styled.View`
  background-color: #4F8FCA;
  height: 90%;
  width: ${windowWidth - 200}px;
  border-radius: 5px;
  padding: 15px;
  z-index: -1;
`;

export const ViewButtons = styled.View`
  flex: 1;
  border-radius: 10px;
  max-width: 20%;
  justify-content: space-between;
`;

export const ViewBox = styled.View`
  flex: 1;
  border-radius: 10px;
  background-color: #152F46;
`;

export const ViewActions = styled.View`
  flex: 1;
  flex-direction: row;
  gap: 10px;
`;

export const modalBoxStyles = StyleSheet.create({
	modal: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	searchbar: {
		flex: 1,
		marginBottom: 15,
		borderRadius: 15,
		height: 45,
	},
	searchButton: {
		width: '20%',
		borderRadius: 8,
	},
	searchButtonContent: {
		backgroundColor: '#598843',
		height: 45,
	},
	selectedButton: {
		backgroundColor: '#2563eb',
		borderColor: '#171717',
	},
	unselectedButton: {
		backgroundColor: '#4F80CA',
		borderColor: '#171717',
	},
	selectedLabel: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
	unselectedLabel: {
		color: '#FFFFFF',
		fontSize: 16,
	},
	leftRadius: {
		borderRadius: 0,
		borderTopLeftRadius: 10,
	},
	rightRadius: {
		borderRadius: 0,
		borderTopRightRadius: 10,
	},
	scrollView: {
		flex: 1,
	},
	scrollViewContent: {
		gap: 10,
		padding: 15,
	},
	boxButton: {
		borderRadius: 5,
		alignContent: 'center',
		justifyContent: 'center',
	},
	boxButtonContent: {
		height: 68,
		width: 150,
		alignContent: 'center',
		justifyContent: 'center',
	},
	actionButtonsContainer: {
		justifyContent: 'space-between',
		flex: 1,
	},
	actionButtonLabel: {
		fontSize: 18,
	},
	actionButton: {
		height: 80,
		alignContent: 'center',
		justifyContent: 'center',
		marginVertical: 10,
	},
	closeButton: {
		position: 'absolute',
		top: -30,
		right: -25,
		zIndex: 1,
	}
});

