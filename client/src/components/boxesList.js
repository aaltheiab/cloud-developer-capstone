import React from 'react';
import axios from 'axios';
import {
    InputGroup, Input
} from 'reactstrap';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button, Container, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../config'

export default class BoxesList extends React.Component {

    state = {
        boxes: [],
        length: '',
        width: '',
        height: ''
    };

    handleChange = event => {
        switch (event.target.id) {
            case 'lengthId':
                this.setState({ length: event.target.value });
                break;
            case 'widthId':
                this.setState({ width: event.target.value });
                break;
            case 'heightId':
                this.setState({ height: event.target.value });
                break;
        }
    }

    handleKeyDown = event => {
        if (event.keyCode === 13) {
            this.fetchResult(event);
        }
    }

    fetchResult = event => {
        axios.get(`${BASE_URL}?leng=${this.state.length}&width=${this.state.width}&height=${this.state.height}`).then(res => {
            this.setState({ boxes: res.data.items })
        });
    }


    toggleModal = () => {
        this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
    }

    componentDidMount() {
        axios.get(`${BASE_URL}`).then(res => {
            this.setState({ boxes: res.data.items })
        });
    }

    boxClicked = event => {
        alert(event.target.name);
    }

    render() {
        return (
            <div class="row justify-content-center">
                {/* {boxesList} */}
                <br /><br /><br />

                <div className='col-cm-12'>
                    <InputGroup>
                        <Input type='number' onKeyDown={this.handleKeyDown} onChange={this.handleChange} id='lengthId' placeholder="Length" />
                        <Input type='number' onKeyDown={this.handleKeyDown} onChange={this.handleChange} id='widthId' placeholder="Width" />
                        <Input type='number' onKeyDown={this.handleKeyDown} onChange={this.handleChange} id='heightId' placeholder="Height" />
                        <button onClick={this.fetchResult}>Search</button>
                    </InputGroup>
                </div>

                <br /><br /><br />

                <Container className="themed-container">
                    <Row>
                        {this.state.boxes.map(box => (
                            <Col sm='4'>
                                <Card>
                                    <CardImg top src={box.attachmentUrl} />
                                    <CardBody>
                                        <CardTitle>Box #: {box.sku} </CardTitle>
                                        <CardText>
                                            W: {box.width} MM => {box.width / 10} CM <br />
                                            L: {box.length || box.leng} MM => {(box.length || box.leng) / 10} CM <br />
                                            H: {box.height} MM => {box.height / 10} CM
                                        </CardText>

                                        <Button color='link'><Link to={`/boxes/${box.sku}`}>Details</Link></Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))
                        }
                    </Row>
                </Container>

            </div>
        )
    }

}


function boxesList() {
    return (
        <p>00000</p>
    )
}