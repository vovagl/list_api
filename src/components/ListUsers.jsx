
import css from './listUsers.module.css';


export default function ListUsers({ setShowList, showList, setUserPosts, usersList, setUsersMenuPosts, usersMenuPosts, userPosts }) {
    return (
        <div className={css.box}>
            <div className={css.list_users}>
                {showList && usersList.map((user =>
                    <div key={user.id} className={user.id === userPosts?.id ? css.color : css.pop}>
                        <p onClick={() => { setUserPosts(user); setUsersMenuPosts(!usersMenuPosts); setShowList(!showList) }}>{user.name}</p>
                    </div>
                ))}
            </div>
        </div >
    )
}
