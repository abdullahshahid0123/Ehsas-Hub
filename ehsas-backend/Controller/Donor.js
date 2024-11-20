const { con } = require("../config/db");

const CreateDonor=(req,res)=>{
    console.log("donor")
    // req from the user
    const {name, email,address,phone,book_name,book_edition,auther_name,book_image}=req.body

    const user=[name, email,address,phone,book_name,book_edition,auther_name,book_image]

    if (!name || !email|| !address|| !phone|| !book_name|| !book_edition|| !auther_name|| !book_image) {
        return res.status(500).json({ msg: "Fields are required" });
        
    }
    // sql  query for the database to create data
    const sql="INSERT INTO  donor( name, email, address, phone, book_name, book_edition, auther_name, book_image) VALUES(?)"
    con.query(sql,[user],(err,data)=>{
        if (err) {
            console.log("error in create volunteer",err)
        }
        return res.json({msg: "donor created successfuly",data})
    })
}

const ApproveDonor=(req,res)=>{
    // function fort the change status
  const {id}=req.params
  if (!id) {
    return res.status(400).json({msg:"Donor id is required"})
    
  }
  console.log("id is",id)
//   update query for status
  const sql="UPDATE `donor` SET status= 'approved' WHERE id=?"
  con.query(sql,[id],(err,data)=>{
    if (err) {
        console.log(err)
        return res.status(500).json({msg:"error in approving donor",err})
    }

    if (data.affectedRows===0) {
       
        return res.status(500).json({msg:"donor not found ",err})
        
    }
    return res.json({msg:" donor approving request successfuly",data})

  })

}

const CompleteDonor=(req,res)=>{
    // function for the change status
  const {id}=req.params
  if (!id) {
    return res.status(400).json({msg:"Donor id is required"})
    
  }
//   update query for status change
  const sql="UPDATE `donor` SET status= 'complete' WHERE id=?"
  con.query(sql,[id],(err,data)=>{
    if (err) {
        console.log(err)
        return res.json({msg:"error in complete donor",err})
        
    }
    if (data.affectedRows===0) {
       
        return res.status(500).json({msg:"donor not found ",err})
        
    }
    return res.json({msg:"donor complete request  successfuly",data})

  })

}


module.exports={
    CreateDonor,
    ApproveDonor,
    CompleteDonor

}