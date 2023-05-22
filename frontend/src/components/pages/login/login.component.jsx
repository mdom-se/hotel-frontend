import React, { useState } from "react";
import { Container, Form, FormGroup, Button, Input, Label, Col } from "reactstrap";

const Login = () => {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Login">

            <Container>
                <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label for="username" sm={2} >Username</Label>
                        <Col sm={3}>
                            <Input
                                autoFocus
                                name="username"
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for={password} sm={2} >Password</Label>
                        <Col sm={3}>
                            <Input
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={3}>
                            <Button block type="submit" disabled={!validateForm()}>
                                Login
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Container>
        </div>

    );

}

export default Login;