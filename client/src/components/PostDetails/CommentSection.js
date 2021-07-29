import React, {useState, useRef} from 'react'
import {Typography, TextField, Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import {commentPost} from '../../actions/posts'

const CommentSection = ({post}) => {
    const classes = useStyles();

    const [ comments,setComments ] = useState(post?.comments) //useSelector((state) => post.comments) work as welll
    const [ comment,setComment ] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();

    const commentsRef = useRef();

    const hanldeClick = async (e) => {
        const finalComment = `${user?.result?.name} : ${comment}`
        const newComments = await dispatch(commentPost(finalComment, post._id))

        setComments(newComments)
        setComment('') //reset comment section

        commentsRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
          });
    }

    return (
        <div>
            <div className={classes.commentOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comment</Typography>
                    {comments.map((comment, index) =>(
                        <Typography key={index} gutterBottom variant='subtitle1'>
                            <strong>{comment.split(':')[0]} : </strong> {comment.split(':')[1]} 
                        </Typography>
                    ))}
                    
                    <div ref={commentsRef}/>
                </div>
                
                {user &&    (<div styles={{width: '70%'}}>
                <Typography gutterBottom variant='subtitle1'>Write a comment</Typography>
                <TextField 
                    fullWidth 
                    rows={4} 
                    variant='outlined' 
                    label='Comment' 
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}/>
                <Button 
                    style={{marginTop: '10px'}} 
                    fullWidth 
                    variant='contained'
                    color='primary'
                    disabled={false} 
                    onClick={hanldeClick}>
                    Comment
                </Button>
                </div>)}

            </div>
        </div>
    )
}

export default CommentSection


