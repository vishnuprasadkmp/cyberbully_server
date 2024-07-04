import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId, // Unique identifier for the comment
  userId: String,
  firstName: String, // Changed to firstName
  comment: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  prediction: String,
  // Add more fields as needed
});

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
      // No need for userId here, it's inferred from Map type
    },
    comments: [commentSchema], // Embed commentSchema for clarity and potential reuse
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Post = mongoose.model("Post", postSchema);

export default Post;
