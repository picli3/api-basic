import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

import {createRoles} from './libs/initialSetup'

const app = express()

createRoles();
app.use(express.json())


app.set('pkg',pkg)

app.use(morgan('dev'));

app.get('/',(req,res)=>{
	res.json(pkg)
})

app.use('/products',productsRoutes)
app.use('/auth',authRoutes)
app.use('/user',userRoutes)

export default app;