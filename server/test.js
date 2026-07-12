const mongoose = require("mongoose");

const uri =
"mongodb+srv://triveni:maheswari123@cluster0.aleften.mongodb.net/filemanagement?appName=Cluster0"
mongoose.connect(uri)
.then(() => {
    console.log("✅ Connected");
    process.exit(0);
})
.catch((err) => {
    console.log(err);
    process.exit(1);
});