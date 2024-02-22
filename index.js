import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import methodOverride from "method-override";

const app = express();
const port = 3000;

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Serve static files from the public directory and from Boostrap node modules
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/css", express.static(path.join(__dirname, "public/css")));

let articles = [
  { title: "AI Art Article 1", content: "How to Prompt? Yeah well there are plenty of ways for good prompting. We will learn the basic of prompting here." },
  { title: "AI Art Article 2", content: "How to Prompt? Yeah well there are plenty of ways for good prompting. We will learn the basic of prompting here." },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { articles, scrollTo: undefined });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.post("/submit", (req, res) => {
  let postTitle = req.body.title;
  let postContent = req.body.content;

  // Add the new article to the array
  articles.unshift({ title: postTitle, content: postContent });

  console.log("Title:", postTitle);
  console.log("Content:", postContent);

  res.render("index.ejs", { articles, scrollTo: "article" });
}); 

app.post("/delete/:index", (req, res) => {
  const index = req.params.index;

  if (index >= 0 && index < articles.length) {
    articles.splice(index, 1);
       res.render("index.ejs", { articles, scrollTo: "article" });

  } else {
    res.sendStatus(404);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
