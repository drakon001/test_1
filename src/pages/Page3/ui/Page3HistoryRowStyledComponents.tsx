import styled from "styled-components";

const TD = styled.td`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    
    @media (max-width: 768px) {
        padding: 8px 10px;
    }
`;

export const DateCell = styled(TD)`
   font-weight: 500;
`;

export const NameCell = styled(TD)`
    font-weight: 500;
`;

export const CountCell = styled(TD)`
    text-align: center;
`;

export const FullNameCell =  styled(TD)`
    text-align: center;
    color: #777;
    font-style: italic;
`;

export const RowEven = styled.tr`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f8f9fa;
    
    &:hover {
        background-color: #e3f2fd;
    }
`;


export const RowOdd = styled.tr`
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    background-color: white;

    &:hover {
        background-color: #e3f2fd;
    }
`;

export const DateOriginal = styled.small`
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


export const CountBadge = styled.span<{ count: number }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 12px;
  min-width: 30px;
  text-align: center;
  ${props => countBadgeStateStyle(props.count)}
`;

