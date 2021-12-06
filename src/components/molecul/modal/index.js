import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberConvertCurrency } from "../../../utils/convertCurrency";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

const ModalKeranjang = ({showModal, handleClose, detailKeranjang, handleDelete, handleSubmit, kurang, tambah, jumlah, changeHandler, total_harga}) => {
    if(detailKeranjang) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{detailKeranjang.product.nama}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Total harga :</Form.Label>
                            <p><strong>Rp. {numberConvertCurrency(total_harga)}</strong></p>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1" className="d-flex" style={{alignItems: 'center'}}>
                            <Button variant="primary" onClick={kurang}>
                                -
                            </Button>
                            <p className="m-4">{jumlah}</p>
                            <Button variant="primary" onClick={tambah}>
                                +
                            </Button>
                        </Form.Group>
                        <Form.Group className="mb-3 mt-4" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={(event) => changeHandler(event)} placeholder="Pakai bawang putih miss" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="warning" onClick={handleClose}>
                    Batal
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Simpan
                </Button>
                </Modal.Footer>
                <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} className="mr-4" /> Hapus pesanan
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }else {
        return (
            <div></div>
        )
    }
}

export default ModalKeranjang;