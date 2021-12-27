import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import CopyRight from '../CopyRight';
import AddSalesModal from './AddSalesModal';
import EditSalesModal from './EditSalesModal';
import DeleteSalesModal from './DeleteSalesModal';
import Pagination from '../Pagination/Pagination';
import RowOptionsDropDown from '../Pagination/RowOptionsDropDown';

 const SalesComponent = (props) => {
    const [salesList, setSalesList] = useState([]);
    const [storesList, setStoresList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [customersList, setCustomersList] = useState([]);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    /* GET SALES LIST */
    const getSalesList = () => {
        let URL = "https://sales-manage-app.azurewebsites.net/api/Sales/GetAll";

        axios.get(URL).then(response => {
            setSalesList(response.data);
        })
    }

    /* GET STORES LIST */
    const getStoresList = () => {
        let URL = "https://sales-manage-app.azurewebsites.net/api/Store/GetAll";

        axios.get(URL).then(response => {
            setStoresList(response.data);
        })
    }

    /* GET PRODUCT LIST */
    const getProductsList = () => {
        let URL = "https://sales-manage-app.azurewebsites.net/api/Product/GetAll";

        axios.get(URL).then(response => {
            setProductsList(response.data);
        })
    }

    /* GET CUSTOMERS LIST */
    const getCustomersList = () => {
        let URL = "https://sales-manage-app.azurewebsites.net/api/Customer/GetAll";

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

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = salesList.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRowOptionsDropDown = (value) => {
        console.log(value);
        setPostsPerPage(value);
    };

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
                    {currentPosts.map(sales => (
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

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={productsList.length}
                paginate={paginate}
            />

            <RowOptionsDropDown
                handleRowOptionsDropDown={handleRowOptionsDropDown}
                fetchData={getProductsList}
            />
            <br />

            <CopyRight />
        </div>
    )
}

export default SalesComponent;
