import React, { useState, useEffect } from "react";
import Axios from "axios";

import SearchBar from "./components/SearchBar";
// import VideoDetail from "./components/VideoDetail";
// import VideoList from "./components/VideoList";

export default function App() {
  const [videos, setVideos] = useState();
  const [keyword, setKeyword] = useState("depression");
  const [current, setCurrent] = useState(0);

  const getVideos = keyword => {
    Axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "your keys",
        q: keyword
      }
    })
      .then(response => {
        console.log("response", response.data);
        setVideos(response.data.items);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getVideos(keyword);
  }, [keyword]);

  function handleClick(e, i) {
    e.preventDefault();
    setCurrent(i);
  }

  return (
    <div className="container pt-4">
      <h1 className="text-center mb-4">Youtube Videos</h1>
      <SearchBar onSubmit={setKeyword} />
      <div className="row">
        <div className="col-8">
          <div className="videoWrapper my-5">
            {videos && (
              <iframe
                title="Youtube"
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                src={
                  "https://www.youtube.com/embed/" + videos[current].id.videoId
                }
                frameBorder="0"
              />
            )}
          </div>
        </div>
        <div className="col-4 py-5 videoList">
          {videos &&
            videos.map((el, i) => {
              return i !== current ? (
                <div
                  className="row mb-1"
                  key={i}
                  onClick={e => {
                    handleClick(e, i);
                  }}
                >
                  <div className="col">
                    <div
                      className="videoItem mb-2"
                      style={{
                        background: `url(${el.snippet.thumbnails.medium.url})`,
                        backgroundSize: "cover"
                      }}
                    />
                  </div>
                  <div className="col">
                    <div className="videoTitle">
                      <span className="d-block">{el.snippet.title}</span>
                      <span className="text-muted font-weight-normal">
                        {el.snippet.channelTitle}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
        </div>
      </div>
      {/* <VideoDetail />
      <VideoList /> */}
    </div>
  );
}
