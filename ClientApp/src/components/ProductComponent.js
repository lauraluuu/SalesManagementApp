import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

 const ProductComponent = (props) => {

    const copyRightStyle = {
        font: "10px Arial, sans-serif"
    };

    /* list products */
    const [productsList, setProductsList] = useState([]);

    /* GET STORES LIST */
    const getProductsList = () => {
        let URL = "https://localhost:7192/api/Product/GetAll";

        axios.get(URL).then(response => {
            setProductsList(response.data);
        })
    }

    useEffect(() => {
        getProductsList();
    }, [])

    return (
        <div>
            <div>
                <Button
                    color="primary"
                >
                    New Product
                </Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productsList.map(item => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><Button color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT</Button></td>
                            <td><Button color="danger"><MdDelete color="white"/> DELETE</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={copyRightStyle}>&copy; 2020 - Laura Lu</div>
        </div>
    )
}

export default ProductComponent;
