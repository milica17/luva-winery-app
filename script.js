// ================= SECTIONS =================
function showSection(id){
    document.querySelectorAll('.section').forEach(sec=>{
        sec.classList.remove('active')
    })
    const sec = document.getElementById(id)
    if(sec) sec.classList.add('active')
}

// ================= LOGIN =================
function loginUser(){
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    if(username && password){
        showPopup("Uspešno ste se ulogovali")
        document.getElementById('login-message').textContent = "Ulogovani ste kao: " + username
        showSection('hero')
    } else { showPopup("Popunite sva polja!") }
}

// ================= SHOP / KORPA =================
let cart = []

function addToCart(wineName){
    const prices = { "Cabernet Sauvignon":1800, "Merlot":1600, "Chardonnay":1500 }
    cart.push({name:wineName, price:prices[wineName]})
    showPopup(wineName + " dodato u korpu 🍷")
}

function goToCart(){
    displayCart()
    showSection('checkout')
}

function displayCart(){
    const list = document.getElementById('checkout-list')
    if(!list) return
    list.innerHTML=""
    let total=0
    cart.forEach((item,index)=>{
        const li = document.createElement('li')
        li.textContent = item.name + " - " + item.price + " RSD"
        const removeBtn = document.createElement('button')
        removeBtn.textContent="❌"
        removeBtn.style.marginLeft="10px"
        removeBtn.onclick = function(){ cart.splice(index,1); displayCart() }
        li.appendChild(removeBtn)
        list.appendChild(li)
        total+=item.price
    })
    document.getElementById('checkout-total').textContent="Ukupno: "+total+" RSD"
}

function completeOrder(){
    if(cart.length===0){ alert("Korpa je prazna!"); return }
    showPopup("Hvala na kupovini! Narudžbina je završena.")
    cart=[]
    displayCart()
    showSection('hero')
}

// ================= TOUR =================
function sendTourEmail(){
    const name = document.getElementById('tour-name').value
    const email = document.getElementById('tour-email').value
    const phone = document.getElementById('tour-phone').value
    const date = document.getElementById('tour-date').value
    if(!name || !email || !phone || !date){ showPopup("Popunite sva polja!"); return }
    const subject=encodeURIComponent("Zakazivanje ture L’Uva")
    const body=encodeURIComponent(`Ime: ${name}\nEmail: ${email}\nTelefon: ${phone}\nDatum: ${date}`)
    window.location.href=`mailto:tvojaemail@gmail.com?subject=${subject}&body=${body}`
}
function showPopup(message){
    document.getElementById("popup-message").textContent = message
    document.getElementById("popup").style.display = "flex"
}

function closePopup(){
    document.getElementById("popup").style.display = "none"
}