import { Button, Html } from "@react-email/components";
import * as React from "react";
import emailjs from '@emailjs/browser';
//npm install @emailjs/browser --save

const sendEmail=(e)=>{
    e.preventDefault();
    // alert("submitted");
    emailjs.sendForm("service_wgepzc6","template_8dujvwb",e.target,'uV-3y4zoM-OkPdn-A')
}
export default function Email() {

  return (
    <form onSubmit={sendEmail}>
        <label><h3>Email</h3></label>
        <input
          type="email"
          name="email_from"
        //   value={email}
          placeholder="Enter Email"
          className="Form-control"
        //   onChange={(e) => setEmail(e.target.value)}
        /><br></br>
        <label><h3>describe:  </h3></label>
        <input
          type="text"
          name="message"
        //   value={text}
          className="Form-control"
        //   onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> send email</button>
    </form>
  );
}