import Tweet from "components/Roket";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import Roket from "components/Roket";

const Home = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "tweets"), snapshot => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "tweets"), {
      text: tweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
    })
    setTweet("");
  };

  const onChange = (event) => {
    const { target: { value }, } = event;
    setTweet(value);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={tweet} onChange={onChange} type="text" placeholder="메세지를 입력해주세요" maxLength={120} />
        <input type="submit" value="Roket" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <Roket key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};


export default Home;