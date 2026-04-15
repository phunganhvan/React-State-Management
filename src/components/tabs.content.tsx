import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersTable from './users.table';
import BlogsTable from './blogs.table';

const TabContent = () => {
    return (
        <>
            <Container>
                <Tabs
                    // defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Home">
                        <UsersTable />
                    </Tab>
                    <Tab eventKey="blogs" title="Blogs">
                        <BlogsTable />
                    </Tab>
                    <Tab eventKey="contact" title="Contact" disabled>
                        Tab content for Contact
                    </Tab>
                </Tabs>
            </Container>
        </>
    )
}
export default TabContent;