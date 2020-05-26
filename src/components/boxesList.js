import React from 'react';
import axios from 'axios';
import {
    InputGroup, InputGroupAddon, Input
} from 'reactstrap';


import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';

export default class BoxesList extends React.Component {

    state = {
        boxes: [],
        currentImage: 0,
        viewerIsOpen: false,
        images: []
    };

    toggleModal = () => {
        this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
    }

    componentDidMount() {
        axios.get("https://s8hqimc18h.execute-api.us-east-1.amazonaws.com/dev/boxes/").then(res => {
            
        this.setState({ images: res.data.items })
        });
    }


    render() {
        return (
            
            <div class="row justify-content-center">
                <br/><br/><br/>
                
                <div className='col-cm-12'>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            {/* <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                            </InputGroupText> */}
                        </InputGroupAddon>
                        <Input placeholder="Search Box #" />
                    </InputGroup>
                </div>

                <br/><br/><br/>

                <Container className="themed-container">
                    <Row>
                        {this.state.images.map(box => (
                            <Col sm='4'>
                                <Card>
                                    <CardImg top src={box.src} />
                                    <CardBody>
                                        <CardTitle>Card title</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
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