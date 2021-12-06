import React, { Component } from 'react';
import { Col, ListGroup, Row, Badge, Button } from 'react-bootstrap';
import Axios from 'axios';
import { API_URL } from '../../../utils/config';
import { TotalBayar } from '../../atom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modals from '../modal';
import Swal from 'sweetalert2';

export default class Result extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       keranjang: [],
       detailKeranjang: false,
       showModal: false,
       jumlah: 1,
       keterangan: '',
       total_harga: 0
    };
  };

  componentDidMount() {
   this.getListProduct();
  }

  getListProduct = () => {
    Axios.get(API_URL+"/keranjangs")
    .then(res => {
      const keranjang = res.data;
      this.setState({ keranjang })
    })
    .catch(err => {
      console.log(err.data)
    })
  }
  
  handleshow = (showModal) => {
    this.setState({
        detailKeranjang: showModal,
        showModal: true,
        total_harga: showModal.total_harga,
        jumlah: showModal.value
    })
    console.log('modal data :', showModal)
  }

  handleSubmit = (v) => {
    console.log('keranjang: ', this.state.detailKeranjang)
    v.preventDefault()

    const newData = {
      value: this.state.jumlah,
      product: this.state.detailKeranjang.product,
      total_harga: this.state.total_harga,
      keterangan: this.state.keterangan
    }

    Axios.put(API_URL+"/keranjangs/"+this.state.detailKeranjang.id, newData)
    .then(res => {
      this.getListProduct();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Berhasil diubah'
      })

      this.setState({
        showModal: false
      })
    })
    .catch(err => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'gagal mengubah'
      })
      console.log(err)
    })
  }

  handleDelete = () => {
    Axios.delete(API_URL+"/keranjangs/"+this.state.detailKeranjang.id)
    .then(res => {
      this.getListProduct();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Berhasil dihapus'
      })

      this.setState({
        showModal: false
      })
    })
    .catch(err => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'gagal menghapus'
      })
      console.log(err)
    })
  }

  handleDeleteAll = () => {
    Axios.delete(API_URL+"/keranjangs")
    .then(res => {
      this.getListProduct();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Berhasil dihapus'
      })
    })
    .catch(err => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'gagal menghapus'
      })
      console.log(err)
    })
  }

  tambah = (data) => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      total_harga: this.state.detailKeranjang.product.harga*(this.state.jumlah + 1)
    })
  }
  
  kurang = (data) => {
    if(this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        total_harga: this.state.detailKeranjang.product.harga*(this.state.jumlah - 1)
      })
    }
  }
  
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    const { keranjang } = this.state;
    console.log('cek :', this.state.keranjang)
    return (
        <Col md={3} mt={2}>
            <h3><strong>Hasil</strong></h3>
            <hr/>
            <ListGroup variant="flush">
              { keranjang.length !== 0 && keranjang.map((data) => (
                  <ListGroup.Item className="mb-4 list-pesanan" key={data.id} onClick={() => this.handleshow(data)}> 
                    <Row>
                      <Col xs={2}>
                        <Badge variant="success">
                          {data.value}
                        </Badge>
                      </Col>
                      <Col>
                      <h6>{data.product.nama}</h6>
                      <small>*{data.product.harga}</small>
                      </Col>
                      <Col><strong>{data.total_harga}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                  ))
                }
                <Modals 
                  handleClose={this.handleClose} 
                  kurang={this.kurang} 
                  tambah={this.tambah} 
                  total_harga={this.state.total_harga}
                  changeHandler={this.changeHandler}
                  jumlah={this.state.jumlah}
                  handleSubmit={this.handleSubmit}
                  handleDelete={this.handleDelete}
                  getListProduct={this.getListProduct}
                  {...this.state}
                />
            </ListGroup>
            <hr/>
            <TotalBayar keranjang={keranjang} />
            <hr />
            {
              this.state.keranjang.length >= 2 ? (
                <Button className="btn-checkout mr-4" onClick={this.handleDeleteAll} variant="danger"><FontAwesomeIcon icon={faTrash} /> Hapus semua pesanan</Button>
              ):
              null
            }
            <Button className="btn-checkout mr-4" variant="primary"><FontAwesomeIcon icon={faShoppingCart} /> Checkout</Button>
        </Col>
    );
  }
}
