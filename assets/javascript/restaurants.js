// class zomato {
// constructor(){
//     this.api = "152c06012922cebbca2dce06afb59357"
//     this.header = {
//         method: 'GET',
//         headers:{
//             'user-key':this.api,
//             'Content-Type':'application/json'
//         },
//     credentials: "same-origin"
//     };

//     }
//     async searchAPI(city,categoryID){
//         const categoryURL = "https://developers.zomato.com/api/v2.1/categories";
    
//         const cityURL = 'https://developers.zomato.com/api/v2.1/cities' 


//         const categoryInfo = await fetch(categoryURL,this.header);
//         const categoryJson = await categoryInfo.json();
//         const categories = await categoryJson.categories;


//         const cityInfo = await fetch(cityURL,this.header);
//         const cityJSON = await cityInfo.json();
//         const cityLocation = await cityInfo.location_suggestions;

//         let cityID = 0;

//         if(cityLocation.length>0){
//             cityID = await cityLocation[0].id;
//         }


//         const resturantURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&category=${categoryID}&sort=rating`;
//         const resturantInfo = await fetch(resturantURL,this.header);
//         const resturantJSON = await resturantInfo.json();
//         const resturants = await resturantJSON.resturants;


//         return {
//             categories,
//             cityID,
//             resturants
//         };



//     }
// }

// class ui {
//     constructor(){
//     this.loader = document.querySelector('example-holder')
//     this.resturantList = document.getElementById('example-holder')
// }
// addSelectOptions(categories){
//     const search = document.getElementById('searchForm');
//     let output = `<option value='0' selected>select category</option`;
//     categories.forEach(category =>{
//         output += `option value=" ${category.categories.id}">${category.categories.name}</option>`
//     })
// search.innerHTML= output;
// }
// showFeedback(text){
//     const feedback = document.querySelector('.feedback');
//     feedback.classList.add('showItem');
//     feedback.innerHTML = `<p>${text}</p>`;
//     setTimeout(()=>{
// feedback.classList.remove('showItem');
//     },3000)
// }
//  showLoader(){
//      this.loader.classList.add('showItem');
//  }
//  hideLoader(){
//     this.loader.classList.remove('showItem');
// }
// getRestaurants(resturants){
//     this.hideLoader();
// if(resturants.length === 0){
//     this.showFeedback('no such categories exist in the selected city');
// }
// else {
// this.resturantList.innerHTML = '';
// resturants.forEach(resturant) =>{
//     const {thumb:img,name,location:{address},user_rating:{aggregate_rating}, cousines, average_cost_for_two:cost,menu_url,url} = resturant.resturant;
//     if(img !=''){
//         this.showRestaurant(img,name,aggregate_rating,cousines,cost,menu_url,url);
//     }
// })
// }
// }
//     showRestaurant(img,name,address,aggregate_rating,cousines,cost,menu_url,url)
// }

// (function(){

//     const searchForm = document.getElementById('searchForm');
//     const searchCity = document.getElementById('searchCity');
//     const searchCatagory = document.getElementById('searchCatagory');

//     const zomato = new zomato();

//     const ui = new ui();

//     document.addEventListener('DOMContentLoaded',()=>{
//         zomato.searchAPI().then(data => ui.addSelectOptions(data.categories));
//     });


//     searchForm.addEventListener('submit', event =>{
//         event.preventDefault();

//         const city = searchCity.nodeValue.toLocaleLowerCase();
//         const categoryID = parasInt(searchCatagory.value);


//     if( city === '' || categoryID === 0){
//         ui.showFeedback('Please entar a city and select resturants');
//     }
//     else {
//     zomato.searchAPI(city).then(cityData => {
//         if(cityData.cityID === 0){
//             ui.showFeedback('Please enter a valid city!');

//         }
//         else {
//             ui.showLoader();
//             zomato.searchAPI(city,categoryID).then(data=> console.log(data));
//             ui.getRestaurants(data.resturants);
//         }
// });
// }

// });


// })();
