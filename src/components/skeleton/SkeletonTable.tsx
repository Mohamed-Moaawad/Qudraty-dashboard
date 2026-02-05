import { Skeleton, Table } from "@mantine/core";

const SkeletonTable = () => {
    return (
        <div>
            {/* <div className="flex flex-wrap justify-between">
                <div className="w-full lg:w-7/12 mt-4">
                    <Skeleton height={20} width={'30%'} radius={0} />
                </div>
                <div className="w-full lg:w-3/12 flex gap-4 mt-4">
                    <Skeleton height={20} radius="lg" />
                    <Skeleton height={20} radius="lg" />
                </div>
            </div> */}

            <Table className="mt-8">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <Skeleton height={20} width={'70%'} radius={0} />
                        </Table.Th>
                        <Table.Th>
                            <Skeleton height={20} width={'70%'} radius={0} />
                        </Table.Th>
                        <Table.Th>
                            <Skeleton height={20} width={'70%'} radius={0} />
                        </Table.Th>
                        <Table.Th>
                            <Skeleton height={20} width={'70%'} radius={0} />
                        </Table.Th>
                        <Table.Th>
                            <Skeleton height={20} width={'70%'} radius={0} />
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                        <Table.Td>
                            <Skeleton height={20} width={'40%'} my={8} radius={0} />
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </div>
    );
};

export default SkeletonTable;