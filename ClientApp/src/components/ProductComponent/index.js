import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import CopyRight from '../CopyRight';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeleteProductModal';
import Pagination from '../Pagination/Pagination';
import RowOptionsDropDown from '../Pagination/RowOptionsDropDown';

 const ProductComponent = (props) => {
    const [productsList, setProductsList] = useState([]);
    const [postsPerPage, setPostsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    /* GET PRODUCT LIST */
    const getProductsList = () => {
        let URL = "https://sales-manage-app.azurewebsites.net/api/Product/GetAll";

        axios.get(URL).then(response => {
            setProductsList(response.data);
        })
    }

    useEffect(() => {
        getProductsList();
    }, [])
    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = productsList.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRowOptionsDropDown = (value) => {
        console.log(value);
        setPostsPerPage(value);
    };

    return (
        <div>
            <div>
                <AddProductModal getProductsList={getProductsList} />
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
                    {currentPosts.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td><EditProductModal product={product} getProductsList={getProductsList} /></td>
                            <td><DeleteProductModal product={product} getProductsList={getProductsList} /></td>
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

export default ProductComponent;
