import React from "react"
import { Form, Label, Input, Alert } from "reactstrap";

const SignupForm = ({handleSubmit, onChange, formData, error}) => (
    <Form 
        onSubmit={handleSubmit} 
        className="SignupForm col-md-8 offset-md-2">
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
        <Label htmlFor="firstName">First Name:</Label>
        <Input 
            value={formData.firstName}
            onChange={onChange}
            name="firstName"
            placeholder="first name"
        />
        <Label htmlFor="lastName">Last Name:</Label>
        <Input 
            value={formData.lastName}
            onChange={onChange}
            name="lastName"
            placeholder="last name"
        />
        <Label htmlFor="email">Email:</Label>
        <Input 
            value={formData.email}
            onChange={onChange}
            name="email"
            type="email"
            placeholder="email"
        />
        <button className="btn btn-danger">Submit</button>
    </Form>
)

export default SignupForm;