import React, { useState, useEffect } from "react";
import { getColumns, formatRowData } from "./data";
import AppTable from "../../table/table.component";
import Pagination from "../../table/pagination/pagination.component";
import { getHotelList, deleteHotel } from "../../utils/rest-api-call.component";
import { Button, Col, Container, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import AlertMessage from '../alert/alert-message.component';
import { getAlertMessageUtil } from '../alert/alert-message-utils';

const HotelList = () => {

    const [pageData, setPageData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalElements: 0,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [searchHotelName, setSearchHotelName] = useState('');


    const emptyAlertMessage = { isOpen: false, message: '', type: 'success' };
    const [showAlertMessage, setShowAlertMessage] = useState(emptyAlertMessage);

    const initStatePageDate = (isLoading) => {
        setPageData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: isLoading,
        }));
    }
    useEffect(() => {
        initStatePageDate(true);
        getHotelList(currentPage, pageSize, searchHotelName).then((info) => {
            const { result, statusCode, message } = info;
            if (statusCode === 200) {
                const { totalElements, totalPages, hotelDtoList } = result;
                setPageData({
                    isLoading: false,
                    rowData: formatRowData(hotelDtoList),
                    totalPages,
                    totalElements: totalElements
                });
            }else{
                initStatePageDate(false);
                setShowAlertMessage(getAlertMessageUtil({statusCode, message}))
            }

        }).catch(response => {
            initStatePageDate(false);
            setShowAlertMessage(getAlertMessageUtil(response))
        });
    }, [currentPage, searchHotelName]);

    const onChangeHandler = (event) => {
        const searchHotelNameString = event.target.value;
        setSearchHotelName(searchHotelNameString);
    };

    const handleDeleteHotel = (hotelId) => {
        console.info('deleteHotel: ' + hotelId);
        deleteHotel(hotelId).then(response => {
            setCurrentPage(1)
            setSearchHotelName('')
            setShowAlertMessage(getAlertMessageUtil(response, 'The hotel was deleted'))
        }).catch(response => setShowAlertMessage(getAlertMessageUtil(response)))

    }

    const columns = getColumns(handleDeleteHotel);


    const handleCloseAlertMessage = () => {
        setShowAlertMessage(emptyAlertMessage);
    }

    return (
        <Container>
            <FormGroup row>
                <Col sm={3}>
                    <Input
                        className={`search-box`}
                        type='search'
                        placeholder={'Search hotel'}
                        onChange={onChangeHandler}
                        value={searchHotelName}
                    />
                </Col>
                <Col sm={{ size: 2, offset: 7 }} >
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/hotels/new">Create Hotel</Button>
                    </div>
                </Col>
            </FormGroup>
            <FormGroup row>
                <AppTable
                    columns={columns}
                    data={pageData.rowData}
                    isLoading={pageData.isLoading}
                />
            </FormGroup>
            <FormGroup row>
                <Pagination
                    totalRows={pageData.totalElements}
                    pageChangeHandler={setCurrentPage}
                    rowsPerPage={pageSize}
                    currentPage={currentPage}
                />
            </FormGroup>
            <AlertMessage
                message={showAlertMessage.message}
                type={showAlertMessage.type}
                isOpen={showAlertMessage.isOpen}
                handleClose={handleCloseAlertMessage} />
        </Container>

    );
};

export default HotelList;
