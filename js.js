const loadMeals= async(searchText)=>{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res=await fetch(url);
    const data=await res.json();
    displayMeals(data.meals);
}

loadMeals('chicken');

const displayMeals = meals => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML='';
    meals.forEach(meal => {
        console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');

        mealDiv.innerHTML = `

        <div class="card h-100 p-4">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.</p>
                <!-- Button trigger modal -->
                <button onclick="mealModal(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
               Details
                </button>
        </div>
        </div>
        `
        mealsContainer.appendChild(mealDiv);
    });
}

// document.getElementById('search-btn').addEventListener('click',function(){
//     const searchInputfield=document.getElementById('search-field').value;
//     loadMeals(searchInputfield);
// })

const mealSearch=()=>{
    const searchInputfield=document.getElementById('search-field').value;
    loadMeals(searchInputfield);
}


const mealModal=async(idMeal)=>{
    
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    const res=await fetch(url);
    const data=await res.json();
    displayMealModal(data.meals[0])
    
}

const displayMealModal=(meal)=>{

    document.getElementById('mealDetailsLabel').innerText=meal.strMeal;
    const mealsDetails=document.getElementById('modal-detail-body');
    mealsDetails.innerHTML=`
    <div class="card h-100 p-4">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h3 class="card-title">${meal.strMeal}</h5>
        <h4>Area : ${meal.strArea}</h4>
        <h4>Category : ${meal.strCategory}</h4>
        <p>Making Instructions : ${meal.strInstructions}</p>
    </div>
    </div>
    `;
}
