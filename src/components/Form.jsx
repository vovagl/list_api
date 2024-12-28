import React, { useEffect, useState } from "react";
import css from "./form.module.css";
import SpinnerSmall from "./Spinner_small";

export default function Form({ comments, setComments, currentPost }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newComment, setNewComment] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [textError, setTextError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isNewCommentLoading, setIsNewCommentLoading] = useState(false);

  const nameChange = (event) => {
    setName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const textareaChange = (event) => {
    setNewComment(event.target.value);
  };

  useEffect(() => {
    if (isFormValid) {
      if (name.length < 1) {
        setNameError("Name is required");
      } else {
        setNameError("");
      }
    }
    if (!isFormValid) {
      setNameError("");
    }
  }, [name, isFormValid]);

  useEffect(() => {
    if (isFormValid) {
      if (email.length < 1) {
        setEmailError("Email is required");
      } else {
        setEmailError("");
      }
    }
    if (!isFormValid) {
      setEmailError("");
    }
  }, [email, isFormValid]);

  useEffect(() => {
    if (isFormValid) {
      if (newComment.length < 1) {
        setTextError("Enter some text");
      } else {
        setTextError("");
        setIsFormValid(false);
      }
    }
    if (!isFormValid) {
      setTextError("");
    }
  }, [newComment, isFormValid]);

  const addComment = (event) => {
    event.preventDefault();
    setIsFormValid(true);
    if (name.length > 0 && email.length > 0 && newComment.length > 0) {
      setIsFormValid(false);
      async function submitComment() {
        if (isNewCommentLoading) return;
        setIsNewCommentLoading(true);
        try {
          const response = await fetch(
            "https://mate.academy/students-api/comments",
            {
              method: "POST",
              body: JSON.stringify({
                postId: currentPost.id,
                name: `${name}`,
                email: `${email}`,
                body: `${newComment}`,
              }),
              headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
            }
          );
          if (response.ok) {
            const comment = await response.json();
            setComments([...comments, comment]);
          } else {
            console.log(response.status);
          }
        } catch (error) {
        } finally {
          setIsNewCommentLoading(false);
        }
      }
      submitComment();
      setNewComment("");
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setNewComment("");
    setIsFormValid(false);
  };

  return (
    <form className={css.comment}>
      <div className={css.wrapper}>
        <label>
          <h4>Author Name</h4>
        </label>
        <div className={css.box}>
          <input
            type="text"
            name="name"
            placeholder="Name Surname"
            value={name}
            onChange={nameChange}
            className={nameError && css.input_error}
          ></input>
          {nameError && <p className={css.error}>{nameError}</p>}
        </div>
      </div>
      <div className={css.wrapper}>
        <label>
          <h4>Author Email</h4>
        </label>
        <div className={css.box}>
          <input
            type="text"
            name="email"
            placeholder="email@test.com"
            value={email}
            onChange={emailChange}
            className={emailError && css.input_error}
          ></input>
          {emailError && <p className={css.error}>{emailError}</p>}
        </div>
      </div>
      <div className={css.wrapper}>
        <label>
          <h4>Comment Text</h4>
        </label>
        <div className={css.box}>
          <textarea
            type="text"
            name="textarea"
            className={textError ? css.textarea_error : css.textarea}
            placeholder="Type comment here"
            value={newComment}
            onChange={textareaChange}
          ></textarea>
          {textError && <p className={css.error}>{textError}</p>}
        </div>
      </div>
      <div className={css.btn}>
        <div>
          <button type="submit" className={css.button_add} onClick={addComment}>
            {isNewCommentLoading ? <SpinnerSmall /> : "Add"}
          </button>
        </div>
        <div>
          <button type="reset" className={css.button_clear} onClick={clearForm}>
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}
