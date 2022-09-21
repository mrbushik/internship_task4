const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const corsMiddleware = require('./middleware/cors.middleware');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(corsMiddleware);
app.use(express.json());
app.use('/auth', authRouter);
const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:admin@cluster0.1dlzqjz.mongodb.net/task?retryWrites=true&w=majority`,
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
