import React from "react"
import { Form, Label, Input, Alert } from "reactstrap";

const LoginForm = ({handleSubmit, onChange, formData, error}) => (
    <Form 
    onSubmit={handleSubmit} 
    className="LoginForm col-md-8 offset-md-2">
    {(error.error) ? 
        <Alert color="danger">
            {error.msg}
        </Alert>
        : null
    }
  
    <Label htmlFor="username">Username:</Label>
    <Input 
        value={formData.username}
        onChange={onChange}
        name="username"
        placeholder="username"
    />
    <Label htmlFor="password">Password:</Label>
    <Input 
        value={formData.password}
        onChange={onChange}
        name="password"
        type="password"
        placeholder="password"
    />
    <button className="btn btn-danger">Submit</button>
</Form>
)

export default LoginForm;