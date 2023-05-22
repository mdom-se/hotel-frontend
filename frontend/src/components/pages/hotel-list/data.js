import { Button } from "reactstrap";
import { ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

export const getColumns = (handleDelete) => {
    return [
        {
            Header: "Name",
            accessor: "hotelName",
        },
        {
            Header: "Address",
            accessor: "address",
        },
        {
            Header: "Rating",
            accessor: "rating",
            Cell: (object, _unused) => {
                const { value } = object;
                return (
                    <Rating name="rating" value={value} readOnly />
                )
            }
        },
        {
            Header: "Actions",
            accessor: "hotelId",
            Cell: (object, _unused) => {
                const { value } = object;
                return (
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/hotels/" + value} >Edit</Button>
                        <Button size="sm" onClick={() => handleDelete(value)} color="danger">Delete</Button>
                    </ButtonGroup>
                );
            }
        }
    ]
};

export const formatRowData = (rawData) =>
    rawData.map((info) => ({
        hotelName: info.hotelName,
        address: info.address,
        rating: info.rating,
        hotelId: info.hotelId
    }));

