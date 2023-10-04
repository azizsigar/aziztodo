import { Button, Form } from 'react-bootstrap';
import instance from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Signup(){
    const navigate = useNavigate();
    const handleSignup = (evt) => {
        evt.preventDefault(); // Submit Fonskiyon işlevini kaybetmeli
       
        const form = evt.target;
        const signupData = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            password: form.password.value
        }

        instance.post('/signup-user', signupData).then((response) => {
            toast.success('User sign in successfully!');
            return navigate('/login') // Kullanıcıyı farklı bir sayfaya yönlendirir!
        }).catch((error) => {
            if (error) {
                toast.error(error.response.data.message);
            }
        });
    }
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height: "100vh"}}>
            <div className='border border-primary rounded-2 px-3 py-2' style={{width: "400px"}}>
                <div className='text-center fs-1 mb-3 fw-bolder'>Signup</div>
                <Form onSubmit={handleSignup}>
                    <Form.Group>
                        <Form.Label htmlFor="firstName">First Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="firstName"
                            name="firstName"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="lastName"
                            name="lastName"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            type="email"
                            id="email"
                            name="email"
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain letters and numbers,
                            and must not contain spaces, special characters, or emoji.
                        </Form.Text>
                    </Form.Group>
                    <Button type='submit' className='w-100 btn-primary'>Signup</Button>
                </Form>
            </div>
        </div>
    )
}
export default Signup