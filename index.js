const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const catRoute = require("./routes/categorys");
const multer = require("multer");
const path = require("path");
const commentRoute = require("./routes/comment");
const cookieParser=require("cookie-parser")
const cors = require("cors");



app.use(cors());
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")));
app.use(cookieParser());


require("./database/db")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });




app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postsRoute);
app.use("/api/categories",catRoute);
app.use("/api/comment/new",commentRoute);


const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`serve running at http://localhost:${port}`);
})

