import mongoose, { Schema } from 'mongoose';

const Follow = new Schema({
    followee: Schema.Types.ObjectId,
    follower: Schema.Types.ObjectId,
    since: { type: Date, default: Date.now },
    end: Date,
    secret: { type: Boolean, default: false }
});

export default mongoose.model('Follow', Follow);

// Reference: http://blog.mongodb.org/post/61499097398/tracking-twitter-followers-with-mongodb
//https://medium.com/@ravisuhag/follow-schema-for-mongo-db-ffcf83439c91#.fq06wty2c
