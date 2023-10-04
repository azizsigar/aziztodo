import instance from "../../utils/axios";
import { useState, useEffect} from 'react'
import { Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const PostCard = ({post, getAllPosts, setIsEdit, setEditInputs, handleModal}) => {
    const [ showComment, setShowComment ] = useState(false);
    const [ comments, setComments ] = useState([]);
    const handleShowComment = () => {
        return setShowComment(!showComment);
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

    const getComments = () => {
        instance.post('/get-comments', {post_id: post._id}).then((response) => {
            if(response.data.message.data) {
                setComments(response.data.message.data)
            }
        })
    }

    const createComment = (e) => {
        e.preventDefault();
        instance.post('/create-comment', {post_id: post._id, comment: e.currentTarget.comment.value}).then((response) => {
            getComments();
        })
    }
    useEffect(() => {
        if (showComment) {
            getComments()
        }
    }, [showComment])
    return (
        <div className="d-flex flex-column align-items-end mb-3">
            <Card key={post._id} className="d-flex flex-row w-100">
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
                                </> : null
                            }
                        </div>
                    </Card.Title>
                    <Card.Text>
                    { post.desc }
                    </Card.Text>
                    <div className="position-absolute d-flex flex-row gap-2 align-items-center" style={{right: "20px", bottom: "4px"}}>
                        <div                             
                            onClick={() => {likePost(post._id)}}
                        >
                            {
                                post.likes.some(like => like === JSON.parse(window.sessionStorage.getItem('user'))._id) ? 
                                <i className="bi bi-heart-fill text-danger"></i>:
                                <i className="bi bi-heart"></i>
                            } {' '} {post.likes.length}
                            
                        </div>
                        <div 
                            onClick={() => {handleShowComment()}}
                        >
                            {
                                showComment ? <i class="bi bi-chat-fill"></i> : <i class="bi bi-chat"></i>
                            }
                        </div>
                    </div>
                    
                </Card.Body>
            </Card>
            {
                showComment ? (
                    <div className="d-flex flex-column gap-3 px-2 py-3 text-start" style={{height: "auto", width: '90%', borderBottom: '1px solid black',borderLeft: '1px solid black',borderRight: '1px solid black', overflow: "hidden"}}>
                        {
                            comments.map(comment => (
                                <div className="w-100 d-flex flex-row gap-2"><span style={{fontWeight: 600}}>{comment.author.name + ' ' + comment.author.lastName}: </span> <span style={{fontSize: "14px"}}>{comment.comment}</span></div>
                            ))
                        }
                        <Form onSubmit={createComment} className="d-flex w-100">
                            <Form.Control
                                type="text"
                                placeholder="Comment"
                                name="comment"
                                className="me-2"
                                aria-label="Comment"
                            />
                            <Button type="submit">Send</Button>
                        </Form>
                    </div>
                ) : null
            }
            
        </div>
    )
}

export default PostCard