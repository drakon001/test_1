import styled from "styled-components";
import type { HistoryItem } from "./types";



const TD = styled.td`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    
    @media (max-width: 768px) {
        padding: 8px 10px;
    }
`;

const DateCell = styled(TD)`
   font-weight: 500;
`;

const NameCell = styled(TD)`
    font-weight: 500;
`;

const CountCell = styled(TD)`
    text-align: center;
`;

const FullNameCell =  styled(TD)`
    text-align: center;
    color: #777;
    font-style: italic;
`;

const RowEven = styled.tr`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f8f9fa;
    
    &:hover {
        background-color: #e3f2fd;
    }
`;


const RowOdd = styled.tr`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    background-color: white;

    &:hover {
        background-color: #e3f2fd;
    }
`;

const DateOriginal = styled.small`
  color: #777;
  font-size: 12px;
`;


const countBadgeStateStyle = (count: number = 0) => {
    if (count > 5 ) {
        return `
            background-color: #ffebee;
            color: #d32f2f;
        `
    }
    if (count > 2 ) {
        return `
            background-color: #fff3e0;
            color: #ef6c00;
        `
    }
    return `
        background-color: #e8f5e8;
        color: #2e7d32;
    `;
}


const CountBadge = styled.span<{ count: number }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 12px;
  min-width: 30px;
  text-align: center;
  ${props => countBadgeStateStyle(props.count)}
`;



export const Page3HistoryRow: React.FC<{ item: HistoryItem; index: number; }> = ({
    item,
    index
}) => {
    const Row = index % 2 === 0 ? RowEven : RowOdd;
    return (
        <Row>
            <DateCell>
                <DateOriginal>{item.date}</DateOriginal>
            </DateCell>
            <NameCell>{item.first_name}</NameCell>
            <NameCell>{item.last_name}</NameCell>
            <CountCell>
                <CountBadge count={item.count}>
                    {item.count}
                </CountBadge>
            </CountCell>
            <FullNameCell>
                {item.first_name} {item.last_name}
            </FullNameCell>
        </Row>
    )

}