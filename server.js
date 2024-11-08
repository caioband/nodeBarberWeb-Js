import express from 'express'
import { PrismaClient, Prisma} from '@prisma/client'
import * as E from './exceções.js'
const prisma = new PrismaClient()

 

//produto

//usuario

const app = express()
app.use(express.json())



app.post("/usuarios", async (req, res) => {

    await prisma.usuario.create({
        data:
        {
            email: req.body.email,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            senha: req.body.senha
        }
    })
    res.status(201).json(req.body)
})

app.get("/usuarios", async (req, res) => {
    let users=[]

    if(req.query){
        users = await prisma.usuario.findMany({
            where:{
                nome: req.query.nome,
                email: req.query.email,
                sobrenome: req.query.sobrenome


            }
        }) 
    }
    else{
        users = await prisma.usuario.findMany()
    }
    

    res.status(200).json(users)
})

app.get("/usuarios/:id",async(req,res)=>{

    let result = await E.Exception(async function(){
        const sla = await prisma.usuario.findFirst({
            where:{
                id:req.params.id
            },
        })

        if (sla === null){
            throw {code: 'P2025'}
        }

        delete sla.senha
        return sla
    })
    
    console.log(result)
    if (result.statusCode === 404){
        res.status(404).json({message: result.messageError, code: result.statusCode})
        return
    }else if(result.statusCode == 200){
        res.status(200).json(result.data)
    }

    
    
})

app.put("/usuarios/:id", async (req, res) => {

    let result = await E.Exception(async function(){
        const sla = await prisma.usuario.findFirst({
            where:{
                id:req.params.id
            }
        })
        if (sla === null){
            throw {code: 'P2025'}
        }
        return sla
    })

    if (result.statusCode === 404){
        res.status(404).json({message: result.messageError, code: result.statusCode})
        return
    }else if(result.statusCode == 200){
        res.status(200).json(result.data)
    }

    await prisma.usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            senha: req.body.senha
        }
    })
    res.status(201).json(req.body)
})

app.delete("/usuarios/:id", async (req, res) => {
    
    let result = await E.Exception(async function(){
        const sla = await prisma.usuario.findFirst({
            where:{
                id:req.params.id
            }
        })
        
        if (sla === null){
            throw {code: 'P2025'}
        }
        return sla
    })
    
    if (result.statusCode === 404){
        res.status(404).json({message: result.messageError, code: result.statusCode})
        return
    }

    await prisma.usuario.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "usuario foi deletado com Sucesso!" })
})
 

app.get("/produtos", async (req, res) => {
    let produtos=[]

    if(req.query){
        
        
        produtos = await prisma.product.findMany({
            where:{
                id:req.params.id,
                preco: req.query.preco,
                nome: req.query.nome,
                quantidade: req.query.quantidade
            }
        }) 
    }
    else{
        produtos = await prisma.product.findMany()
    }
    

    res.status(200).json(produtos)
})

app.get("/produtos/:id",async(req,res)=>{

    let result = await E.Exception(async function(){
        const sla = await prisma.product.findFirst({
            where:{
                id:req.params.id
            }
        })
        if (sla === null){
            throw {code: 'P2025'}
        }
        return sla
    })

    if (result.statusCode === 404){
        res.status(404).json({message: result.messageError, code: result.statusCode})
        return
    }else if(result.statusCode == 200){
        res.status(200).json(result.data)
    }
    
})

app.post("/produtos",async(req,res)=>{
    await prisma.product.create({
        data:{
            nome:req.body.nome,
            preco:req.body.preco,
            quantidade:req.body.preco
        }
    })
    res.status(201).json(req.body)
})

app.put("/produtos/:id",async(req,res)=>{


    let result = await E.Exception(async function(){
        const sla = await prisma.product.findFirst({
            where:{
                id:req.params.id
                
            }
        })
        if (sla === null){
            throw {code: 'P2025'}
        }
        return sla
    })

    if (result.statusCode === 404){
        res.status(404).json({message: result.messageError, code: result.statusCode})
        return
    }else if(result.statusCode == 200){
        res.status(200).json(result.data)
    }

     await prisma.product.update({
        where:{
            id:req.params.id
        },
        data:{
            nome:req.body.nome,
            preco:req.body.preco,
            quantidade:req.body.preco

        }
     })
     res.status(201).json(req.body)

})

app.delete("/produtos/:id",async(req,res)=>{
    let result = await E.Exception(async function(){
        const sla = await prisma.product.findFirst({
            where:{
                id:req.params.id
            }
        })
        if (sla === null){
            throw {code: 'P2025'}
        }
        return sla
    })

    if (result.statusCode === 404){
        res.status(404).json({message: result.messageError, code: result.statusCode})
        return
    }else if(result.statusCode == 200){
        res.status(200).json(result.data)
    }
    
    await prisma.product.delete({
        where:{
            id: req.params.id
        }
    })
    res.status(200).json({ message: "produtos foi deletado com Sucesso!" })
})



//produto.listen(8080)
app.listen(3000)

