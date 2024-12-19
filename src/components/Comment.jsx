import React, { useState, useEffect } from 'react';
import css from './comment.module.css';
import Form from './Form';
import cx from 'classnames';

export default function Comment({ bodyPost, openForm, setOpenForm, double }) {
    const [commentText, setCommentText] = useState([]);

    //let rightNow = `posts/${bodyPost.id}`
    /* useEffect(() => {
         async function showPostUsers() {
             try {
                 const response = await fetch(`https://mate.academy/students-api/${rightNow}`)
                 if (response.ok) {
                     const textUser = await response.json()
                     console.log(textUser);
                     setText(textUser)
 
                 } else {
                     console.log(response.status);
                 }
             } catch (error) {
             }
         }
         showPostUsers()
     }, [rightNow])*/
    let rightComments = `${bodyPost?.id}`

    useEffect(() => {
        if (bodyPost) {
            async function showCommentsUsers() {
                try {
                    const response = await fetch(`https://mate.academy/students-api/comments?postId=${rightComments}`)
                    if (response.ok) {
                        const commentsUser = await response.json()
                        //console.log(commentsUser);
                        setCommentText(commentsUser)
                    } else {
                        console.log(response.status);
                    }
                } catch (error) {
                }
            }
            showCommentsUsers()
        }
    }, [rightComments, bodyPost])

    const deleteComment = (id) => {
        setCommentText([...commentText.filter((comment) => comment.id !== id)])
        async function commentDelete() {
            try {
                const response = await fetch(`https://mate.academy/students-api/comments/${id}`, {
                    method: "DELETE"
                })
                if (response.ok) {
                    const removal = await response.json()
                    console.log(removal);

                } else {
                    console.log(response.status);
                }
            } catch (error) {
            }
        }
        commentDelete()
    }

    const handleForm = () => {
        setOpenForm(true)
    }

    return (
        <div className={cx(css.right, double && css.rights)}>
            {bodyPost &&
                < div className={css.box} >
                    <div className={css.block}>
                        <h2 className={css.p}>#{bodyPost?.id}: {bodyPost?.title}</h2>
                        <p className={css.p}>{bodyPost?.body}</p>
                    </div>
                    {
                        commentText.length !== 0 &&
                        <>
                            <div className={css.block}>
                                <p className={css.title}>Comments :</p>
                                {commentText.map(comment => (
                                    <div key={comment.id}>
                                        < div className={css.name}><a href={`mailto:${comment.email}`}> {comment.name}</a>
                                            <button className={css.delete} onClick={() => deleteComment(comment.id)}>x</button>
                                        </div>
                                        <div className={css.body}>{comment.body}</div>
                                    </div>))
                                }
                            </div>
                            < button className={css.btn} onClick={handleForm}>Write a comment</button>
                        </>
                    }
                    {
                        commentText.length === 0 &&
                        <div className={css.text}>
                            <p className={css.title}>No comments yet</p>
                            <button className={css.btn} onClick={handleForm}>Write a comment</button>
                        </div>
                    }
                    {openForm && <Form commentText={commentText} setCommentText={setCommentText} bodyPost={bodyPost} />}
                </div >
            }
        </div>
    )
}
