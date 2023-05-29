import React, { useState, useEffect } from "react";

function ListTest2() {
  const [data, setData] = useState(null);

  const imageToFile = async (apiFetch='https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAZose0kFt7yu6A1pZV-U_9gbuPhJYxm52YKRVVZgi_xAihfQp3KJIj6qUJEZDzq53bNA9jEuLKfb6FfYny-Ym-LCvJvLOaTwtLyg9sdwip__3YDOidfdjuQQ5HXyUi99jFSLCsfRuKWnlsdOQhgqSzzZZ59EU9xHkU2bD-U1vZiZTaqMN729&3u1280&5m1&2e1&callback=none&key=AIzaSyDmowFuG5A64eipfP8pOHIh0v4onGzDKYk&token=12304') => {
    const returnData = null;
    await fetch(`${apiFetch}`)
      .then((response) => {
        // Check if the request was successful
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Failed to retrieve the image.');
        }
      })
      .then((blob) => {
        const reader = new FileReader();

        // Define a callback function for when the file is loaded
        reader.onloadend = () => {
          // Use the FileReader's result as the image source
          const link = reader.result;
        };

        // Start reading the blob as a data URL
        reader.readAsDataURL(blob);
        console.log(blob);
        data = blob;
      })
      .catch((error) => {
        console.error(error);
      });
    return returnData;
  };



  return (
    <div>
      <button onClick={()=>imageToFile()}>DDDFEFAAE</button>
      <p>{data}</p>
    </div>
  );
}

export default ListTest2;