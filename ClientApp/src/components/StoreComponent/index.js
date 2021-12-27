import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import CopyRight from '../CopyRight';
import AddStoreModal from './AddStoreModal';
import EditStoreModal from './EditStoreModal';
import DeleteStoreModal from './DeleteStoreModal';
import Pagination from '../Pagination/Pagination';
import RowOptionsDropDown from '../Pagination/RowOptionsDropDown';

 const StoreComponent = (props) => {
    const [storesList, setStoresList] = useState([]);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

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

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = storesList.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRowOptionsDropDown = (value) => {
        console.log(value);
        setPostsPerPage(value);
    };
    
    return (
        <div>
            <div>
                <AddStoreModal getStoresList={getStoresList}/>
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
                    {currentPosts.map(store => 
                        <tr key={store.id}>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td><EditStoreModal store={store} getStoresList={getStoresList} /></td>
                            <td><DeleteStoreModal store={store} getStoresList={getStoresList} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={storesList.length}
                paginate={paginate}
            />

            <RowOptionsDropDown
                handleRowOptionsDropDown={handleRowOptionsDropDown}
                fetchData={getStoresList}
            />
            <br />

            <CopyRight />

        </div>
    )
}

export default StoreComponent;
