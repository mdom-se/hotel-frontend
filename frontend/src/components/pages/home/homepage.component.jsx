import React, { useState, useEffect } from "react";
import { getColumns, formatRowData } from "./data";
import AppTable from "../../table/table.component";
import Pagination from "../../table/pagination/pagination.component";
import { getHotelList, deleteHotel } from "../../utils/rest-api-call.component";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";


const HomePage = () => {

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalElements: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [searchHotelName, setSearchHotelName] = useState('');


    useEffect(() => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));
        getHotelList(currentPage, pageSize, searchHotelName).then((info) => {
            const { totalPages, totalElements, data } = info;
            setPageData({
                isLoading: false,
                rowData: formatRowData(data),
                totalPages,
                totalElements: totalElements
            });
        });
    }, [currentPage, searchHotelName]);

    const onChangeHandler = (event) => {
        const searchHotelNameString = event.target.value;
        setSearchHotelName(searchHotelNameString);
    };

    const handleDeleteHotel = (hotelId) => {
        console.info('deleteHotel: '+hotelId);
        deleteHotel(hotelId).then( response => {
            setCurrentPage(1)
            setSearchHotelName('')
        })

    }

    const columns = getColumns(handleDeleteHotel);

    return (
        <div>
            <div >
            Hotels
            </div>
        
            <p>Total Hotels: {pageData.totalElements || "Loading..."}</p>
            <div className="float-right">
                <Button color="success" tag={Link} to="/hotels/new">Create Hotel</Button>
            </div>
            <input
                className={`search-box`}
                type='search'
                placeholder={'Search hotel'}
                onChange={onChangeHandler}
                value={searchHotelName}
            />
            <div style={{ height: "600px" }}>
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
