import { Dimensions } from 'react-native';
import {  DataTable, Text } from 'react-native-paper';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

export const MainContainer = styled.View`
  background-color: #3b82f6;
  width: ${windowWidth - 50}px;
  border-radius: 5px;
  padding: 15px;
  z-index: 999999999;
`;
interface TableCellProps{
  color: string;
}
export const TableCell = styled(Text)<TableCellProps>`
  text-align: center;
  font-size: 13px;
  color: #fff;
  background-color: ${({color}: TableCellProps) => color ? `rgb(${color})` : 'transparent'};
  padding: 5px;
`;
export const TableHeader = styled(DataTable.Header)`
  gap: 1px;
  background-color: #1e293b;
  color: #fff;
  padding: 10px 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

export const TableTitle = styled(Text)`
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  padding: 5px;
`;

export const TableRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1px;
  background-color: #6b7280;
  border-color:  #000;
  border-bottom-width: 1px;
  padding: 1px;
`;
