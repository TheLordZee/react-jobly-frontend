import React from "react";
import JoblyApi from "./api";
import { useEffect, useState } from "react";
import { ListGroup, ListGroupItem, Form, Input, Button,FormGroup } from "reactstrap";

import Job from "./Job";
import CompanyCard from "./CompanyCard";

const List = ({type}) => {
    const [list, setList] = useState([])
    const [search, setSearch] = useState("")
    async function getItems() {
        if(type === "jobs"){
            const j = await JoblyApi.getAllJobs()
            setList(j)
        } else {
            const c = await JoblyApi.getAllCompanies()
            setList(c)
        }
    }
    useEffect(() => {
        getItems();
    }, []);

    const onChange = (e) => {
        const {value} = e.target;
        setSearch(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(search.length > 0){
            if(type === "jobs"){
                const j = await JoblyApi.getAllJobs({title: search})
                setList(j)
            } else {
                const c = await JoblyApi.getAllCompanies({name: search})
                setList(c)
            }
        } else {
            getItems()
        }
    }

    return(
        <div className="col-md-8 offset-md-2">
            <Form 
                inline 
                className="d-flex justify-content-center my-4"
                onSubmit={handleSubmit}
            >
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 me-2">
                    <Input 
                        value={search}
                        onChange={onChange}
                    />
                </FormGroup>
                <Button color="primary">Search</Button>
            </Form>
            <ListGroup className="bg-dark">
                {list.map(item => (
                    <ListGroupItem className="bg-dark">
                        {(type === "jobs") ? 
                        <Job key={item.id} job={item}/>
                        :
                        <CompanyCard key={item.handle} company={item}/>
                    }
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    )
}

export default List;