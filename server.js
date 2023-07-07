const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require('cors');

const { readdir } = require('fs/promises');
const path = require('path');



const authKey = 'ac2cc116-379a-6ee6-8b30-f3b19435a6e2:fx'
const deepl = require('deepl-node');
const translator = new deepl.Translator(authKey);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 4500;
// const uri = "mongodb+srv://JD:infotech1212@cluster0.djadths.mongodb.net/DragonWorldDB";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>
//   console.log("Connected with MongoDB")).catch((err) => { console.log(err) })


/*const bikeSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: [String],
    required: true,
  },
  rental: {
    type: Number,
    required: true,
  },
});

const rentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  bikeDetails: { type: bikeSchema, required: true }
})

const rented = new mongoose.model('renteds', rentSchema)
const bikeDetails = new mongoose.model("bikedetails", bikeSchema);

app.get("/fetchBikes", async (req, res) => {
  const data = await bikeDetails.find({});
  res.send(data)
});

app.post("/rent", async (req, res) => {
  const data = new rented(req.body)
  data.save()
  console.log(req.body);
})*/

app.get("/", async (req, res) => {
  res.sendFile("C:/Users/tomty/Downloads/cache (3)/cache/Login.html")
});

const findByExtension = async (dir, ext) => {
  const matchedFiles = [];

  const files = await readdir(dir);

  for (const file of files) {
      // Method 1:
      const fileExt = path.extname(file);

      if (fileExt === `.${ext}`) {
          matchedFiles.push(file);
      }
  }

  return matchedFiles;
};

app.get("/", async (req, res) => {
  const files = await findByExtension('./', 'html')
  for (let file of files){
    
    try {
      await translator.translateDocument(
          __dirname + '/' + file,
          __dirname + '/ko_' + file,
          'en',
          'ko',
          // { formality: 'more' },
      );
  } catch (error) {
      // If the error occurs after the document was already uploaded,
      // documentHandle will contain the document ID and key
      if (error.documentHandle) {
          const handle = error.documentHandle;
          console.log(`Document ID: ${handle.documentId}, ` + `Document key: ${handle.documentKey}`);
      } else {
          console.log(`Error occurred during document upload: ${error}`);
      }
  }


  }



  res.send('hello')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:4500`);
});