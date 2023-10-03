import instance from "../../utils/axios";
import { useState, useEffect  } from 'react'
import { Card, Button, Modal, Form, Image } from "react-bootstrap";
import { toast } from "react-toastify";

function Post() {
    const [ posts, setPosts ] = useState([]) // Postlar burada depolanacak
    const [ show, setShow ] = useState(false)
    const [ filterText, setFilterText ] = useState(''); // Filter Text içeren Stateful Değişken

    const handleModal = () => {
        return setShow(!show);
    }

    const getAllPosts = () => {
        instance.get('/get-posts').then((response) => {
            if(response.data.message.data) {
                setPosts(response.data.message.data) // Veriler Renderlanacak
            }
        }).catch((error) => {
           if (error) console.error(error)
        })
    }

    const handlePost = (evt) => {
        evt.preventDefault() // Formun işlevini yitirmesini sağlıyo

        const form = evt.target
        const data={  
            title:form.title.value,
            desc: form.desc.value
        }
        
        instance.post('/submit-new-post', data).then((response)=>{
            if( response.data.status === "Accepted" ) {
                toast.success('New Post Added!');
                handleModal();
                getAllPosts();
            }
        }).catch((err) => {
            if (err) console.error(err)
        });
    }

    const deletePost = ( postId ) => {
        instance.post('/delete-post', {id: postId}).then((response)=>{
            if( response.data.status === "Accepted" ) {
                toast.success('Post Deleted!');
                getAllPosts();
            }
        }).catch((err) => {
            if (err) console.error(err)
        });
    }

    const likePost = ( postId ) => {
        instance.post('/like-post', {postId}).then((response) => {
            getAllPosts();
        }).catch((err) => {
            toast.error("Post Beğenilemedi!");
        })
    }
    // useEffect kullanarak sayfa yüklendiğinde tüm gönderileri al
    useEffect(() => {
        getAllPosts();
    }, []);
    
    return (
        <div className="container">
            <div className="w-100 d-flex justify-content-between align-items-center mb-3">
                <h1>Posts</h1>
                <Form className="d-flex w-50">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => {
                            setFilterText(e.target.value);
                        }}  
                    />
                </Form>
                <Button onClick={handleModal}>Add Post</Button>
            </div>
            {
                posts.filter(post => post.title.includes(filterText)).map((post) => {
                    return (
                        <Card key={post._id} className="d-flex flex-row w-100 mb-3">
                            <Card.Img src={'https://picsum.photos/200/120'} style={{width: "200px", height: "120px"}} />
                            <Card.Body>
                                <Card.Title className="d-flex justify-content-between align-items-center">
                                    { post.title }
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm"
                                        onClick={() => {
                                            deletePost(post._id);
                                        }}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </Card.Title>
                                <Card.Text>
                                { post.desc }
                                </Card.Text>
                                <div 
                                    className="position-absolute" 
                                    style={{right: "20px", bottom: "4px"}}
                                    onClick={() => {likePost(post._id)}}
                                >
                                    {
                                        post.likes.some(like => like === JSON.parse(window.sessionStorage.getItem('user'))._id) ? 
                                        <i class="bi bi-heart-fill text-danger"></i>:
                                        <i class="bi bi-heart"></i>
                                    } {' '} {post.likes.length}
                                </div>
                            </Card.Body>
                        </Card>
                        // <div>
                        //     <a href="/delete-post/<%= post._id %>">❌</a>
                        //     <h2>
                        //         { post.title }
                        //     </h2>
                        //     <p>
                        //         { post.desc }
                        //     </p>
                        // </div>
                    )
                })
            }

            <Modal show={show} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handlePost}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} name="desc" />
                        </Form.Group>
                        <Button type="submit" className="w-100">Publish</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Post





// Vertabanından Postlar gelir -> Bu postlar statful bir değişkende depolanır -> Array olan bu değişken map() metoduyla renderlanır.