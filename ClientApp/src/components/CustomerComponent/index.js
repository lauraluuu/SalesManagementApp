import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import CopyRight from '../CopyRight';
import AddCustomerModal from './AddCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import Pagination from '../Pagination/Pagination';
import RowOptionsDropDown from '../Pagination/RowOptionsDropDown';


 const CustomerComponent = (props) => {
    const [customersList, setCustomersList] = useState([]);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);


    /* GET CUSTOMERS LIST */
    const getCustomersList = () => {
        let URL = "https://sales-manage-app.azurewebsites.net/api/Customer/GetAll";

        axios.get(URL).then(response => {
            setCustomersList(response.data);
        })
    }
    
    useEffect(() => {
        getCustomersList();
    }, [])

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = customersList.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRowOptionsDropDown = (value) => {
        console.log(value);
        setPostsPerPage(value);
    };

    return (
        
        <div>
            <div>
                <AddCustomerModal getCustomersList={getCustomersList} />
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
                    {currentPosts.map(customer => 
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td><EditCustomerModal customer={customer} getCustomersList={getCustomersList} /></td>
                            <td><DeleteCustomerModal customer={customer} getCustomersList={getCustomersList} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={customersList.length}
                paginate={paginate}
            />

            <RowOptionsDropDown
                handleRowOptionsDropDown={handleRowOptionsDropDown}
                fetchData={getCustomersList}
            />
            <br />

            <CopyRight />
        </div>
    )
}

export default CustomerComponent;
