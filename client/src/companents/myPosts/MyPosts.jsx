import instance from "../../utils/axios";
import { useState, useEffect  } from 'react'
import { Card, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const MyPosts = () => {
    const [ posts, setPosts ] = useState([]) // Postlar burada depolanacak
    const [ show, setShow ] = useState(false)
    const [ isEdit, setIsEdit ] = useState(false);
    const [ editInputs, setEditInputs] = useState({title: '', desc: '', id: ''});

    const handleModal = () => {
        return setShow(!show);
    }

    const getAllPosts = () => {
        instance.get('/get-my-posts').then((response) => {
            if(response.data.message.data) {
                setPosts(response.data.message.data) // Veriler Renderlanacak
            }
        }).catch((error) => {
           if (error) console.error(error)
        })
    }

    const handlePost = (evt, id = null) => {
        evt.preventDefault() // Formun işlevini yitirmesini sağlıyo

        const form = evt.target
        const data={
            title:form.title.value,
            desc: form.desc.value,
            author: JSON.parse(window.sessionStorage.getItem('user'))._id
        }

        if (id){
            data.id = id;
            instance.post('/edit-post', data).then((response)=>{
                if( response.data.status === "Accepted" ) {
                    toast.success(response.data.message);
                    handleModal();
                    getAllPosts();
                }
            }).catch((err) => {
                if (err) console.error(err)
            });
        } else {
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
    <>
        <div>
        {
            posts.map((post) => {
                return (
                    <Card key={post._id} className="d-flex flex-row w-100 mb-3">
                        <Card.Img src={'https://picsum.photos/200/120'} style={{width: "200px", height: "120px"}} />
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between align-items-center">
                                { post.title }
                                <div className="d-flex gap-3">
                                    {
                                        post.author && post.author ===  JSON.parse(window.sessionStorage.getItem('user'))._id ? 
                                        <>
                                            <Button
                                                variant="outline-primary" 
                                                size="sm"
                                                onClick={() => {
                                                    setIsEdit(true);
                                                    setEditInputs({
                                                        title: post.title,
                                                        desc: post.desc,
                                                        id: post._id
                                                    });
                                                    handleModal();
                                                }}
                                            >
                                                <i class="bi bi-pencil-square"></i>
                                            </Button> 
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm"
                                                onClick={() => {
                                                    deletePost(post._id);
                                                }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </>
                                        : null
                                    }
                                </div>
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
                                    <i className="bi bi-heart-fill text-danger"></i>:
                                    <i className="bi bi-heart"></i>
                                } {' '} {post.likes.length}
                            </div>
                        </Card.Body>
                    </Card>
                )
            })
        }
        
        </div>
        <Modal show={show} onHide={() => {
            if(isEdit) {
                setIsEdit(false);
            }
            handleModal();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Edit' : 'Add'} Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => {
                    if(isEdit) {
                        setIsEdit(false);
                    }
                    handlePost(e, editInputs.id);
                }}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            defaultValue={isEdit ? editInputs.title : ''}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="desc" defaultValue={isEdit ? editInputs.desc : ''}/>
                    </Form.Group>
                    <Button type="submit" className="w-100" >{isEdit ? 'Save Changes' : 'Publish'}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>
    );
  };

  export default MyPosts;