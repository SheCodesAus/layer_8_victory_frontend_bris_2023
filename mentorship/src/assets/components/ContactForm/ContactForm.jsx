import "./ContactForm.css";


const ContactForm = () =>{
    return(
        <div className="container-contact">
<section id="address">
        <h2>Contact Us</h2>
        
        <p> <strong>Queensland Ai Hub</strong></p>
        <p>315 Brunswick St</p>
        <p>Fortitude Valley QLD 4006</p>
        <p>QLD 4006</p>
        
    <div className="contact-map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.352946022567!2d153.0337216!3d-27.4582693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9159f3ba2d4d15%3A0xc88597a24ecb82b3!2sQueensland%20Ai%20Hub!5e0!3m2!1sen!2sau!4v1697023216821!5m2!1sen!2sau" 
    width="400" 
    height="300" 
    style={{border:'0'}}
    llowfullscreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
    >
    </iframe>
    </div>
</section>

<section id="contact">
            <h2>Get in touch ✍🏻</h2>
            <p className="contact-txt">Feel free to get in touch. We are always open to discussing new partnerships.</p>
            <form
            action="https://formspree.io/f/xpzenjjg"
            method="POST"
              >      <label htmlFor="name">Your Name</label>
                     <input type="text" name="your-name"/>
                    <label htmlFor="email">Your Email</label>
                    <input name="Email" id="email" type="email"/>
                    <label htmlFor="message">Your Message</label>
                    <textarea name="message-text" id="message" rows="4"></textarea>
                    <input type="submit" value="Email us  📩"/>
                   
                  </form>
</section>
</div>
    )
}

export default ContactForm



// <div className="map-contact">
// <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.352946022567!2d153.0337216!3d-27.4582693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9159f3ba2d4d15%3A0xc88597a24ecb82b3!2sQueensland%20Ai%20Hub!5e0!3m2!1sen!2sau!4v1697022448304!5m2!1sen!2sau" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
// </div>