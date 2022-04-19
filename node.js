
const Joi=require('joi')
const express=require('express')
const app= express()
app.use(express.json())
const courses=[
    {id:1,name:'AI'},
     {id:2,name:'web'},
     {id:3,name:'android'}
]
app.get('/',(req,res)=>{
    res.send('courses')
})
app.get('/courses',(req,res)=>{
   
    res.send(courses)
})
app.get('/courses/:id',(req,res)=>{
    const course=courses.find(c=> c.id==parseInt(req.params.id))
    if(!course) res.status(404).send('the course with this id is not found')
    res.send(course)
})
app.post('/courses',(req,res)=>{
     if(!req.body.name||req.body.name.length<3){
        res.status(404).send('name is required and should be minimum 3 char')
        return;
     }
    /*  const schema={
        name:Joi.string().min(3).required()
    };
    const result=Joi.vaidate(req.body,schema)
    console.log(result)
    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return
    }  */
    const course={id:courses.length+1, name: req.body.name}
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=> c.id==parseInt(req.params.id))
    if(!course) {res.status(404).send('the course with this id is not found')
    return

    }
    if(!req.body.name||req.body.name.length<3){
        res.status(404).send('name is required and should be minimum 3 char')
        return;
     }
     course.name=req.body.name
     res.send(course)
    })

 app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=> c.id==parseInt(req.params.id))
    if(!course) {res.status(404).send('the course with this id is not found')
    return
    }
    const index=courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
    //send course   
    console.log('deleted')
 })   
    
const port=process.env.PORT || 3000
app.listen(port,()=>{console.log(`listening on port ${port} .....`)})