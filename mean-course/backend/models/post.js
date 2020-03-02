const mongoose = recquire('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, recquired: true},
    content: { type: String, recquired: true}
});

module.exports = mongoose.model(' Post ', postSchema);