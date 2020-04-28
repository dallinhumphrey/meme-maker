import React, { useState, useEffect, useRef } from "react";
import DropzoneComponent from "react-dropzone-component";
import axios from "axios";
import { navigation } from "hookrouter";
import request from "superagent";

import "../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../node_modules/dropzone/dist/min/dropzone.min.css";

export default function MemeForm(props) {
  const [caption, setCaption] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [image, setImage] = useState("");
  const imageRef = useRef(null);

  const componenetConfig = () => {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  };

  const djsConfig = () => {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <div>
      <h1>Add / Edit Meme</h1>
      <form onSubmit={handleSubmit}>
        <DropzoneComponent
          ref={imageRef}
          config={componenetConfig()}
          djsConfig={djsConfig()}
          // eventHandlers={handleDrop()}
        >
          Meme goes here
        </DropzoneComponent>
      </form>
    </div>
  );
}
