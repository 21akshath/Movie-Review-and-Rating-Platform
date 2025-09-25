// Login
function login(){
  const user=document.getElementById("username").value.trim();
  const pass=document.getElementById("password").value.trim();
  if(user==="admin" && pass==="admin123"){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("dashboardPage").style.display="block";
    displayMovies();
  }else document.getElementById("loginError").textContent="Invalid username or password!";
}

// Movie data (15 movies)
const movies = [
  {id:1,title:"Inception",genre:"Action",desc:"A mind-bending thriller by Nolan.",img:"https://images.unsplash.com/photo-1596567468794-08a0bba18f3d",reviews:["Amazing!"],ratings:[5]},
  {id:2,title:"Joker",genre:"Drama",desc:"A dark psychological thriller.",img:"https://images.unsplash.com/photo-1600508777824-5d358d2b0d62",reviews:["Intense!"],ratings:[5]},
  {id:3,title:"Avengers",genre:"Action",desc:"Superheroes unite to save the world.",img:"https://images.unsplash.com/photo-1581905764498-8c7c23c76f39",reviews:["Epic!"],ratings:[4]},
  {id:4,title:"Parasite",genre:"Drama",desc:"Oscar-winning masterpiece.",img:"https://images.unsplash.com/photo-1581905764274-8d7c13c76f21",reviews:["Brilliant!"],ratings:[5]},
  {id:5,title:"The Hangover",genre:"Comedy",desc:"A hilarious adventure.",img:"https://images.unsplash.com/photo-1581905764165-3f7c23c76f13",reviews:["So funny!"],ratings:[4]},
  {id:6,title:"Titanic",genre:"Drama",desc:"Epic love story on the Titanic.",img:"https://images.unsplash.com/photo-1581905764310-5f7c23c76f11",reviews:["Heartbreaking!"],ratings:[5]},
  {id:7,title:"Interstellar",genre:"Action",desc:"Sci-fi adventure across galaxies.",img:"https://images.unsplash.com/photo-1581905764380-6c7c23c76f10",reviews:["Mind-blowing!"],ratings:[5]},
  {id:8,title:"The Godfather",genre:"Drama",desc:"Classic mafia movie.",img:"https://images.unsplash.com/photo-1581905764410-7c7c23c76f12",reviews:["Legendary!"],ratings:[5]},
  {id:9,title:"Toy Story",genre:"Comedy",desc:"Animated fun for all ages.",img:"https://images.unsplash.com/photo-1581905764500-8c7c23c76f14",reviews:["Loved it!"],ratings:[4]},
  {id:10,title:"Get Out",genre:"Horror",desc:"Psychological horror thriller.",img:"https://images.unsplash.com/photo-1581905764600-9c7c23c76f15",reviews:["Terrifying!"],ratings:[4]},
  {id:11,title:"Avatar",genre:"Action",desc:"Epic sci-fi with stunning visuals.",img:"https://images.unsplash.com/photo-1581905764700-0c7c23c76f16",reviews:["Visually amazing!"],ratings:[5]},
  {id:12,title:"Coco",genre:"Comedy",desc:"Heartwarming animated story.",img:"https://images.unsplash.com/photo-1581905764800-1c7c23c76f17",reviews:["Beautiful story!"],ratings:[5]},
  {id:13,title:"A Quiet Place",genre:"Horror",desc:"Silent horror suspense.",img:"https://images.unsplash.com/photo-1581905764900-2c7c23c76f18",reviews:["Very intense!"],ratings:[4]},
  {id:14,title:"La La Land",genre:"Drama",desc:"Musical love story.",img:"https://images.unsplash.com/photo-1581905765000-3c7c23c76f19",reviews:["Amazing music!"],ratings:[5]},
  {id:15,title:"Finding Nemo",genre:"Comedy",desc:"Animated underwater adventure.",img:"https://images.unsplash.com/photo-1581905765100-4c7c23c76f20",reviews:["Cute and fun!"],ratings:[5]}
];

let currentMovieId=null;
let favorites=[];

// Display movies
function displayMovies(list=movies){
  const container=document.getElementById("movieList");
  container.innerHTML="";
  list.forEach(m=>{
    container.innerHTML+=`
      <div class="movie-card">
        <img src="${m.img}" alt="${m.title}">
        <h3>${m.title}</h3>
        <p>${m.genre}</p>
        <button onclick="viewDetails(${m.id})">View Details</button>
        <button onclick="toggleFavorite(${m.id})">${favorites.includes(m.id)?'★ Favorite':'☆ Add to Favorites'}</button>
      </div>`;
  });
}

// Toggle favorite
function toggleFavorite(id){
  if(favorites.includes(id)) favorites=favorites.filter(f=>f!==id);
  else favorites.push(id);
  displayMovies();
}

// Modal details
function viewDetails(id){
  const m=movies.find(movie=>movie.id===id);
  currentMovieId=id;
  document.getElementById("modalImg").src=m.img;
  document.getElementById("modalTitle").textContent=m.title;
  document.getElementById("modalGenre").textContent="Genre: "+m.genre;
  document.getElementById("modalDesc").textContent=m.desc;
  renderReviews(m);
  document.getElementById("movieModal").style.display="flex";
}
function closeModal(){ document.getElementById("movieModal").style.display="none"; }

// Reviews
function renderReviews(movie){
  let avg=movie.ratings.length?(movie.ratings.reduce((a,b)=>a+b,0)/movie.ratings.length).toFixed(1):0;
  let stars="⭐".repeat(Math.round(avg))+"☆".repeat(5-Math.round(avg));
  document.getElementById("avgRating").innerHTML=`<h4>${stars} (${avg})</h4>`;
  let reviewsHTML="<h4>User Reviews:</h4>";
  if(movie.re