import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
// middlware

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
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});
const User = mongoose.model("User", userSchema);

const PostMessage = mongoose.model("PostMessage", postSchema);
app.get("/posts/search", async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");
    const Posts = await PostMessage.find({ title });
    res.status(200).json(Posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.get("/posts", async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 8;
    const startIndex = (Number(page) - 1) * limit;
    const Total = await PostMessage.countDocuments({});

    const Posts = await PostMessage.find().sort({_id: -1}).limit(limit).skip(startIndex)
    res.status(200).json({data:Posts, currentPage:Number(page) , numberOfPages: Math.ceil(Total / limit)});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/posts", auth, async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.patch("/posts/:id", auth, async (req, res) => {
  const { id: _id } = req.params;
  const nvPast = req.body;

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, nvPast, {
    new: true,
  });

  res.json(updatedPost);
});

app.patch("/posts/:id/likepost", auth, async (req, res) => {
  const { id } = req.params;
  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((item) => item === req.userId);
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
});
app.delete("/posts/:id", auth, async (req, res) => {
  const { id } = req.params;

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
});

app.post("/posts/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
});

app.post("/posts/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
