const User = require("../models/user");



exports.getUser = (req,res)=>{
  User.findAll({
      raw : true,
      attributes : ['id' , 'name' ,'email' , 'phone']
  
  
  })
      .then((data)=>{
      console.log(data)
      return res.json({data : data})
  }).catch(e => {
      console.log(e)
      return res.status(500).json({data : []})
  })
}

exports.postUser = (req,res)=>{
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  User.create({
      name : name , 
      email : email , 
      phone : phone
  },).then(data =>{
      console.log(data)
      return res.json({
          id : data.id,
          name : data.name,
          email : data.email,
          phone : data.phone
      })
  }).catch(e =>{
      console.log(e)
      return res.status(404).json({success : false , data : {}})
  })
}

exports.deleteUser = (req,res)=>{
  const id = req.params.id;

  User.findByPk(id).then(user =>{
      return user.destroy()
  }).then(()=>{
      return res.json({success : true})
  }).catch(e =>{
      console.log(e)
      return res.status(403).json({success : false})
  })

}


exports.editeUser = (req,res)=>{
  const id = req.params.id;
  User.findByPk(id).then((user)=>{
      user.name = req.body.name,
      user.email = req.body.email,
      user.phone = req.body.phone
      return user.save()
  }).then((data)=>{
      return res.json({
          id : data.id,
          name : data.name,
          email : data.email,
          phone : data.phone
      })
  }).catch(e =>{
      console.log(e)
      return res.status(403).json({success : false})
  })
}







