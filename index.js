import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory and from Boostrap node modules
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/css", express.static(path.join(__dirname, "public/css")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.post("/submit", (req, res) => {
  let postTitle = req.body.title;
  let postContent = req.body.Content;
  console.log("Title:", postTitle);
  console.log("Content:", postContent);

  res.redirect("/#article");
});
// preparing soon app.post("submit" , { title and content}) maybe in an array? who knows?

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
