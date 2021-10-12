import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { 
    Card, 
    CardBody, 
    CardTitle, 
    CardText, 
    ListGroup 
} from "reactstrap";
import Job from "./Job";
import JoblyApi from "./api";

const CompanyDetails = () => {
    const {handle} = useParams();
    console.log(handle)
    let INITIAL_STATE = {
        handle: "",
        name: "",
        description: "",
        numEmployees: 0,
        logoUrl: "",
        jobs: []    
    }
    const [company, setCompany] = useState(INITIAL_STATE);
    useEffect(() => {
        async function getCompany() {
            const c = await JoblyApi.getCompany(handle)
            setCompany(c);
        }
        getCompany();
    }, []);
    
    return(
        <Card className="col-md-8 offset-md-2 bg-dark">
            <CardBody>
              <CardTitle className="font-weight-bold">
                <h3>{company.name}</h3>
              </CardTitle>
              <CardText>{company.description}</CardText>
              <ListGroup>
                  {company.jobs.map(j => (
                      <Job job={j}/>
                  ))}
              </ListGroup>
            </CardBody>
        </Card>
    )
}

export default CompanyDetails;