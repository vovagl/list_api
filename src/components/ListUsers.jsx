
import css from './listUsers.module.css';


export default function ListUsers({ setShowList, showList, setUserPosts, usersList, setUsersMenuPosts, usersMenuPosts, userPosts,
    setDouble, posts }) {

    const choiceUser = (user) => {
        if (user.id === posts[0]?.userId) {
            setDouble(true)
        }
        else {
            setDouble(false)
        }
        setUserPosts(user);
        setUsersMenuPosts(!usersMenuPosts);
        setShowList(!showList);
    }

    return (
        <div className={css.list_users}>
            {showList && usersList.map((user =>
                <div key={user.id} className={user.id === userPosts?.id ? css.color : css.pop}>
                    <p onClick={() => choiceUser(user)}>{user.name}</p>
                </div>
            ))}
        </div>
    )
}
