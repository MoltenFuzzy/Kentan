const { model, Schema } = require("mongoose");

const userSchema = new Schema(
	{
		name: String,
		email: String,
		picture: String,
		interests: [String],
		about: String,
		likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
		matches: [{ type: Schema.Types.ObjectId, ref: "USer" }]
	},
	{ timestamps: true }
);

module.exports = model("User", userSchema);
