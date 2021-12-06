import React, { Component } from 'react';
import {NavbarComponent, ListCategories, Result, Menus} from '../molecul';
import Axios from 'axios';
import {API_URL} from '../../utils/config';
import Swal from 'sweetalert2';
import {Container, Row, Col} from 'react-bootstrap';

export default class Homepage extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           menuss: [],
           categoryDiPilih: "Makanan",
           keranjang: [],
           detailKeranjang: '',
           showModel: false
        };
      };
      
    componentDidMount() {
        Axios.get(API_URL+"/products?category.nama="+this.state.categoryDiPilih)
        .then(res => {
          const menuss = res.data;
          this.setState({menuss})
        })
        .catch(err => {
          console.log(err.data)
        })

        this.getListProducts();
    }

    getListProducts = () => {
      Axios.get(API_URL+"/keranjangs")
      .then(res => {
        const keranjang = res.data;
        this.setState({ keranjang })
      })
      .catch(err => {
        console.log(err.data)
      })
    }
    
    changeCategory = (value) => {
      this.setState({
        categoryDiPilih: value,
        menuss: []
      })
    
      Axios.get(API_URL+"/products?category.nama="+value)
      .then(res => {
        this.getListProducts();
        const menuss = res.data;
        this.setState({menuss})
      })
      .catch(err => {
        console.log(err.data)
      })
    }
    
    masukKeranjangs = (v) => {
      Axios.get(API_URL+"/keranjangs?product.id="+ v.id)
      .then(res => {
      
        if(res.data.length === 0) {
          const cart = {
            value: 1,
            product: v,
            total_harga: v.harga
          }
        
          Axios.post(API_URL+"/keranjangs", cart)
            .then(res => {
              Axios.get(API_URL+"/keranjangs")
              window.location.reload();
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Masuk keranjang'
              })

              window.location.reload()
            })
            .catch(err => {
              console.log(err.data)
            })
        }else {
          const cart = {
            value: res.data[0].value + 1,
            product: v,
            total_harga: res.data[0].total_harga + v.harga
          }
    
          Axios.put(API_URL+"/keranjangs/" + res.data[0].id, cart)
          .then(res => {
            window.location.reload();   
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            })
            
            Toast.fire({
              icon: 'success',
              title: 'Masuk keranjang'
            })
          })
          .catch(err => {
            console.log(err.data)
          })
        }
      })
      .catch(err => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'warning',
          title: 'Gagal masuk keranjang'
        })
      })
    }
    
    render() {
        const {categoryDiPilih, menuss} = this.state;

        return (
            <>
            <NavbarComponent/>
            <div className="mt-4 p-4">
                <Container fluid>
                <Row>
                <ListCategories changeCategory={this.changeCategory} categoryDiPilih={categoryDiPilih} />
                <Col>
                    <h3><strong>Daftar Produk</strong></h3>
                    <hr/>
                    <Row>
                        {
                        menuss && menuss.map((menu) => (
                            <Menus
                            key={menu.id}
                            menu={menu}
                            masukKeranjang={this.masukKeranjangs}
                            />
                        ))
                        }
                    </Row>
                </Col>
                <Result />
                </Row>
                </Container>
            </div>
            </>
        )
    }
}