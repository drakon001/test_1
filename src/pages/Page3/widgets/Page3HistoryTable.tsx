import React from 'react';
import { Page3HistoryRow } from './Page3HistoryRow';
import type { Page3HistoryTableProps } from '../types';
import { ColumnHeader, FooterCount, FooterTotal, HistoryTable, TableContainer, TD, TFoot, TR } from '../ui/Page3HistoryTableStyledComponents';

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