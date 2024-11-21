const { con } = require("../config/db");

const NeedyRequest=(req,res)=>{
    // get the needy request
    const {id}=req.params
    const check = 
        `SELECT COUNT(*) AS request_count
        FROM users
        WHERE id= ? AND MONTH(created_at) = MONTH(CURRENT_DATE) `;

    // const sql="SELECT * FROM `users` WHERE id=?"
console.log( check)

    con.query(check,[id],(err,countResult)=>{
        if (err) {
            console.log(err)
            return res.status(400).json({msg:"error in the check request",err})
        }
        console.log(countResult)
       const countRequest= countResult[0]?.request_count || 0;
       console.log(countRequest)

       if (countRequest>=3) {

        return res.status(400).json({msg:" request limit complete of this month",err})
       }
       return res.json({msg:" request submit successfuly",countRequest})
            
    })

    // con.query(sql,[id],(err,data)=>{
    //     if (err) {
    //         console.log(err)
    //         return res.status(400).json({msg:"error in the needy request",err})
    //     }
    //     return res.json({msg:"successfuly get request",data})
            
    // })

}

const ApproveNeedy=(req,res)=>{
    const {id}=req.params
    const sql="UPDATE `users` SET status='approved' WHERE id=? "
    con.query(sql,[id],(err,data)=>{
        if (err) {
            console.log(err)
            return res.status(400).json({msg:"error in approve needy request ",err})
        }
        return res.json({msg:"successfuly approve request",data})
            
    })

}
const CompleteNeedy=(req,res)=>{
    const {id}=req.params
    const sql="UPDATE `users` SET status='complete' WHERE id=? "
    con.query(sql,[id],(err,data)=>{
        if (err) {
            console.log(err)
            return res.status(400).json({msg:"error in complete needy request ",err})
        }
        return res.json({msg:"successfuly complete request",data})
            
    })

}
module.exports = {
    NeedyRequest,
    ApproveNeedy,
    CompleteNeedy
};