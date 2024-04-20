const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Cognorise', {
  
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define Schema
const quizSchema = new mongoose.Schema({
  category: String,
  questions: [{
    question: String,
    options: [String],
    correctAnswerIndex: Number
  }]
});

// Create Model
const Quiz = mongoose.model('Quiz', quizSchema);

// Export Model
module.exports = Quiz;