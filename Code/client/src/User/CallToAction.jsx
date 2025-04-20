import React,{useState,useEffect} from "react";
import axios from "axios";
export const CallToAction = () => {

const Save=async(e)=>{
  e.preventDefault()
  const postData={...data}
  try{
    const res=await axios.post("http://localhost:8000/feed-back",postData)
alert(res.data.msg)
window.location.reload()
  }catch(error){
    console.log(error)
  }
  

  }
  const [data,setdata]=useState({
    name:"",
    email:"",
    message:""
  })
  const handleInput=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
Save()
  },[])
  

  return (
    <>
      <section class="" id="contact-sec">
        <div class="cta-wrap3 style2 bg-theme-dark">
          <div class="row gx-0">
            <div class="col-xl-7">
              <div class="cta-content-wrap">
                <div class="title-area text-xl-start text-center mb-40">
                  <span class="sub-title after-none before-none justify-content-xl-start justify-content-center">
                    Call To Action
                  </span>
                  <h2 class="sec-title text-white">
                    Give Your Big Hand Forever
                  </h2>
                </div>
                <form
                  action="https://html.themeholy.com/donat/demo/mail.php"
                  method="POST"
                  class="contact-form ajax-contact"
                >
                  <div class="row">
                    <div class="form-group col-md-6 style-dark">
                      <input
                        type="text"
                        class="form-control"
                        name="name"
                        onChange={handleInput}
                        id="name"
                        placeholder="Your name"
                      />
                    </div>
                    <div class="form-group col-md-6 style-dark">
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        onChange={handleInput}
                        id="email"
                        placeholder="Your Email Address..."
                      />
                    </div>
                   <div class=" form-group mb-3 style-dark">
  
  <textarea class="form-control " id="exampleTextarea" rows="4" name="message" onChange={handleInput} placeholder="Type your message..."></textarea>
</div>
                   
                    <div class="form-group col-xxl-4 col-xl-12">
                      <button class="th-btn style3 w-100" onClick={Save}>
                        Submit
                      </button>
                    </div>
                  </div>
                  <p class="form-messages mb-0 mt-3"></p>
                </form>
              </div>
            </div>
            <div class="col-xl-5">
              <div class="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212779.51526037158!2d72.85333316276778!3d33.56169152016182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df948974419acb%3A0x984357e1632d30f!2sRawalpindi%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1733822117249!5m2!1sen!2s"
                  allowfullscreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
