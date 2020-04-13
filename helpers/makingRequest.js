const axios = require("axios");
const getBuffer = require("./getBuffer");

module.exports = async (track, artist) => {
  const link = encodeURI(
    `https://spotify-grabber.herokuapp.com/?title=${artist} ${track}&type=track`
  );
  try {
    const res = await axios.get(link);
    const data = res.data;
    // Sure that will not change between track and album
    const coverImage = await getBuffer(data.albumCover);
    const artist = data.artists;
    const albumName = data.albumName;
    const title = data.title;

    return [title, artist, albumName, coverImage, data.albumCover];
  } catch (e) {
    return null;
  }
};
