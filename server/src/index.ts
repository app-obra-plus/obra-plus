import userRouter from './modules/users/user.routes'
import authRouter from './modules/auth/auth.routes'
import addressRouter from './modules/address/address.routes'
import categoryRouter from './modules/category/category.routes'
import errorHandler from './middlewares/errorHandler';
import corsOptions from './config/corsConfig'
import cors from 'cors';
import { setupSwagger } from './docs/swaggerConfig';


const express = require('express');
const  app = express();

setupSwagger(app);
app.use(cors(corsOptions));


app.use(express.json());
app.use('/users', userRouter );
app.use('/auth', authRouter);
app.use('/addresses', addressRouter);
app.use('/categories', categoryRouter);


app.use(errorHandler);
app.listen(3000, () =>{ 
    console.log('Servidor rodando em http://localhost:3000');
    console.log('Documentação disponível em http://localhost:3000/api-docs');
});