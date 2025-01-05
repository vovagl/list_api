import React, { useEffect, useState } from "react";
import css from "./post.module.css";
import Spinner from "./Spinner";

export default function Post({ currentUser, currentPost, setCurrentPost }) {
  const [currentUserPosts, setCurrentUserPosts] = useState(null);

  useEffect(() => {
    async function getPostsUser() {
      try {
        const response = await fetch(
          `https://mate.academy/students-api/posts?userId=${currentUser.id}`
        );
        if (response.ok) {
          const postsUser = await response.json();
          setCurrentUserPosts([...postsUser]);
        } else {
          console.log(response.status);
        }
      } catch (error) {}
    }
    setCurrentUserPosts(null);
    getPostsUser();
  }, [currentUser]);

  const handleCurrentPost = (post) => {
    if (currentPost && post.id === currentPost.id) {
      setCurrentPost(null);
    } else {
      setCurrentPost(post);
    }
  };

  useEffect(() => {
    if (currentPost?.userId !== currentUser.id) {
      setCurrentPost(null);
    }
  }, [currentUser.id, currentPost?.userId, setCurrentPost]);

  return (
    <>
      {!currentUserPosts && <Spinner />}
      <div className={css.block}>
        {currentUserPosts?.length === 0 && (
          <div className={css.no_post}>
            <p>No posts yet</p>
          </div>
        )}
        {currentUserPosts?.length > 0 && (
          <div className={css.container}>
            <h1>Posts:</h1>
            <table className={css.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>
                    <button></button>
                  </th>
                </tr>
              </thead>
              {currentUserPosts.map((post) => (
                <tbody key={post.id}>
                  <tr>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td className={css.button}>
                      <button
                        className={
                          currentPost?.id !== post.id ? css.btn : css.btn_color
                        }
                        onClick={() => {
                          handleCurrentPost(post);
                        }}
                      >
                        {currentPost?.id !== post.id ? "Open" : "Close"}
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}
      </div>
    </>
  );
}
