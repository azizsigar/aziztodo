import instance from "../../utils/axios";
import { useState, useEffect  } from 'react'
import { Card, Button, Modal, Form, Image } from "react-bootstrap";
import { toast } from "react-toastify";
import PostCard from "../subComponents/PostCard";

function Post() {
    const [ posts, setPosts ] = useState([]) // Postlar burada depolanacak
    const [ show, setShow ] = useState(false)
    const [ filterText, setFilterText ] = useState(''); // Filter Text içeren Stateful Değişken
    const [ isEdit, setIsEdit ] = useState(false);
    const [ editInputs, setEditInputs] = useState({title: '', desc: '', id: ''});

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
                        <PostCard 
                            post={post} 
                            getAllPosts={getAllPosts}
                            setIsEdit={setIsEdit}
                            setEditInputs={setEditInputs}
                            handleModal={handleModal}
                        />
                    )
                })
            }

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
        </div>
    )
}

export default Post