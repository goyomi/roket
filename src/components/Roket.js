import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Roket = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      deleteDoc(doc(dbService, `tweets/${tweetObj.id}`));
    };
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    const tweetRef = doc(dbService, `tweets/${tweetObj.id}`);
    await updateDoc(tweetRef, { text: newTweet });
    setEditing(false);
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  }
  return (
    <>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="메세지를 수정하세요" value={newTweet} required onChange={onChange} />
            <input type="submit" value="수정" />
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (<>
            <button onClick={onDeleteClick}>삭제</button>
            <button onClick={toggleEditing}>수정</button>
          </>
          )}
        </>)}
    </>
  )
};

export default Roket;