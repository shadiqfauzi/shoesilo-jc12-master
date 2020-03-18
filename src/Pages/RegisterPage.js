import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../Support/API_URL'
import { connect } from 'react-redux';
import { Login } from '../Redux/Action'

class LoginPage extends Component {
    state = {  }

    onBtnRegister = () => {
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        let confirmPass = this.confirmPass.value

        if(password === confirmPass){
            axios.get(`${API_URL}/users?username=${username}`)
            .then((res)=>{
                if(res.data.length > 0){
                    window.alert('Username already exists')
                }else{
                    axios.post(`${API_URL}/users`, {
                        username,
                        email,
                        password,
                        role : 'user'
                    })
                    .then((res) => {
                        console.log(res.data)
                        let { username, email, role, id } = res.data

                        this.props.Login({
                            username,
                            email,
                            role,
                            id
                        })
                    })
                }
            })
            .catch((err)=> {
                console.log(err)
            })
        }else{
            window.alert('Invalid Password')
        }
    }

    render() { 
        if(this.props.logged){
            return(
                <Redirect to='/'></Redirect>
            )
        }
        
        return ( 
            <React.Fragment>
            <h1 style={{'textAlign' : 'center', 'margin' : '0'}}>Register</h1>
            <div className='d-flex justify-content-center' style={{height : '70vh', alignItems : 'center'}}>
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                      <Label for="exampleUsername">Username</Label>
                      <Input type="text" name="username" id="exampleUsername" placeholder="Username" innerRef={(username) => this.username = username} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input type="text" name="email" id="exampleEmail" placeholder="Email" innerRef={(email) => this.email = email}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleConfirmPass">Confirm Password</Label>
                      <Input type="password" name="confirmPass" id="exampleConfirmPass" placeholder="Password" innerRef={(confirmPass) => this.confirmPass = confirmPass}/>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button onClick={this.onBtnRegister}>
                            Register
                        </Button>
                        <Link to='/login'>
                            <Button>
                                Login
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        logged : state.auth.logged
    }
}
 
export default connect(mapStatetoProps, { Login }) (LoginPage);