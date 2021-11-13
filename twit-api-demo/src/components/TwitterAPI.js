import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    FormControl,
    InputGroup,
    Row,
} from 'react-bootstrap';

const TwitterAPI = () => {
    const [username, setUsername] = useState('');
    const [userNotFound, setUserNotFound] = useState(false);
    const [tweets, setTweets] = useState('');

    useEffect(() => {
        setTweets('');
        setUserNotFound(false);
    }, [username]);

    const onClickSearchUser = async (username) => {
        const endpoint = `http://localhost:5000/get_tweets/${username}/${10}`;
        axios
            .get(endpoint)
            .then((res) => {
                setUserNotFound(false);
                setTweets(res.data.tweets);
            })
            .catch((err) => {
                setUserNotFound(true);
                setTimeout(() => setUserNotFound(false), 5000);
            });
    };

    const downloadFile = async () => {
        const fileName = 'file';
        const json = JSON.stringify(tweets);
        const blob = new Blob([json], { type: 'application/json' });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + '.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Fragment>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <InputGroup className='mb-3'>
                            <FormControl
                                placeholder='Enter Twitter Username'
                                aria-label='Enter Twitter Username'
                                aria-describedby='basic-addon2'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Button
                                variant='outline-secondary'
                                id='button-addon2'
                                onClick={() => onClickSearchUser(username)}
                            >
                                Search User
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        {userNotFound === true ? (
                            <Alert variant={'danger'}>User Not Found!</Alert>
                        ) : null}
                    </Col>
                    <Col md={{ span: 6, offset: 3 }}>
                        {tweets === '' ? null : (
                            <Alert variant={'success'}>
                                <Button variant='outline-secondary' onClick={() => {downloadFile()}}>
                                    Found User: Click To Download
                                </Button>
                            </Alert>
                        )}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default TwitterAPI;
