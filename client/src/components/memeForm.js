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

  const handleDrop = () => {
    return {
      addedfile: (file) => {
        let upload = request
          .post("https://api.cloudinary.com/v1_1/dhmonster/image/upload")
          .field("upload_preset", "meme-images")
          .field("file", file);

        upload.end((err, res) => {
          if (err) {
            console.log("Cloudinary error: ", err);
          }
          if (res.body.secure_url !== "") {
            setImage(res.body.secure_url);
          }
        });
      },
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
          eventHandlers={handleDrop()}
        >
          Meme goes here
        </DropzoneComponent>

        <input
          type="text"
          placeholder="Enter a Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            checked={favorite}
            onChange={() => setFavorite(!favorite)}
          />
          <span>Favorite?</span>
        </div>
        <button type="submit">Post / Edit Meme</button>
      </form>
    </div>
  );
}
