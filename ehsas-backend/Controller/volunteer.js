const { con } = require("../config/db");

const CreateVolunteer = (req,res) => {
// req body from the user
  const { name, email, phone, password, address, cnic, profile } = req.body;

  const user=[  name, email, phone, password, address, cnic, profile ] 
//   check all fields from the user
  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !address ||
    !cnic ||
    !profile
  ) {
    return res.status(500).json({ msg: "Fields are required" });
  }
// sql  query for the database to create data
  const sql = "INSERT INTO  volunteer( name, email, phone, password, address, cnic, profile) VALUES(?)";
    con.query(sql,[user],(err,data)=>{
        if (err) {
            console.log("error in create volunteer",err)
        }
        return res.json({msg:"volunteer created successfuly ",data})
    })
};


const FetchVolunteer=(req,res)=>{

// sql query fetch all user from the database
    const sql=" SELECT * FROM volunteer"
    con.query(sql,(err,data)=>{
        if (err) {
            console.log("error in fetch volunteer",err)
        }
        return res.json({msg:"volunteer fetch successfuly ",data})
    })



}


const ApproveVolunteer=(req,res)=>{
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
const Complete=(req,res)=>{
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

module.exports = {
  CreateVolunteer,
  FetchVolunteer
};