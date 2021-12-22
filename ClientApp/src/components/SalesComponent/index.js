import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCheck2, BsX } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';
import CopyRight from '../CopyRight';
import AddSalesModal from './AddSalesModal';
import EditSalesModal from './EditSalesModal';
import DeleteSalesModal from './DeleteSalesModal';

 const SalesComponent = (props) => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [salesList, setSalesList] = useState([]);
    const [storesList, setStoresList] = useState([]);
    const [store, setStore] = useState({id: '',  name: '', address: '' });
    const [productsList, setProductsList] = useState([]);
    const [product, setProduct] = useState({id: '', price: null, name: '' });
    const [customersList, setCustomersList] = useState([]);
    const [customer, setCustomer] = useState({id: '',  name: '', address: '' });
    const [dateSold, setDateSold] = useState('');

    /* GET SALES LIST */
    const getSalesList = () => {
        let URL = "https://localhost:7192/api/Sales/GetAll";

        axios.get(URL).then(response => {
            setSalesList(response.data);
        })
    }

    /* GET STORES LIST */
    const getStoresList = () => {
        let URL = "https://localhost:7192/api/Store/GetAll";

        axios.get(URL).then(response => {
            setStoresList(response.data);
        })
    }

    /* GET PRODUCT LIST */
    const getProductsList = () => {
        let URL = "https://localhost:7192/api/Product/GetAll";

        axios.get(URL).then(response => {
            setProductsList(response.data);
        })
    }

    /* GET CUSTOMERS LIST */
    const getCustomersList = () => {
        let URL = "https://localhost:7192/api/Customer/GetAll";

        axios.get(URL).then(response => {
            setCustomersList(response.data);
        })
    }

    useEffect(() => {
        getSalesList();
        getStoresList();
        getProductsList();
        getCustomersList();
    }, [])

    /* CHANGE CUSTOMER INPUT */
    const handleCustomerInputChange = (event) => {
        const { name, value } = event.target;
        let customerNewReference = { ...customer, [name]: value };
        setCustomer(customerNewReference);
    }

    /* CHANGE PRODUCT INPUT */
    const handleProductInputChange = (event) => {
        const { name, value } = event.target;
        let productNewReference = { ...product, [name]: value };
        setCustomer(productNewReference);
    }

    /* CHANGE STORE INPUT */
    const handleStoreInputChange = (event) => {
        const { name, value } = event.target;
        let storeNewReference = { ...customer, [name]: value };
        setCustomer(storeNewReference);
    }

    /* CHANGE DATE INPUT */
    const handleDateSoldInputChange = (event) => {
        setDateSold(event.target.value);
    }


    return (
        <div>
            <div>
                <AddSalesModal getSalesList={getSalesList} customersList={customersList} storesList={storesList} productsList={productsList} />
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Store</th>
                    <th>Date Sold</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {salesList.map(sales => (
                        <tr key={sales.id}>
                            <td>{sales.customer.name}</td>
                            <td>{sales.product.name}</td>
                            <td>{sales.store.name}</td>
                            <td>{new Date(sales.dateSold).toLocaleDateString()}</td>
                            <td><EditSalesModal sales={sales} id={sales.id} getSalesList={getSalesList} customersList={customersList} storesList={storesList} productsList={productsList} /></td>
                            <td><DeleteSalesModal sales={sales} getSalesList={getSalesList} /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CopyRight />
        </div>
    )
}

export default SalesComponent;
