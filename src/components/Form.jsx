import React, { useEffect, useState } from 'react'
import css from './form.module.css';

export default function Form({ commentText, setCommentText, bodyPost }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [textComment, setTextComment] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [textError, setTextError] = useState('');
    const [formValid, setFormValid] = useState(false);

    const nameChange = (event) => {
        setName(event.target.value)
    };
    const emailChange = (event) => {
        setEmail(event.target.value)
    };
    const textareaChange = (event) => {
        setTextComment(event.target.value)
    };

    useEffect(() => {
        if (formValid) {
            if (name.length < 1) {
                setNameError('Name is required')
            }
            else {
                setNameError('')
            }
        }
        if (!formValid) {
            setNameError('')
        }
    }, [name, formValid])

    useEffect(() => {
        if (formValid) {
            if (email.length < 1) {
                setEmailError('Email is required')
            }
            else {
                setEmailError('')
            }
        }
        if (!formValid) {
            setEmailError('')
        }
    }, [email, formValid])

    useEffect(() => {
        if (formValid) {
            if (textComment.length < 1) {
                setTextError('Enter some text')
            }
            else {
                setTextError('')
                setFormValid(false)
            }
        }
        if (!formValid) {
            setTextError('')
        }
    }, [textComment, formValid])

    const todoComment = (event) => {
        event.preventDefault()
        setFormValid(true)
        if (name.length > 0 && email.length > 0 && textComment.length > 0) {
            setFormValid(false)
            async function addComment() {
                try {
                    const response = await fetch('https://mate.academy/students-api/comments', {
                        method: "POST",
                        body: JSON.stringify(
                            {
                                "postId": bodyPost.id,
                                'name': `${name}`,
                                'email': `${email}`,
                                'body': `${textComment}`
                            }
                        ),
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                        }
                    })
                    if (response.ok) {
                        const comment = await response.json()
                        setCommentText([...commentText, comment])
                        //console.log(comment);
                    } else {
                        console.log(response.status);
                    }
                } catch (error) {
                }
            }
            addComment()
            setTextComment('')
        }
    }

    const clearComment = () => {
        setName('')
        setEmail('')
        setTextComment('')
        setFormValid(false)
    }

    return (
        <form className={css.comment}>
            <div className={css.wrapper}>
                <label>
                    <h4>Author Name</h4>
                </label>
                <div className={css.box}>
                    <input type='text' name='name' placeholder='Name Surname' value={name} onChange={nameChange} className={nameError && css.input_error} ></input>
                    {nameError && <p className={css.error}>{nameError}</p>}
                </div>
            </div >
            <div className={css.wrapper}>
                <label>
                    <h4>Author Email</h4>
                </label>
                <div className={css.box}>
                    <input type='text' name='email' placeholder='email@test.com' value={email} onChange={emailChange} className={emailError && css.input_error}></input>
                    {emailError && <p className={css.error}>{emailError}</p>}
                </div>
            </div>
            <div className={css.wrapper}>
                <label>
                    <h4>Comment Text</h4>
                </label>
                <div className={css.box}>
                    <textarea type='text' name='textarea' className={textError ? css.textarea_error : css.textarea} placeholder='Type comment here' value={textComment} onChange={textareaChange} ></textarea>
                    {textError && <p className={css.error}>{textError}</p>}
                </div>
            </div>
            <div className={css.btn}>
                <div>
                    <button type='submit' className={css.button_add} onClick={todoComment}>Add</button>
                </div>
                <div>
                    <button type='reset' className={css.button_clear} onClick={clearComment}>Clear</button>
                </div>
            </div>
        </form >
    )
}
