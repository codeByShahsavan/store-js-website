
import authHandler from "./utils/authorization.js"
import { getData } from "./utils/httpReq.js"
import { shortenText } from "./utils/stringFunc.js"


const mainContent=document.getElementById("container")
const cartContent=document.getElementById("container-cart")

const  logoutButton=document.querySelector("button")

const renderUsers=(users)=>{
  mainContent.innerHTML=""

  users.forEach((user) => {
    const jsx=`
    <div id="card">
       <h3>${user.id}</h3>
       <div>
       <p><i class="fa-solid fa-user"></i>Name:</p>
       <span>${user.name.firstname} ${user.name.lastname}</span>
       </div>
       <div>
       <p><i class="fa-solid fa-paperclip"></i>Username:</p>
       <span>${user.username}</span>
       </div>
       <div>
       <p><i class="fa-solid fa-envelope"></i>Email:</p>
       <span>${user.email}</span>
       </div>
        <div>
       <p><i class="fa-solid fa-phone"></i>Phone:</p>
       <span>${user.phone}</span>
       </div>
        <div>
       <p><i class="fa-solid fa-location-dot"></i>Address:</p>
       <span>${user.address.city} _ ${user.address.street} _ ${user.address.zipcode}</span>
       </div>
    </div>
    `
     mainContent.innerHTML+=jsx
  });

}

const renderCarts=(carts,users,products)=>{
    cartContent.innerHTML=""
    
    carts.forEach((cart)=>{
       const user=users.find(user=>user.id===cart.userId)
       let jsxUser=`
        <div id="card">
       <h3>${user.id}</h3>
   
       <div>
       <p><i class="fa-solid fa-paperclip"></i>Username:</p>
       <span>${user.username}</span>
       </div>
     
       `
  let totalCartPrice=0

      cart.products.forEach(item => {
      const product = products.find(product => product.id === item.productId);
      totalCartPrice+=item.quantity*product.price
     jsxUser+=`
       <div>
       <p><i class="fa-solid  fa-cart-arrow-down"></i>product:</p>
           <img src=${product.image} alt=${product.title}/>
       <span>${shortenText(product.title)}</span>
        <p><i class="fa-solid fa-clipboard"></i>quantity:</p>
        <span>${item.quantity}</span>

               <p><i class="fa-solid fa-money-check"></i>price:</p>
        <span>${item.quantity*product.price}</span>
       </div>
   
       `

    })
       jsxUser += `
       <div>
            <p><i class="fa-solid fa-money-check"></i>Total Cart Price:</p>
      <span> ${totalCartPrice}$</span>
      </div>
      </div>
      `
      cartContent.innerHTML+=jsxUser
    })

}
const init=async()=>{
    authHandler()
    const users=await getData("users")
     renderUsers(users)
     const carts=await getData("carts")
     const products=await getData("products")
     renderCarts(carts,users,products)

}

const logoutHandler=()=>{
    document.cookie="token=; max-age=0"
    location.assign("index.html")
}

document.addEventListener("DOMContentLoaded",init)
logoutButton.addEventListener("click",logoutHandler)