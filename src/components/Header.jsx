import React, { useState, useEffect } from 'react'
import css from './header.module.css';
import ListUsers from './ListUsers';
import Post from './Post';
import Icon from '../vip_icon_264042.webp';
import cx from 'classnames';
import Comment from './Comment';

export default function Header() {
    const [usersMenuPosts, setUsersMenuPosts] = useState(true);
    const [usersList, setUsersList] = useState([]);
    const [userPosts, setUserPosts] = useState(null);
    const [showList, setShowList] = useState(false);
    const [double, setDouble] = useState(false);
    const [bodyPost, setBodyPost] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [posts, setPosts] = useState([]);

    let rightNowPosts = `posts?userId=${userPosts?.id}`

    useEffect(() => {
        if (userPosts) {
            async function showPostUsers() {
                try {
                    const response = await fetch(`https://mate.academy/students-api/${rightNowPosts}`)
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
        }
    }, [rightNowPosts, userPosts])


    let rightNow = 'users';

    async function showListUsers() {
        try {
            const response = await fetch(`https://mate.academy/students-api/${rightNow}`)
            if (response.ok) {
                const list = await response.json()
                //console.log(list);
                setUsersList([...list])
            } else {
                console.log(response.status);
            }
        } catch (error) {
        }
    }

    const openListUsers = () => {
        if (!showList) {
            showListUsers()
        }
        setUsersMenuPosts(!usersMenuPosts)
        setShowList(!showList)
    }

    return (
        <main className={css.section}>
            <div className={css.block}>
                <div className={css.wrapper}>
                    <div className={cx(css.container, double && css.flex)}>
                        <div className={cx(css.left, !double && css.lefts)}>
                            <div className={css.box}>
                                <button type='button' className={css.button} onClick={openListUsers}>
                                    {!userPosts ? 'Choose a user' : `${userPosts.name}`}<span><img src={Icon} alt='#'></img></span></button>
                                {(showList && !usersMenuPosts) && <ListUsers setShowList={setShowList} userPosts={userPosts} usersMenuPosts={usersMenuPosts}
                                    setUsersMenuPosts={setUsersMenuPosts} showList={showList} usersList={usersList} setUserPosts={setUserPosts}
                                    setDouble={setDouble} posts={posts} />}
                                {(!userPosts) && <h4 className={css.user}>No user selected</h4>}
                                {userPosts &&
                                    <Post userPosts={userPosts} setUsersMenuPosts={setUsersMenuPosts}
                                        setShowList={setShowList} setDouble={setDouble}
                                        bodyPost={bodyPost} setBodyPost={setBodyPost} setOpenForm={setOpenForm} posts={posts}
                                    />}
                            </div>
                        </div>
                        <Comment bodyPost={bodyPost} openForm={openForm} setOpenForm={setOpenForm} double={double} />
                    </div>
                </div>
            </div >
        </main >
    )
}


