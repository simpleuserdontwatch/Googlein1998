const express = require("express");
const { google } = require("googleapis");
const googleapikey = process.env['API_KEY']

const customsearch = google.customsearch('v1');
const cx = 'b214c129a3afa4c64';

var path = require("path");

const app = express();

app.set('view engine', 'pug') // sadly, i have to use pug😢

async function search(query) {
  try {
    const response = await customsearch.cse.list({
      auth: googleapikey,
      cx: cx,
      q: query,
      num: 10
    });

    const searchResults = response.data.items;
    return searchResults;
  } catch (error) {
    console.error('Error searching Google:', error);
    return [];
  }
}


app.use(express.static(path.join(__dirname, "/")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/testpug", (req, res) => {
  res.render("search", {"res": "Hello!"});
});

app.get("/search", async function(req, res, next){
  const query = req.query.query;
  console.log(query)
  const results = await search(query);
  html = '';
  for (const result of results) {
    html += `<h3><a href="${result.link}">${result.title}</a></h3>`
    html += `<p>${result.snippet}</p>`
    html += `<span id="green">${result.link}</span><br>`
  }
  
  res.render("search", {"res": html, "query": query});
  
});

app.get("*", (req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname + '/404.html'));
});

app.listen(1234, () => {
  console.log("Server is listening");
});