import React from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';

import {
    CardImg
} from 'reactstrap';

export default class BoxView extends React.Component {

    state = {
        sku: 0,
        box: Object,
    }
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ sku: params.sku })

        axios.get(`${BASE_URL}${params.sku}`).then(res => {
            this.setState({ box: res.data.item })
            console.log(res.data);
        });
    }

    render() {
        return (
            <div>
                <CardImg top src={this.state.box.attachmentUrl} />
                
            </div>
        )
    }

}