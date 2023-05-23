import React, { useState, useEffect } from "react";
import axios from "axios";

function ListTest() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/search/photos?client_id=cjj0NJ5aXgoO7iQZmizJJwOPeU2EH--C46El8zcmArQ&query=Jakarta"
      )
      .then((res) => {
        setPhotos(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(photos)

  return (
    <div>
        <img src={photos[0]?.urls.regular} alt={photos[0]?.alt_description} />
    </div>
  );
}

export default ListTest;