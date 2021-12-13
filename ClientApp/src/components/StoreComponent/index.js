import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

 const StoreComponent = (props) => {
    const copyRightStyle = {
        font: "10px Arial, sans-serif"
    };

    /* list stores */
    const [storesList, setStoresList] = useState([]);

    /* GET STORES LIST */
    const getStoresList = () => {
        let URL = "https://localhost:7192/api/Store/GetAll";

        axios.get(URL).then(response => {
            setStoresList(response.data);
        })
    }

    useEffect(() => {
        getStoresList();
    }, [])

    return (
        <div>
            <div>
                <Button
                    color="primary"
                >
                    New Store
                </Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {storesList.map(item => 
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td><Button color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT</Button></td>
                            <td><Button color="danger"><MdDelete color="white"/> DELETE</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div style={copyRightStyle}>&copy; 2020 - Laura Lu</div>
        </div>
    )
}

export default StoreComponent;
