import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useHistory } from "react-router";

const CompanyCard = ({company}) => {
    const {handle, name, description} = company;
    const history = useHistory()

    const onClick = () => {
        console.log(handle)
        history.push(`/companies/${handle}`)
    }
    return(
        <section>
          <Card onClick={onClick} className="bg-dark text-light">
            <CardBody className="bg-dark">
              <CardTitle className="font-weight-bold">
                {name}
              </CardTitle>
              <CardText>{description}</CardText>
            </CardBody>
          </Card>
        </section>        
    )
}

export default CompanyCard;