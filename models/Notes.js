import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const NoteSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'//yaha pe dusre model ka refernces diya he
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default:"General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
export default model('notes', NoteSchema);