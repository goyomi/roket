import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";

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
          <div key={tweet.id}>
            <h4>{tweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Home;