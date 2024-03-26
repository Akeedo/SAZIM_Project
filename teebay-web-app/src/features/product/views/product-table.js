import React from 'react';
import axios from 'axios';
import { Table, Button  } from 'semantic-ui-react';

import ProductDataService from '../services/product-data-service';

function ProductTable({ products, onDelete, handleUpdateClick, handleDetailClick }) {
   
    return (
        <div>
        <Table singleLine>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
                <Table.HeaderCell>Detail</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            {products.map((product, index) => (
                <Table.Row key={index}>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell> 
                    <Button onClick={() => handleUpdateClick(product.id)}>Update</Button>
                </Table.Cell>
                <Table.Cell>
                    <Button onClick={() => onDelete(product.id)}>Delete</Button>
                </Table.Cell>
                <Table.Cell>
                    <Button onClick={() => handleDetailClick(product.id)}>Detail</Button>
                </Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
        </div>
    );
}

export default ProductTable;
