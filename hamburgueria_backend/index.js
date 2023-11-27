const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const uuid = require('uuid')
app.use(express.json())
app.use(cors())


const orders = []

app.get('/orders',(request,response)=>{
    return response.status(200).json(orders)
})

app.post('/orders', (request,response)=>{
    const {order,client} = request.body
    const newOrder = {id:uuid.v4(),order,client}
    orders.push(newOrder)
    return response.status(201).json(newOrder)
})

app.delete('/orders/:id',(request,response)=>{
    const {id} = request.params
    const index = orders.findIndex(order=> order.id === id)
    if(index < 0){
    return response.status(404).json({message:"Order not Found"})    
    }
    orders.splice(index,1)
    return response.status(200).json({message:"Order delete"})
})





app.listen(port, ()=>{
    console.log(`🚀 Server started on port: ${port}🚀`)
})