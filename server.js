// require's
const cors = require('cors')
const express = require('express')
const { connectDB } = require('./db/db-connect')
const { getJsonResponse } = require('./s-controllers/s-controller')

// intialization's
const app = express()
const port = process.env.PORT || 3000


// middlewares
app.use(express.urlencoded({ extended : false}))
app.use(express.json())
app.use(cors({
    origin : '*',
    credentials : true
}))

app.get('/',(req,res) => {
    res.status(200).send({
        msg : `server is runnin on port ${port}`
    })
})

app.get('/get-votes' ,async (req,res) => {
    const response = await connectDB({
        action : 'read'
    })
    if(response){
        res.json(getJsonResponse(response))
    }else{
        console.log('internal server error 500')
        res.status(500).json({  
            accepted : true,
            message : 'Internel server error while doing read action (500)'
        })
    }           
            
})
   
app.post('/api/v1/voters',async (req,res) => {
    const { cat } = req.body
    console.log(cat)
    if(!cat){
        res.status(404).json({
            accepted : false,
            cat,
            message : 'please send the cat value'
        })
        return;
    }
  
    try {
            const response = await connectDB({ 
                first : { 
                    query : {
                        filter : { name : cat },
                        update : { $inc : { votes : 1 } }
                    },
                    action : 'update-one'
                },
                second : {
                    query : {
                        filter : { totalCatVotes : { $exists : true } },
                        update : { $inc : { totalCatVotes : 1 } } 
                    }, 
                    action : 'update-one'
                },
                third : {
                    action : 'read'  
                }
            })
            res.json(getJsonResponse(response))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            accepted : true,
            message : 'Internal Server Error (500), Failed to do read-write operations'
        })
    }
})

app.get('*',(req,res) => {
    res.status(404).end('404 Not Found')
})

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})
