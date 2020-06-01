import React from 'react';
import axios from 'axios';
import {
    InputGroup, Input
} from 'reactstrap';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Button, Container, Row, Col
} from 'reactstrap';

const BASE_URL = 'https://kpkzrk2tc7.execute-api.us-east-1.amazonaws.com/dev/boxes/'

export default class BoxesList extends React.Component {

    state = {
        images: [],
        length:'',
        width: '',
        height: ''
    };

    handleChange = event => {
        switch(event.target.id){
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
        if(event.keyCode ===  13) {
            this.fetchResult(event);
        }
    }

    fetchResult = event => {
        axios.get(`${BASE_URL}?leng=${this.state.length}&width=${this.state.width}&height=${this.state.height}`).then(res => {
            this.setState({ images: res.data.items })
        });
    }


    toggleModal = () => {
        this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
    }

    componentDidMount() {
        axios.get(`${BASE_URL}`).then(res => {
            this.setState({ images: res.data.items })
        });
    }


    render() {
        return (

            <div class="row justify-content-center">
                <br /><br /><br />

                <div className='col-cm-12'>
                    <InputGroup>
                        {/* <InputGroupAddon addonType="prepend"> */}
                            {/* <InputGroupText>
                                <span>M</span>
                                <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                            </InputGroupText> */}
                        {/* </InputGroupAddon> */}
                        <Input type='number' onKeyDown={this.handleKeyDown} onChange={this.handleChange} id='lengthId' placeholder="Length" />
                        <Input type='number' onKeyDown={this.handleKeyDown} onChange={this.handleChange} id='widthId' placeholder="Width" />
                        <Input type='number' onKeyDown={this.handleKeyDown} onChange={this.handleChange} id='heightId' placeholder="Height" />
                        <button onClick={this.fetchResult}>Search</button>
                    </InputGroup>
                </div>

                <br /><br /><br />

                <Container className="themed-container">
                    <Row>
                        {this.state.images.map(box => (
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
                                        {/* <Button>Button</Button> */}
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