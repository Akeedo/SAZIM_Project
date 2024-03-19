import React from 'react';
import { Table, Button  } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

function ProductTable({ products }) {
    const navigate = useNavigate();

    const handleUpdateClick = (productId) => {
        navigate(`/update-product/${productId}`);
      };


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
            </Table.Row>
            </Table.Header>

            <Table.Body>
            {products.map((product, index) => (
                <Table.Row key={index}>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.description}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                {/* <Link to='/update-product'> */}
               <Table.Cell> 
                    <Button onClick={() => handleUpdateClick(product.id)}>Update</Button>
                </Table.Cell>
                {/* </Link> */}
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
        </div>
    );
}

export default ProductTable;
