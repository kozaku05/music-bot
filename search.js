const axios = require("axios");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
dotenv.config();

const geniusToken = process.env.GENIUS_TOKEN;

async function searchSong(songName) {
  let response;
  try {
    response = await axios.get(`https://api.genius.com/search?q=${songName}`, {
      headers: {
        Authorization: `Bearer ${geniusToken}`,
      },
    });
    if (response.data.response.hits.length === 0) {
      return null;
    }
  } catch (error) {
    return null;
  }

  const songData = response.data.response.hits[0].result;
  const songTitle = songData.title;
  const songUrl = songData.url;
  try {
    const lyricsPage = await axios.get(songUrl);
    const $ = cheerio.load(lyricsPage.data);
    const lyrics = $(".Lyrics-sc-1bcc94c6-1.bzTABU").text();
    return {
      title: songTitle,
      lyrics: lyrics,
      url: songUrl,
    };
  } catch (error) {
    return null;
  }
}
module.exports = searchSong;
