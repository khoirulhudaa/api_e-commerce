import React, {Component} from 'react';
import {numberConvertCurrency} from '../../../utils/convertCurrency';

export default class totalBayar extends Component {
    render() {
        const totalBayar = this.props.keranjang.reduce(function(result, item) {
            return result + item.total_harga
        }, 0)

        return (
            <h5 className="total">Total bayar: <strong>Rp. {numberConvertCurrency(totalBayar)}</strong></h5>
        )
    }
}