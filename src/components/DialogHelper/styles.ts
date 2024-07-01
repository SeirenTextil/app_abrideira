import styled from 'styled-components/native';

export const ViewInfo = styled.View`
  max-height: 150px;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 20px;
  align-items: flex-start;
  justify-content: flex-start;
`;

interface AmostraProps{
  color?: string;
}

export const Amostra = styled.View<AmostraProps>`
  background-color: rgb(${({color}: AmostraProps) => color ? color : '0,0,0'});
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;


export const TextInfo = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;
