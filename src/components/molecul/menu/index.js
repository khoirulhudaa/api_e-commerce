import React from 'react';
import {Card, Col} from 'react-bootstrap';
import {numberConvertCurrency} from '../../../utils/convertCurrency';

const Menus = ({menu, masukKeranjang, getListProduct}) => {
    return (
        <Col md={4} xs={6} className="mb-4">
            <Card className="card shadow" onClick={() => masukKeranjang(menu)}>
                <div className="card-head">
                    <Card.Img variant="top" src={
                        "assets/images/" + 
                        menu.category.nama.toLowerCase() + 
                        "/" + 
                        menu.gambar 
                    } 
                    />
                </div>
                <Card.Body>
                    <Card.Title className="card-title">{menu.nama} - <strong>({menu.kode})</strong></Card.Title>
                    <Card.Text>Rp. {numberConvertCurrency(menu.harga)}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
};

export default Menus;