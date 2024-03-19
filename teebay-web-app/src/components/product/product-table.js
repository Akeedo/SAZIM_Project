import React from 'react';
import { Table } from 'semantic-ui-react';

function ProductTable({ products }) {
    return (
        <div>
        <Table singleLine>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            {products.map((product, index) => (
                <Table.Row key={index}>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
        </div>
    );
}

export default ProductTable;
