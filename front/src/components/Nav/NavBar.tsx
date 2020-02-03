import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import '../Nav/style/Nav.scss'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';


const NavBar: FunctionComponent = () => {
    return (
        <>
            {/* 로고 누르면 HOME으로 갑니다 */}
            <Navbar className="content"> {/* bg="light" variant="light"*/}
                <div className="left">
                    <Navbar.Brand href="#home">HOME(LOGO)</Navbar.Brand>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                    </Form>
                </div>
                {/* 이부분을 오른쪽정렬해야함 */}
                <div className="right">
                    <a className="menu">
                        <Link to='/user/Login'>로그인</Link>
                    </a>
                    <a className="menu">
                        <Link to='/user/Signup'>회원가입</Link>
                    </a>
                    <a className="menu">
                        <Link to='/user/#'>커뮤니티</Link>            
                    </a>
                </div>
            </Navbar>
        </>
    )
}

export default NavBar