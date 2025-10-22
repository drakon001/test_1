import styled from 'styled-components';

export const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
`;


export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
 
  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
  }
`;


export const TR = styled.tr`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
`;


export const ColumnHeader = styled.th`
    background-color: #1976d2;
    color: white;
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
    position: sticky;
    top: 0;

    @media (max-width: 768px) {
        padding: 8px 10px;
    }
`;

export const TFoot =styled.tfoot`
   background-color: #f5f5f5;
   font-weight: bold;
`;

export const TD = styled.td`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    
    @media (max-width: 768px) {
        padding: 8px 10px;
    }
`;

export const FooterTotal = styled(TD)`
  text-align: right;
  padding-right: 20px;
`

export const FooterCount = styled(TD)`
  text-align: center;
  color: #1976d2;
  font-size: 16px;
`
