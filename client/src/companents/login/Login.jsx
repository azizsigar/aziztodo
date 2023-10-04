import instance  from '../../utils/axios'
import { useNavigate } from 'react-router-dom'

import { 
    Form, 
    Button 
} from 'react-bootstrap';
import { toast } from 'react-toastify'
function Login(){
    const navigate = useNavigate();
    const handleLogin = (evt) => {
        evt.preventDefault();
        const form = evt.target;
        const data = {
            email: form.email.value,
            password: form.password.value 
        }

        instance.post('/login-user', data).then((response) => {
            if(response.data) {
                // window.localStorage.setItem('token', response.data.token);
                // axios.defaults.headers.common['Authorization'] = response.data.token;
                window.sessionStorage.setItem('user', JSON.stringify(response.data.user));
                window.sessionStorage.setItem('token', response.data.token);
                instance.defaults.headers.common['Authorization'] = response.data.token;
                toast.success('User logged in successfully!');
                return navigate('/');
            }
        }).catch((err) => {
            if (err) {
                toast.error(err.response.data.message);
            };
        });

        // axios.post('http://localhost:4500/login-user', data).then((response) => {
        //     if(response.data) {
        //         window.localStorage.setItem('token', response.data.token);
        //     }
        // }).catch((err) => {
        //     if (err) alert(err);
        // });
    }
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height: "100vh"}}>
            <div className='border border-primary rounded-2 px-3 py-2' style={{width: "400px"}}>
                <div className='text-center fs-1 mb-3 fw-bolder'>Login</div>
                {/* <form onSubmit={handleLogin} action="/login-user" method="POST">
                    <input className='' type="email" name="email" placeholder="Email" autoComplete="off" />
                    <input type="password" name="password" placeholder="Password" autoComplete="off" />
                    <button>Login</button>
                </form> */}
                <Form onSubmit={handleLogin}>
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
                    <Button type='submit' className='w-100 btn-primary'>Login</Button>
                </Form>
            </div>
        </div>
    )
}
export default Login