import { Button } from "reactstrap";
import { ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";

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

