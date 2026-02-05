import './Table.css';
import { Table } from '@mantine/core';

type TColumn<T> = {
    key: keyof T;
    label: string;
}

type TCustomTableType<T> = {
    data: T[];
    columns: TColumn<T>[];
};


const CustomTable = <T extends object>({ data, columns }: TCustomTableType<T>) => {
    // const rows = data.map((element) => (
    //     <Table.Tr key={element.name}>
    //         <Table.Td>{element.name}</Table.Td>
    //         <Table.Td>{element.type}</Table.Td>
    //         <Table.Td>{element.phone}</Table.Td>
    //         <Table.Td>{element.relation}</Table.Td>
    //         <Table.Td>{element.subscription}</Table.Td>
    //         <Table.Td style={{ color: element.statusType ? 'green' : 'red' }}>{element.status}</Table.Td>
    //         <Table.Td>{element.id}</Table.Td>
    //     </Table.Tr>
    // ));
    return (
        <div className='custom-table'>
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead >
                    <Table.Tr>
                        {columns.map((col, idx) => (
                            <Table.Th key={idx}> {col.label}</Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {data.map((row, rowIdx) => (
                        <Table.Tr key={rowIdx}>
                            {columns.map((col, colIdx) => (
                                <Table.Td key={colIdx}>
                                    {String(row[col.key])}
                                </Table.Td>
                            ))}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </div>
    )
}

export default CustomTable