import React, { useState, useEffect } from "react";
import css from "./header.module.css";
import ListUsers from "./ListUsers";
import Post from "./Post";
import Icon from "../vip_icon_264042.webp";
import Comment from "./Comment";
import useSound from "use-sound";
import singl from "./Magneto_—_Vuela,_Vuela_Voyage,_Voyage_www_lightaudio_ru.mp3";

export default function Header() {
  const [usersList, setUsersList] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isShowList, setIsShowList] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [play, setPlay] = useState(false);

  const [sound] = useSound(singl, { loop: true });

  useEffect(() => {
    async function getListUsers() {
      try {
        const response = await fetch("https://mate.academy/students-api/users");
        if (response.ok) {
          const list = await response.json();
          setUsersList([...list]);
        } else {
          console.log(response.status);
        }
      } catch (error) {}
    }
    getListUsers();
  }, []);

  const openListUsers = () => {
    setIsShowList((cur) => !cur);
    setPlay(true);
  };

  useEffect(() => {
    if (play) {
      sound();
    }
  }, [play, sound]);
  
  return (
    <main className={css.section}>
      <div className={css.block}>
        <div className={css.wrapper}>
          <div className={css.container}>
            <div className={css.left}>
              <div className={css.box}>
                <button
                  type="button"
                  className={css.button}
                  onClick={openListUsers}
                >
                  {!currentUser ? "Choose a user" : `${currentUser.name}`}
                  <span>
                    <img src={Icon} alt="#"></img>
                  </span>
                </button>
                {isShowList && (
                  <ListUsers
                    setIsShowList={setIsShowList}
                    currentUser={currentUser}
                    usersList={usersList}
                    setCurrentUser={setCurrentUser}
                  />
                )}
                {!currentUser && <h4 className={css.user}>No user selected</h4>}
                {currentUser && (
                  <Post
                    currentUser={currentUser}
                    currentPost={currentPost}
                    setCurrentPost={setCurrentPost}
                  />
                )}
              </div>
            </div>
            <Comment currentPost={currentPost} />
          </div>
        </div>
      </div>
    </main>
  );
}
