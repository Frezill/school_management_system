import express from 'express'

//config
const PORT = process.env.PORT || 1507
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.listen(PORT, () => {
    console.log('app listen on port: ', PORT);
})