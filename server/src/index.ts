import userRouter from './modules/users/user.routes'
import authRouter from './modules/auth/auth.routes'
import errorHandler from './middlewares/errorHandler';
import corsOptions from './config/corsConfig'
import cors from 'cors';

const express = require('express');
const  app = express();
app.use(cors(corsOptions));


app.use(express.json());
app.use('/users', userRouter );
app.use('/auth', authRouter);


app.use(errorHandler);
app.listen(3000, () =>console.log("Servidor rodando"));