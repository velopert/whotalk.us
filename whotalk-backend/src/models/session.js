import mongoose, { Schema } from 'mongoose';

const Session = new Schema({
    _id: String,
    session: String,
    expires: Schema.Types.Mixed
});

export default mongoose.model('Session', Session);
