import React, {useState} from "react"
import useLocalStorage from "./useLocalStorage";
import { Form, Label, Input, Card, CardBody, Alert } from "reactstrap";
import JoblyApi from "./api";

const Profile = ({user}) => { 
    const INITIAL_STATUS = {error: false, msg: ""}
    const {username, firstName, lastName, email} = user;
    let initialState = {firstName, lastName, email, password: ""}
    const [updateData, setUpdateData] = useState(initialState)
    const [status, setStatus] = useState(INITIAL_STATUS)
    const {setCurrUser} = useLocalStorage();

    const onChange = e => {
        let {name, value} = e.target;
        setUpdateData(fD => ({
            ...fD,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        for(let key of Object.keys(updateData)){
            if(updateData[key] === ""){
                const err = {
                    error: true,
                    msg: "All inputs must be filled!"
                }
                setStatus(err)
            }
        }
        if(!status.error){
            try{
                const password = updateData.password;
                console.log(username, password)
                await JoblyApi.authenticate({username, password})
                delete updateData.password;
                const updatedUser = await JoblyApi.updateUser(username, updateData);
                setUpdateData(updatedUser);
                setCurrUser(updatedUser);
                const success = {
                    error: false,
                    msg: "success"
                }
                setStatus(success)

            }catch(e){
                const err = {
                    error: true,
                    msg: "Password is incorrect!"
                }
                setStatus(err)
            }
        }
    }
    return(
        <div className="container">
            <h2 className="my-4">{username}'s Profile</h2>
            <Card className="bg-dark text-light">
                <CardBody className="bg-dark text-light">
                    <Form 
                        onSubmit={handleSubmit} 
                        className="SignupForm">
                        {(status.error) ? 
                            <Alert color="danger">
                                {status.msg}
                            </Alert>
                            : null
                        }
                        {(status.msg === "success") ?
                            <Alert color="success">
                                {status.msg}
                            </Alert>
                            :
                            null
                        }

                        <Label htmlFor="firstName">First Name:</Label>
                        <Input 
                            value={updateData.firstName}
                            onChange={onChange}
                            name="firstName"
                            placeholder="first name"
                        />
                        <Label htmlFor="lastName">Last Name:</Label>
                        <Input 
                            value={updateData.lastName}
                            onChange={onChange}
                            name="lastName"
                            placeholder="last name"
                        />
                        <Label htmlFor="email">Email:</Label>
                        <Input 
                            value={updateData.email}
                            onChange={onChange}
                            name="email"
                            type="email"
                            placeholder="email"
                        />
                        <Label htmlFor="password">Enter Password to Confirm Changes:</Label>
                        <Input 
                            value={updateData.password}
                            onChange={onChange}
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                        <button className="btn btn-danger mt-3">Submit</button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Profile;