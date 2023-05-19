import React, {useState, useEffect} from "react";
import {getData, columns, formatRowData} from "./data";
import AppTable from "../../table/table.component";
import Pagination from "../../table/pagination/pagination.component";
import { getHotelList } from "../../utils/rest-api-call.component";

const HomePage = () => {

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalElements: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));
        getHotelList(currentPage, pageSize).then((info) => {
            const {totalPages, totalElements, data} = info;
            setPageData({
                isLoading: false,
                rowData: formatRowData(data),
                totalPages,
                totalElements: totalElements
            });
        });
    }, [currentPage]);

    return (
        <div>
            <p>Total Hotels: {pageData.totalElements || "Loading..."}</p>
            <button onClick={() => setCurrentPage(1)}>Reset</button>
            <div style={{height: "600px"}}>
                <AppTable
                    columns={columns}
                    data={pageData.rowData}
                    isLoading={pageData.isLoading}
                />
            </div>
            <Pagination
                totalRows={pageData.totalElements}
                pageChangeHandler={setCurrentPage}
                rowsPerPage={pageSize}
                currentPage={currentPage}
            />
        </div>
    );
};

export default HomePage;
