const getcatigories= async()=>{
    const{data}= await axios.get(`https://dummyjson.com/products/category-list`);
    return data;
}
  const displaycategories=async()=>{
    const loader=document.querySelector(".loader-container");
    loader.classList.add("active");
    try{
    const categories=await getcatigories();
    const result=categories.map((category)=>{
  
return`<div class='category'>
<h2>${category}</h2>
<a href='categorydetails.html?category=${category}'>Details</a>
</div>`
    }).join('');
    document.querySelector(".categories .row").innerHTML=result;
    loader.classList.remove("active");
}
catch(error){
    document.querySelector(".categories .row").innerHTML="<p>error loading categories</p>";  
    loader.classList.remove("active"); 
}finally{
    loader.classList.remove("active");
}}


const getproducts= async(page)=>{
    const skip=(page - 1) * 30;
    const{data}= await axios.get(`https://dummyjson.com/products?limit=30&skip=${skip}`);
    return data;
}
const displayproducts =async(page=1)=>{
    const loader=document.querySelector(".loader-container");
    loader.classList.add("active");
    try{
    const data= await getproducts(page);
    const numberofpages =Math.ceil(data.total/30);
    console.log(page);
    const result=data.products.map((product)=>{
        return`
        <div class= 'product' >
        <img src="${product.thumbnail}" alt="${product.description}"/>
        <h3>${product.title}</h3>
        <span>${product.price}</span>

        </div>
        `
    }).join('');
    document.querySelector(".products .row").innerHTML=result;
    let paginationlink=``
    if(page==1){
        paginationlink+=` <li class="page-item"> <button  class="page-link" disabled >&laquo; </a></li>`;
    }else{
        paginationlink+=` <li class="page-item"><button onclick =displayproducts('${page-1}')  class="page-link" >&laquo;    </button></li>`;
    }


    for(let i=1;i<=numberofpages;i++){
        paginationlink+=` <li class="page-item ${i == page? 'active' : ''}" ><button onclick =displayproducts('${i}')  class="page-link" >  ${i}  </button></li>`;
    }

    if(page==numberofpages){
        paginationlink+=` <li class="page-item "><button disabled class="page-link" >&raquo;</button></li>`;    
    }else{

    paginationlink+=` <li class="page-item"><button onclick=displayproducts('${parseInt( page)+1}') class="page-link" >&raquo;</button></li>`;
    }
    document.querySelector(".pagination").innerHTML=paginationlink;

}catch(error){
    document.querySelector(".products .row").innerHTML="<p>error loading products</p>";  
    loader.classList.remove("active"); 
}finally{
    loader.classList.remove("active");
}  
}
displaycategories();
displayproducts();

window.onscroll = function(){
    const nav = document.querySelector(".header");
    const categories = document.querySelector(".categories");
    
    if(window.scrollY > categories.offsettop){
      nav.classList.add("scrollnavbar");
    }
}