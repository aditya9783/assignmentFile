let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
    res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = process.env.PORT||2410
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let {datas} = require("./shopData");
let {shops,products,purchases}=datas;

// console.log(products);
// console.log(purchases);
let fs = require("fs")
let fname="apiData.json";
let fname1="product.json"
let fname2="purchase.json"

// app.get("/reset",function(req,res){
//     let data=JSON.stringify(purchases);
//     console.log(data);
//     fs.writeFile(fname2,data,function(err){
//         if(err) res.status(404).send(err);
//         else res.send("Data in file is Reset")
//     })
// });
app.get("/shops",function(req,res){
  fs.readFile(fname,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          res.send(data);
      }
  })
});
app.post("/shops",function(req,res){
  let body=req.body
  fs.readFile(fname,"utf8",function(err,content){
      if(err) console.log(err);
      else{
        let productArr=JSON.parse(content);
        let maxId=productArr.reduce((acc,curr)=>(curr.shopid>acc ? curr.shopid : acc),0);
        let newId=maxId + 1;
        let newprod= {...body,shopid:newId};
        productArr.push(newprod);
          
          let data1=JSON.stringify(productArr);
          fs.writeFile(fname,data1,function(err){
              if(err) console.log(err);
              else{
                  res.send(body)
              }
          })
          
      }
  })
})
app.get("/products",function(req,res){
  fs.readFile(fname1,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          res.send(data);
      }
  })
});
app.get("/products/:id",function(req,res){
  let id= +req.params.id
  fs.readFile(fname1,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          console.log(data);
          let cst=data.find(ct=>ct.productid===id);
          if(cst) res.send(cst)
          else {
              res.status(404).send("No products Found");
          }
      }
  })
})
app.put("/products/:id/edit",function(req,res){
  let body=req.body;
  let id= +req.params.id
  fs.readFile(fname1,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          let index=data.findIndex(ct=>ct.productid===id)
          if(index>=0){
              let updatedCst={...body};
              data[index]=updatedCst;
              let data1=JSON.stringify(data);
              fs.writeFile(fname1,data1,function(err){
                  if(err) console.log(err);
                  else{
                      res.send(updatedCst)
                  }
              })
          }
          else{
              res.status(404).send("No customer Found");
          }
      }
  })
})
app.post("/products",function(req,res){
  let body=req.body
  fs.readFile(fname1,"utf8",function(err,content){
      if(err) console.log(err);
      else{
        let productArr=JSON.parse(content);
        let maxId=productArr.reduce((acc,curr)=>(curr.productid>acc ? curr.productid : acc),0);
        let newId=maxId + 1;
        let newprod= {...body,productid:newId};
        productArr.push(newprod);
          
          let data1=JSON.stringify(productArr);
          fs.writeFile(fname1,data1,function(err){
              if(err) console.log(err);
              else{
                  res.send(body)
              }
          })
          
      }
  })
})
app.get("/purchases",function(req,res){
  fs.readFile(fname2,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          res.send(data);
      }
  })
});
app.get("/purchases/:id",function(req,res){
  let id= +req.params.id
  fs.readFile(fname2,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          console.log(data);
          let cst=data.find(ct=>ct.purchaseid===id);
          if(cst) res.send(cst)
          else {
              res.status(404).send("No products Found");
          }
      }
  })
});
app.put("/purchases/:id/edit",function(req,res){
  let body=req.body;
  let id= +req.params.id
  fs.readFile(fname2,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          let index=data.findIndex(ct=>ct.purchaseid===id)
          if(index>=0){
              let updatedCst={...body};
              data[index]=updatedCst;
              let data1=JSON.stringify(data);
              fs.writeFile(fname2,data1,function(err){
                  if(err) console.log(err);
                  else{
                      res.send(updatedCst)
                  }
              })
          }
          else{
              res.status(404).send("No purchase Found");
          }
      }
  })
})
app.post("/purchases",function(req,res){
  let body=req.body
  fs.readFile(fname2,"utf8",function(err,content){
      if(err) console.log(err);
      else{
        let productArr=JSON.parse(content);
        let maxId=productArr.reduce((acc,curr)=>(curr.purchaseid>acc ? curr.purchaseid : acc),0);
        let newId=maxId + 1;
        let newprod= {...body,purchaseid:newId};
        productArr.push(newprod);
          
          let data1=JSON.stringify(productArr);
          fs.writeFile(fname2,data1,function(err){
              if(err) console.log(err);
              else{
                  res.send(body)
              }
          })
          
      }
  })
})

app.post("/customers",function(req,res){
  let body=req.body
  fs.readFile(fname,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          data.push(body);
          let data1=JSON.stringify(data);
          fs.writeFile(fname,data1,function(err){
              if(err) console.log(err);
              else{
                  res.send(body)
              }
          })
          
      }
  })
})

app.put("/customers/:id",function(req,res){
  let body=req.body;
  let id=req.params.id
  fs.readFile(fname,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          let index=data.findIndex(ct=>ct.id===id)
          if(index>=0){
              let updatedCst={...body};
              data[index]=updatedCst;
              let data1=JSON.stringify(data);
              fs.writeFile(fname,data1,function(err){
                  if(err) console.log(err);
                  else{
                      res.send(updatedCst)
                  }
              })
          }
          else{
              res.status(404).send("No customer Found");
          }
      }
  })
})
app.delete("/customers/:id",function(req,res){
  let id=req.params.id
  fs.readFile(fname,"utf8",function(err,content){
      if(err) console.log(err);
      else{
          let data=JSON.parse(content);
          let index=data.findIndex(ct=>ct.id===id)
          if(index>=0){
              let deletedCst=data.splice(index,1);
              let data1=JSON.stringify(data);
              fs.writeFile(fname,data1,function(err){
                  if(err) console.log(err);
                  else{
                      res.send(deletedCst)
                  }
              })
          }
          else{
              res.status(404).send("No Customer Found")
          }
          
          
          
          
      }
  })
})

