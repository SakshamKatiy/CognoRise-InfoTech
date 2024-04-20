const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Quiz = require('./conn');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoints
app.get('/api/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/submit-quiz', async (req, res) => {
    const { quizId, userAnswers } = req.body;
    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).send('Quiz not found');

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswerIndex === userAnswers[index]) {
                score++;
            }
        });

        res.json({ score });
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
