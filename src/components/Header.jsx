import React, { useState } from 'react'
import css from './header.module.css';
import ListUsers from './ListUsers';
import Post from './Post';

export default function Header() {
    const [usersMenuPosts, setUsersMenuPosts] = useState(true);
    const [usersList, setUsersList] = useState([]);
    const [userPosts, setUserPosts] = useState(null);
    const [showList, setShowList] = useState(false);


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

    /*useEffect(() => {
        async function createUser() {
            try {
                const response = await fetch('https://mate.academy/students-api/users', {
                    method: 'POST',
                    body: JSON.stringify({
                        "name": "Vladimir1971",
                        "username": "VOVA1971",
                        "email": "vova@gmail.com",
                        "phone": "1234567890"
                    }),
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                })
                if (response.ok) {
                    const list = await response.json()
                    console.log(list);
                    //setUsers([...list])
                } else {
                    console.log(response.status);
                }
            } catch (error) {
                console.log(error);
            }
        }
        createUser()
    }, [])*/

    return (
        <main className={css.section}>
            <div className={css.wrapper}>
                <div className={css.box}>
                    <div className={css.block}>
                        <button type='button' className={css.button} onClick={openListUsers}>
                            {!userPosts ? 'Choose a user' : `${userPosts.name}`}<span><img src='vip_icon_264042.webp' alt='#'></img></span></button>
                        {(showList && !usersMenuPosts) && <ListUsers setShowList={setShowList} userPosts={userPosts} usersMenuPosts={usersMenuPosts}
                            setUsersMenuPosts={setUsersMenuPosts} showList={showList} usersList={usersList} setUserPosts={setUserPosts} />}
                    </div>
                    {userPosts &&
                        <Post userPosts={userPosts} usersMenuPosts={usersMenuPosts} setUsersMenuPosts={setUsersMenuPosts}
                            setShowList={setShowList} showList={showList} />}
                    {(!userPosts) && <h4 className={css.user}>No user selected</h4>}
                </div>
            </div>
        </main >
    )
}


