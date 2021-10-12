import React, { useState } from "react"
import { 
  Card, 
  CardBody, 
  CardTitle, 
  CardText, 
  Button 
} from "reactstrap";
import useLocalStorage from "./useLocalStorage";
import JoblyApi from "./api";

const Job = ({job}) => {
  const {id, title, salary, equity, companyName} = job;
  const {getCurrUser, setCurrUser} = useLocalStorage();
  const initial_user = getCurrUser()
  const [currUser, setUser] = useState(initial_user);
  const apply = async () => {
    const {username} = currUser;
    await JoblyApi.apply(username, id)
    const user = await JoblyApi.getUser(username)
    setCurrUser(user)
    setUser(user)
  }

  return(
    <section>
      <Card className="bg-dark text-light">
        <CardBody>
          <CardTitle className="font-weight-bold">
            {title}
          </CardTitle>
          <CardText>{companyName}</CardText>
          <p>
            <b>Salary:</b> {(salary) ? `$${salary}` : "unknown"}
          </p>
          <p>
            <b>Equity:</b> {(equity) ? equity : "None"}
          </p>
          {(currUser.applications.includes(id) ?  
          <Button color="danger" disabled>
            Applied
          </Button> : 
          <Button onClick={apply} color="danger">
            Apply
          </Button>)} 
          
        </CardBody>
        
      </Card>
    </section>
  )
}

export default Job;