import { postData } from "./utils/httpReq.js"
import {  setCookie } from "./utils/cookie.js"
import authHandler from "./utils/authorization.js"
import validateForm from "./utils/validation.js"
import { removeModal } from "./utils/modal.js"

const inputsBox=document.querySelectorAll("input")
const loginButton=document.querySelector("button")
const removeButton=document.getElementById("modal-button")
const submitHandler=async(event)=>{
    event.preventDefault()
    const username=inputsBox[0].value
    const password=inputsBox[1].value
    
    const validation=validateForm(username,password)
    if(!validation) return

    const response=await postData("auth/login",{username,password})
    // console.log(response)
    setCookie(response.token)
    location.assign("index.html")
    
}

loginButton.addEventListener("click",submitHandler)
document.addEventListener("DOMContentLoaded",authHandler)
removeButton.addEventListener("click",removeModal)