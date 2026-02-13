import React, { useState, useEffect, useRef } from "react";
import { 
  cdn_img_thumbnail,
  contact_email,
  inquiry_handle_base_url,
  inquiry_handle_app_name,
  inquiry_handle_inquiry_and_email_url,
  remote_ip_url,
  company_name,
  CLOUDFLARE_TURNSTILE_SITE_KEY
} from '../utils/common'
import axios from 'axios';

export default function InquiryForm() {
  const [token, setToken] = useState('');

  const [productModel, setProductModel] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [pImg, setPImg] = useState(cdn_img_thumbnail);
  const [fromUrl, setFromUrl] = useState('');
  const [sending, setSending] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [toEmail] = useState(contact_email);
  const [remoteIp, setRemoteIp] = useState('');
  const nameRef = useRef(null);

  useEffect(() => {
    const objModel = localStorage.getItem('model');
    if (objModel) setProductModel(objModel);

    const storedFromUrl = localStorage.getItem("from_url") || (typeof window !== 'undefined' ? window.location.href : '');
    if (storedFromUrl) setFromUrl(storedFromUrl);

    const storedPImg = localStorage.getItem('p_img');
    if (storedPImg) setPImg(storedPImg);

    if (nameRef.current) nameRef.current.focus();

    axios.get(remote_ip_url)
      .then(res => {
        if (res && res.data && res.data.ipAddress) {
          setRemoteIp(res.data.ipAddress);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = document.getElementById("turnstile-container");
    if (!container) return;

    // load script dynamically
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.turnstile) {
        window.turnstile.render("#turnstile-container", {
          sitekey: CLOUDFLARE_TURNSTILE_SITE_KEY,
          callback: setToken,
        });
      }
    };

    document.body.appendChild(script);

  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        // not storing name separately, keep form uncontrolled? keep same as original behaviour: not storing except in state spread
        // we'll keep values in a temporary object for submission; but to match original, store as dataset on form submission
        // To keep parity, do nothing here for name if you prefer uncontrolled; but we'll include a simple approach below.
        break;
      case 'email':
        break;
      case 'product_model':
        setProductModel(value);
        break;
      case 'product_quantity':
        setProductQuantity(value);
        break;
      case 'message':
        // message can be kept in state via dataset on form elements; we'll store in a dynamic object on submit instead
        break;
      case 'from_url':
        setFromUrl(value);
        break;
      default:
        break;
    }
    // For simple compatibility with original class which used this.state spread on submit,
    // we'll also mirror current form values into a local object at submit time.
  };

  const collectFormState = () => {
    // Read values from DOM to assemble payload similar to previous this.state spread
    const form = document.forms['contact'];
    const formValues = {};
    if (!form) return {};
    Array.from(form.elements).forEach(el => {
      if (!el.name) return;
      if (el.type === 'checkbox' || el.type === 'radio') {
        if (el.checked) formValues[el.name] = el.value;
      } else {
        formValues[el.name] = el.value;
      }
    });

    // cf-turnstile-response is in formValues and is the default field name for turnstile token
    // the value will be handled by backend as turnstileToken
    // or we can get the value and use the field name turnstileToken

    return {
      ...formValues,
      product_model: productModel,
      product_quantity: productQuantity,
      p_img: pImg,
      from_url: fromUrl,
      to_email: toEmail,
      company_name,
      remote_ip: remoteIp,
    };
  };

  const isSuccessResponse = (res) => {
    if (!res) return false;
    if (res.status && (res.status === 201 || (res.status >= 200 && res.status < 300))) return true;
    if (res.data && typeof res.data === 'object') {
      if (res.data.id) return true;
      if (res.data.data && res.data.data.id) return true;
    }
    return false;
  };

  const getErrorMessage = (err) => {
    if (!err) return 'Unknown error';
    if (err.response) {
      const r = err.response;
      if (r.data) {
        if (typeof r.data === 'string') return r.data;
        return r.data.message || r.data.msg || JSON.stringify(r.data);
      }
      return r.statusText || `HTTP ${r.status}`;
    }
    return err.message || String(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    const payload = collectFormState();
    // Check for Turnstile token
    if (!payload["cf-turnstile-response"] && !payload["turnstileToken"]) {
      alert('Please complete the CAPTCHA verification');
      return;
    }

    setSending(true);

    try {
      const res = await axios({
        url: `${inquiry_handle_base_url}${inquiry_handle_app_name}${inquiry_handle_inquiry_and_email_url}`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(payload)
      });

      if (isSuccessResponse(res)) {
        setShowThanks(true);
        // scroll a bit to show thanks
        if (typeof document !== 'undefined') document.documentElement.scrollTop += 300;
        console.log(`send email successfully to ${contact_email}`);
      } else {
        alert(`Failed to send email, you can manually send email to ${contact_email}`);
      }
    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="">
      <div className="content bg-white">
        <div className="d-none d-sm-block inquiry-pic-wrap">
          <div className="row border mx-0 my-2">
            <div className="col-4 px-0 text-center">
              <img className="img-fluid" src={pImg} alt="choosen product"/>
            </div>
            <div className="col-8 pt-2">
              <h6>Product model: {productModel}</h6>
              <p className="mb-0">Lead time: 7~15 working days.</p>
              <p>Payment method:  T/T, L/C at sight and Paypal for sample.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <form
              name="contact"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="contact-us"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label>
                  Don’t fill this out:{" "}
                  <input name="bot-field" onChange={handleChange} />
                </label>
              </div>

              <div className="row">
                <div className="field form-group mb-1 col-sm-6">
                  <label className="label" htmlFor={"name"} >Your name</label>
                  <div className="control">
                    <input
                      ref={nameRef}
                      className="input form-control"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      id="name"
                      required
                    />
                  </div>
                </div>

                <div className="field form-group mb-1 col-sm-6">
                  <label className="label" htmlFor={"email"}>Email</label>
                  <div className="control">
                    <input
                      className="input form-control"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      id="email"
                      required
                    />
                  </div>
                </div>

                <div className="field form-group mb-1 col-sm-6">
                  <label className="label" htmlFor={"product_model"}>Product model</label>
                  <div className="control">
                    <input
                      className="input form-control"
                      value={productModel}
                      placeholder="The product you want to buy"
                      type="text"
                      name="product_model"
                      onChange={(e) => { setProductModel(e.target.value); handleChange(e); }}
                      id="product_model"
                      required
                    />
                  </div>
                </div>

                <div className="field form-group mb-1 col-sm-6">
                  <label className="label" htmlFor={"product_quantity"}>Product quantity</label>
                  <div className="control">
                    <input
                      className="input form-control"
                      placeholder=""
                      type="text"
                      name="product_quantity"
                      value={productQuantity}
                      onChange={(e) => { setProductQuantity(e.target.value); handleChange(e); }}
                      id="product_quantity"
                      required
                    />
                  </div>
                </div>

                <div className="field form-group mb-1 col-sm-12">
                  <label className="label" htmlFor={"message"}>Message</label>
                  <div className="control">
                    <textarea
                      className="textarea form-control message-detail"
                      placeholder="Please tell us product details and your requirements"
                      name="message"
                      onChange={handleChange}
                      id="message"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="field form-group mb-1 d-none">
                <label className="label" htmlFor={"from_url"}>From url</label>
                <div className="control">
                  <input
                    className="input form-control"
                    value={fromUrl}
                    type="text"
                    name="from_url"
                    onChange={(e) => { setFromUrl(e.target.value); handleChange(e); }}
                    id="from_url"
                    required={false}
                  />
                </div>
              </div>
              <div id="turnstile-container"></div>

              <div className="field form-group mb-0">
                <button className="button btn btn-danger is-link" type="submit">
                  {sending ? 'Processing' : 'Send'}
                </button>
              </div>
            </form>

            {showThanks && (
              <div className="mt-1 bg-light rounded shadow-lg">
                <div className="alert alert-success" role="alert">
                  <h4>Thank you!</h4>
                  <p>We will check the email and come back to you as soon as possible!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}