import React from 'react';
import styled from 'styled-components';
import type { HistoryItem } from "./types";
import { Page3HistoryRow } from './Page3HistoryRow';

interface Page3HistoryTableProps {
    totalCount: number,
    history: HistoryItem[];
}

const TableContainer = styled.div`
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
`;


const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
 
  @media (max-width: 768px) {
    font-size: 12px;
    width: 100%;
  }
`;


const TR = styled.tr`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
`;


const ColumnHeader = styled.th`
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

const TFoot =styled.tfoot`
   background-color: #f5f5f5;
   font-weight: bold;
`;

const TD = styled.td`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    
    @media (max-width: 768px) {
        padding: 8px 10px;
    }
`;

const FooterTotal = styled(TD)`
  text-align: right;
  padding-right: 20px;
`

const FooterCount = styled(TD)`
  text-align: center;
  color: #1976d2;
  font-size: 16px;
`

export const Page3HistoryTable: React.FC<Page3HistoryTableProps> = ({
    totalCount,
    history
}) => {
    return (
        <TableContainer>
            <HistoryTable>
                <thead>
                    <TR>
                        <ColumnHeader>Дата</ColumnHeader>
                        <ColumnHeader>Имя</ColumnHeader>
                        <ColumnHeader>Фамилия</ColumnHeader>
                        <ColumnHeader>Количество отправок</ColumnHeader>
                        <ColumnHeader>Полное имя</ColumnHeader>
                    </TR>
                </thead>
                <tbody>
                    {history.map((item, index) => 
                        <Page3HistoryRow key={index} item={item} index={index} />
                    )}
                </tbody>
                <TFoot>
                    <TR>
                        <FooterTotal colSpan={3}>Всего:</FooterTotal>
                        <FooterCount>{totalCount}</FooterCount>
                        <TD />
                    </TR>
                </TFoot>
            </HistoryTable>
        </TableContainer>
    )

}