import { useEffect, useRef } from "react";
import css from "./listUsers.module.css";

export default function ListUsers({
  setIsShowList,
  setCurrentUser,
  usersList,
  currentUser,
}) {
  const divRef = useRef();
  useEffect(() => {
    const closeUsersList = (e) => {
      if (
        divRef.current &&
        !divRef.current.contains(e.target) &&
        !e.target.className.includes("header_button")
      ) {
        setIsShowList(() => false);
      }
    };
    document.addEventListener("mousedown", closeUsersList);
    return () => {
      document.removeEventListener("mousedown", closeUsersList);
    };
  }, []);

  const composeUserPosts = (user) => {
    setCurrentUser(user);
    setIsShowList(false);
  };

  return (
    <div className={css.list_users} ref={divRef}>
      {usersList.map((user) => (
        <div
          key={user.id}
          className={user.id === currentUser?.id ? css.color : null}
        >
          <p onClick={() => composeUserPosts(user)}>{user.name}</p>
        </div>
      ))}
    </div>
  );
}
