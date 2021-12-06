import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import Axios from 'axios';
import { API_URL } from '../../../utils/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotdog, faCoffee, faCookie } from '@fortawesome/free-solid-svg-icons'

const Icon = ({nama}) => {
  if(nama === 'Makanan') return <FontAwesomeIcon icon={faHotdog} />
  if(nama === 'Minuman') return <FontAwesomeIcon icon={faCoffee} />
  if(nama === 'Cemilan') return <FontAwesomeIcon icon={faCookie} />
}

export default class ListCategories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       categories: []
    };
  };

componentDidMount() {
  Axios.get(API_URL+"/categories")
    .then(res => {
      const categories = res.data;
      this.setState({categories})
    })
    .catch(err => {
      console.log(err.data)
  })
}

  render() {
    const {categories} = this.state;
    const {changeCategory, categoryDiPilih} = this.props;

    return (
        <Col md={2} mt={4}>
            <h3><strong>Kategori</strong></h3>
            <hr/>
            <ListGroup className="mt-4">
                {
                  categories && categories.map((ct) => (
                    <ListGroup.Item 
                    key={ct.id} 
                    onClick={() => changeCategory(ct.nama)}
                    className={categoryDiPilih === ct.nama && "category-active"}
                    id="y"
                    >
                    <Icon nama={ct.nama} /> {ct.nama}
                    </ListGroup.Item>
                  ))
                }
            </ListGroup>
        </Col>
    );
  }
}
