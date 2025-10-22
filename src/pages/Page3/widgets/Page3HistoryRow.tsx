
import type { HistoryItem } from "../types";
import { 
    CountBadge, CountCell, DateCell, DateOriginal, FullNameCell, NameCell, RowEven, RowOdd 
} from "../ui/Page3HistoryRowStyledComponents";

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