import React, { useState, useEffect } from "react";
import css from "./comment.module.css";
import Form from "./Form";
import cx from "classnames";
import Spinner from "./Spinner";

export default function Comment({ currentPost }) {
  const [comments, setComments] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  useEffect(() => {
    if (currentPost) {
      async function getComments() {
        setIsCommentsLoading(false);
        if (isCommentsLoading) return;
        setIsCommentsLoading(true);
        try {
          const response = await fetch(
            `https://mate.academy/students-api/comments?postId=${currentPost.id}`
          );
          if (response.ok) {
            const commentsUsers = await response.json();
            setComments(commentsUsers);
          } else {
            console.log(response.status);
          }
        } catch (error) {
        } finally {
          setIsCommentsLoading(false);
        }
      }
      getComments();
    }
  }, [currentPost]);

  const removeComment = (id) => {
    setComments([...comments.filter((comment) => comment.id !== id)]);
    async function deleteComment() {
      try {
        const response = await fetch(
          `https://mate.academy/students-api/comments/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          await response.json();
        } else {
          console.log(response.status);
        }
      } catch (error) {}
    }
    deleteComment();
  };

  const handleForm = () => {
    setIsOpenForm(true);
  };

  useEffect(() => {
    setIsOpenForm(false);
  }, [currentPost]);

  return (
    <div className={cx(css.right, currentPost && css.open)}>
      {currentPost && (
        <div className={css.box}>
          <div className={css.block}>
            <h2 className={css.p}>
              #{currentPost?.id}: {currentPost?.title}
            </h2>
            <p className={css.p}>{currentPost?.body}</p>
          </div>
          {isCommentsLoading && <Spinner />}
          {comments.length !== 0 && !isCommentsLoading && (
            <>
              <div className={css.block}>
                <p className={css.title}>Comments :</p>
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <div className={css.name}>
                      <a href={`mailto:${comment.email}`}> {comment.name}</a>
                      <button
                        className={css.delete}
                        onClick={() => removeComment(comment.id)}
                      >
                        x
                      </button>
                    </div>
                    <div className={css.body}>{comment.body}</div>
                  </div>
                ))}
                <button className={css.btn} onClick={handleForm}>
                  Write a comment
                </button>
              </div>
            </>
          )}
          {comments.length === 0 && !isCommentsLoading && (
            <div className={css.block}>
              <p className={css.title}>No comments yet</p>
              <button className={css.btn} onClick={handleForm}>
                Write a comment
              </button>
            </div>
          )}

          {isOpenForm && (
            <Form
              comments={comments}
              setComments={setComments}
              currentPost={currentPost}
            />
          )}
        </div>
      )}
    </div>
  );
}
