import React, { useEffect, useState } from 'react'
import css from './post.module.css';
import Comment from './Comment';





export default function Post({ userPosts, setUsersMenuPosts, usersMenuPosts, showList, setShowList }) {
    const [posts, setPosts] = useState([]);
    const [bodyPost, setBodyPost] = useState(null);

    let rightNow = `posts?userId=${userPosts?.id}`

    useEffect(() => {
        async function showPostUsers() {
            try {
                const response = await fetch(`https://mate.academy/students-api/${rightNow}`)
                if (response.ok) {
                    const postsUser = await response.json()
                    //console.log(postsUser);
                    setPosts([...postsUser])
                } else {
                    console.log(response.status);
                }
            } catch (error) {
            }
        }
        showPostUsers()
    }, [rightNow])

    const handleClick = (post) => {
        if (bodyPost && post.id === bodyPost.id) {
            setBodyPost(null)
        }
        else {
            setBodyPost(post)
        }
        setUsersMenuPosts(true)
        setShowList(false)
    }

    useEffect(() => {
        if (bodyPost?.userId !== userPosts.id) {
            setBodyPost(null)
        }
    }, [userPosts.id, bodyPost?.userId])

    /*async function addPost() {
        try {
            const response = await fetch('https://mate.academy/students-api/posts', {
                method: "POST",
                body: JSON.stringify(
                    {
                        "userId": 2059,
                        'title': 'пробую пост',
                        'body': 'получилось'
                    }
                ),
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                }
            })
            if (response.ok) {
                const post = await response.json()

                console.log(post);
            } else {
                console.log(response.status);
            }
        } catch (error) {
        }
    }
    //addPost()*/

    return (
        <>
            <div className={css.block}>
                {posts.length === 0 && <div className={css.no_post}><p>No posts yet</p></div>}
                {posts.length > 0 &&
                    <div className={css.container}>
                        <h1>Posts:</h1>
                        <table className={css.table}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th><button></button></th>
                                </tr>
                            </thead>
                            {posts.map((post =>
                                <tbody key={post.id}>
                                    <tr>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td className={css.button}>
                                            <button className={bodyPost?.id !== post.id ? css.btn : css.btn_color} onClick={() => {
                                                handleClick(post);
                                            }}>{bodyPost?.id !== post.id ? 'Open' : 'Close'}</button></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                }
            </div>
            {(bodyPost?.userId === userPosts.id) && <Comment bodyPost={bodyPost} userPosts={userPosts} />
            }
        </>
    )
}