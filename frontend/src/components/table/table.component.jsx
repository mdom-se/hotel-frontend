import React, {useMemo} from "react";
import {useTable} from "react-table";
import Loader from "./loader/loader.component";
import { Table } from "reactstrap";

const AppTable = ({columns, data, isLoading, manualPagination = false}) => {

    const columnData = useMemo(() => columns, [columns]);
    const rowData = useMemo(() => data, [data]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: columnData,
        data: rowData,
        manualPagination,
    });

    return (
        <>
            {isLoading ? (
                <Loader/>
            ) : (
                <>
                    <Table {...getTableProps()}>
                        <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                    {manualPagination && (
                        <div>
                            {/* YOUR CLIENT SIDE PAGINATION COMPONENT BUILT USING REACT-TABLE UTILITY FUNCTIONS */}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default AppTable;
