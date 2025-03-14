const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Topic schema for embedded topic objects
const TopicSchema = new Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },

});

// Define the main Tutorial schema
const TutorialSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
},
image: { type: String,required: true },
email: {
    type: String,
    required: true,
},
  topics: { type: [TopicSchema], default: [] },
  author: { type: String, required: true },
  publishedDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

// Use an existing model if available, otherwise create a new model
const BlogsModel = mongoose.models.Blogs || mongoose.model('Blogs', TutorialSchema);

// Export the model
module.exports = BlogsModel;
