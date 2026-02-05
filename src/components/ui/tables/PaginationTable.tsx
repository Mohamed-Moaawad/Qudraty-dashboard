import './Table.css';
import { Pagination, Table } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';


type TColumn<T> = {
    key?: keyof T;
    label: string;
    render?: (row: T) => React.ReactNode;
};

type TPaginationTableProps<T> = {
    data: T[];
    columns: TColumn<T>[];
    totalPages: number;
    activePage: number;
    onPageChange: (page: number) => void;
    getLink?: boolean;
}

type BaseRow = { id: number | string; };

const PaginationTable = <T extends BaseRow>({
    data,
    columns,
    totalPages,
    activePage,
    onPageChange,
    getLink
}: TPaginationTableProps<T>) => {

    const location = useLocation();

    return (
        <div className='pagination-table'>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead >
                    <Table.Tr>
                        {columns.map((col, idx) => (
                            <Table.Th key={idx}>{col.label}</Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map((row, idx) => (
                        <Table.Tr key={idx}>
                            {columns.map((col, idx) => (
                                <Table.Td key={idx}>
                                    <Link to={
                                        getLink && "userType" in row
                                            ? row.userType === 'Student'
                                                ? `${location.pathname}/student-details/${row.id}`
                                                : `${location.pathname}/parent-details/${row.id}`
                                            : `${location.pathname}/${row.id}`
                                    }
                                        state={{ data: row }}
                                    >
                                        {col.render ? col.render(row) : col.key ? String(row[col.key]) : null}
                                    </Link>
                                </Table.Td>
                            ))}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            {/* Pagination component */}
            <div className="pagination-bar">
                <Pagination
                    total={totalPages}
                    value={activePage}
                    onChange={onPageChange}
                />
            </div>
        </div>
    )
}

export default PaginationTable;