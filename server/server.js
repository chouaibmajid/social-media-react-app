import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// const mongoosUrl =
//   "mongodb+srv://chouaib:test1995@cluster0.kuw8g.mongodb.net/setPosts?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.mongoosUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`SERVER IS RUNNING ON port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

app.get("/", async (req, res) => {
  try {
    const Posts = await PostMessage.find();
    res.status(200).json(Posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  const Post = req.body;
  const newPost = new PostMessage(Post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.patch("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const nvPast = req.body;

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, nvPast, {
    new: true,
  });

  res.json(updatedPost);
});

app.patch("/:id/likepost", async (req, res) => {
  const { id } = req.params;
  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost);
});
app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
});
