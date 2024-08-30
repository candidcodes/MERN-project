import { Col, Tab, Tabs } from "react-bootstrap"
import { Order, Reviews } from ".";

export const Profile = () => {
    return (
      <Col lg="6" md="8" sm="10" className="bg-white my-3 py-3 mx-auto ">
        <Tabs
          defaultActiveKey="orders"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="orders" title="Orders">
            <Order />
          </Tab>
          <Tab eventKey="reviews" title="Reviews">
            <Reviews />
          </Tab>
          <Tab eventKey="profile" title="Edit Profile">
            Orders
          </Tab>
          <Tab eventKey="password" title="Change Password">
            Orders
          </Tab>
        </Tabs>
      </Col>
    );
}