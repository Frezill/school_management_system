import React, { useEffect, useState } from 'react'
import '../styles/Register.scss'
import { Image, Col, Row, Form, Button } from 'react-bootstrap';
import { getMajorService } from '../services/majorService';
import { registerNewUserService } from '../services/userService';
import { useNavigate } from 'react-router-dom'


const register = () => {

    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
        dob: '',
        major_id: '',
        profileImage: null
    })
    const [major, setMajor] = useState([])

    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value, files } = event.target
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === 'profileImage' ? files[0] : value
        })
    }

    const getMajor = async () => {
        let response = await getMajorService()
        if (response.EC === 0) {
            setMajor(response.DT)
        }
    }

    const handleRegisterButton = async () => {
        let response = await registerNewUserService(formData)
        if (response) {
            navigate('/login')
        }
    }

    useEffect(() => {
        getMajor()
    }, [])

    return (
        <div className="register-container">
            <div className="register-content">
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label><strong>ID</strong></Form.Label>
                        <Form.Control type="text" placeholder="ID" name='id' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label><strong>Birthday</strong></Form.Label>
                        <Form.Control type="text" placeholder="yyyy-mm-dd" name='dob' onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label><strong>First name</strong></Form.Label>
                        <Form.Control type="text" placeholder="First name" name='first_name' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label><strong>Last name</strong></Form.Label>
                        <Form.Control type="text" placeholder="Last name" name='last_name' onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label><strong>Email</strong></Form.Label>
                        <Form.Control type="text" placeholder="Email" name='email' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label><strong>Phone number</strong></Form.Label>
                        <Form.Control type="text" placeholder="Phone number" name='phone' onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label><strong>Password</strong></Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label><strong>Confirm password</strong></Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" name='confirmPassword' onChange={handleChange} />
                    </Form.Group>
                </Row>

                <Form.Group className='mb-3' >
                    <Form.Label><strong>Address</strong></Form.Label>
                    <Form.Control type="text" placeholder="Address" name='address' onChange={handleChange} />
                </Form.Group>

                <Form.Group className='mb-3' >
                    <Form.Label><strong>Major</strong></Form.Label>
                    <Form.Select aria-label="" name='major_id' onChange={handleChange}>
                        <option>Select your major</option>
                        {
                            major &&
                            major.map((item, index) => (
                                <option value={item.id} key={`option - ${index}`}>{item.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className='col-sm-6'>
                        <Form.Label><strong>Profile image</strong></Form.Label>
                        <Form.Control type="file" name='profileImage' onChange={handleChange} />
                    </Form.Group>
                    {formData.profileImage &&
                        <Col xs={6} md={4}>
                            <Image src={URL.createObjectURL(formData.profileImage)} rounded width={'100px'} className='border' />
                        </Col>
                    }
                </Row>

                <Button variant="primary" className='px-4' onClick={handleRegisterButton}>
                    REGISTER
                </Button>{' '}

            </div>
        </div>
    )
}

export default register