const header = document.querySelector(".header");
const top10Airhead = document.querySelector(".anime__airing__top-10__heading");
const top10upcominghead = document.querySelector(
  ".anime__upcoming__top-10__heading"
);
const top10moviecominghead = document.querySelector(
  ".anime__movie__top-10__heading"
);
const animePopularhead = document.querySelector(".anime__popular__heading");

// btn
const searchbtn = document.querySelector(".header__search-box__search__button");
const animeLoadMorebtn = document.querySelector(".anime__loadmore__btn");

const searchResult__head = document.querySelector(
  ".anime__search__result__heading"
);
const sectionSearch = document.querySelector(".anime__search__result");
const form = document.querySelector(".header__search-box__search");
// let youtubecontainer;
const modal = document.getElementById("myModal");

let modal_close;
const videostop = function (youtubecontainer) {
  youtubecontainer.src = " ";
};

// //////////////////GENERATE MARKUP////////////////

const detailmarkup = function (detail) {
  const genresobj = detail.genres;
  // console.log(genresobj);
  const genres = [];
  // let cnt = 0;
  // let title = "";
  for (let j = 0; j < genresobj.length; j++) {
    genres.push(genresobj[j].name);
  }
  // console.log(genres);
  let strgenre = " ";
  for (let i = 0; i < genres.length; i++) {
    strgenre += genres[i];
    if (i < genres.length - 1) {
      strgenre += ", ";
    }
  }
  let youtubeURL = " ";
  // console.log(detail.trailer_url);
  if (detail.trailer_url != null) {
    youtubeURL = detail.trailer_url;
  }
  console.log(youtubeURL);
  const markup = ` <div class="modal-content">
<span class="close">&times;</span>

<div class="details__modal">
  <div class="details__modal__head-1__title">
         

    <h3 class="heading-primary">
      ${detail.title}
    </h3>

  </div>

  <div class="details__modal__head">
    
    <div class="details__modal__head-1">
      <div class="details__modal__head-1__poster">
        <img src=${detail.image_url} alt="" srcset="">

      </div>



     
      <div class="details__modal__head-1__rr">
        <!-- <div class="details__modal__head-1__rr__rating">
         ${detail.rating}
        </div> -->
        <div class="details__modal__head-1__rr__ranking">
         Rank: ${detail.rank}
        </div>


      </div>
      

      <div class="details__modal__head-1__genre">
        <p>
          Genre:${strgenre}
        </p>
       

      </div>




    </div>
    <div class="details__modal__head-2">
      <div  class="iframe-container">
        <iframe
        class="youtube-vid"
          scrolling="no"
          src=${youtubeURL}
        >
        </iframe>
      </div>

    </div>
  </div>



<div class="details__modal__synopsis">
  <h2>Synopsis</h2>
  <p>
   ${detail.synopsis}
  </p>

</div>
</div>


</div>`;

  return markup;
};

const loader = `  <div class="anime__search__result__loader ">
<img src="img/Cube.svg" alt="" srcset="" />
</div>`;

const generatorLoader = function (cnt) {
  return `  <div class="anime__search__result__loader loader__${cnt} ">
  <img src="img/Cube.svg" alt="" srcset="" />
  </div>`;
};

const SearchMarkup = `  <section class="anime__search__result">
<div class="anime__search__result__heading">
  <h1 class="heading-primary heading__anime__main">Search Results</h1>
</div>
</section>
`;

const generateMarkup = function (data) {
  let x = data.title.split(" ");
  //   console.log(x);
  let cnt = 0;
  let title = "";
  for (let j = 0; j < x.length; j++) {
    cnt = cnt + x[j].length;
    if (cnt > 30) {
      title += " ....";
      break;
    }
    title = title + " " + x[j];
  }
  const markup = `
    <a href="#${data.mal_id}">
     <div class="anime_card_parent">
  <div class="anime__card card bg-dark text-white">
  <div class="anime__card__box">
    <img src=${data.image_url} class="anime__card-img" alt="...">
    <div class="anime__card__title">
    <div class="anime__card__title__content">${title}</div>
  </div>
  </div>
    <div class="anime__card__overlay">
  <div class="anime__card__overlay_content">
    <div class="anime__card__overlay_content__title"> <h3>${
      data.title
    } </h3></div>
    <div class="anime__card__overlay_content__score">
      <h3>${data.score} </h3>
    </div>
    <div class="anime__card__overlay_content__episodes"><h3> ${
      data.episodes == null ? "Streaming..." : `Episodes:  ${data.episodes}`
    } </h3></div>


  </div>
  </div>

  </div>


</div>
</a>`;

  return markup;
};
const generateMarkupMovie = function (data) {
  let x = data.title.split(" ");
  //   console.log(x);
  let cnt = 0;
  let title = "";
  for (let j = 0; j < x.length; j++) {
    cnt = cnt + x[j].length;
    if (cnt > 30) {
      title += " ....";
      break;
    }
    title = title + " " + x[j];
  }
  const markup = `
    <a href="#${data.mal_id}">
     <div class="anime_card_parent">
  <div class="anime__card card bg-dark text-white">
  <div class="anime__card__box">
    <img src=${data.image_url} class="anime__card-img" alt="...">
    <div class="anime__card__title">
    <div class="anime__card__title__content">${title}</div>
  </div>
  </div>
    <div class="anime__card__overlay">
  <div class="anime__card__overlay_content">
    <div class="anime__card__overlay_content__title"> <h3>${data.title} </h3></div>
    <div class="anime__card__overlay_content__score">
      <h3>${data.score} </h3>
    </div>
    <div class="anime__card__overlay_content__episodes"><h3> MOVIE </h3></div>


  </div>
  </div>

  </div>


</div>
</a>`;

  return markup;
};

// ///////////////////////////////SEARCH RESULT////////////////////

const searchView = async function () {
  //   console.log("CLICKED");
  //   console.log(search__id.value);
  const input = document.getElementById("search__id").value;
  document.getElementById("search__id").value = " ";
  // let input = search__id.value;
  if (input.length < 3) {
    alert("Please enter more than 3 characters");
    return;
  }

  sectionSearch.innerHTML = " ";
  sectionSearch.insertAdjacentHTML("afterbegin", loader);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(1000);
  sectionSearch.innerHTML = " ";

  try {
    const res = await fetch(
      ` https://api.jikan.moe/v3/search/anime?q=${input}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);
    console.log(data);
    let x = data.results.slice(0, 10);

    x.reverse().forEach(function (item, i) {
      let markup = generateMarkup(item);
      // console.log(markup);
      // searchResult__head.insertAdjacentHTML("afterend", markup);
      sectionSearch.insertAdjacentHTML("afterbegin", markup);
    });
  } catch (error) {
    console.log(error);
  }
};

/////////////////////LOADING PAGE WILL LOAD TOP 10 ARING ANIME//////////////////////////////////
const showTop10Airing = async function () {
  try {
    const res = await fetch("https://api.jikan.moe/v3/top/anime/1/airing");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    // console.log(res, data);
    let top50Air = data.top;
    let top10Air = top50Air.slice(0, 10);

    for (let i = top10Air.length - 1; i >= 0; i--) {
      const testmark = generateMarkup(top10Air[i]);

      top10Airhead.insertAdjacentHTML("afterend", testmark);
    }

    // console.log(top10Air);
  } catch (err) {
    console.log(err);
  }
};

// //////////////////////TOP 10 Upcoming/////////////////
const showTop10Upcomig = async function () {
  try {
    const res = await fetch("https://api.jikan.moe/v3/top/anime/1/upcoming");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    // console.log(res, data);
    let top50up = data.top;
    let top10up = top50up.slice(0, 10);

    for (let i = top10up.length - 1; i >= 0; i--) {
      const testmark = generateMarkup(top10up[i]);

      top10upcominghead.insertAdjacentHTML("afterend", testmark);
    }

    // console.log(top10Air);
  } catch (err) {
    console.log(err);
  }
};
///////////////////////top 10 anime movie/////////////////////
const showTop10Movie = async function () {
  try {
    const res = await fetch("https://api.jikan.moe/v3/top/anime/1/movie");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    // console.log(res, data);
    let top50movie = data.top;
    let top10movie = top50movie.slice(0, 10);

    for (let i = top10movie.length - 1; i >= 0; i--) {
      const testmark = generateMarkupMovie(top10movie[i]);

      top10moviecominghead.insertAdjacentHTML("afterend", testmark);
    }

    // console.log(top10Air);
  } catch (err) {
    console.log(err);
  }
};

// ////////////////////////ANime POpular////////////////////////
const showAnimePopular = async function (cnt) {
  // animePopularhead.innerHTML = " ";
  const loader = generatorLoader(cnt);
  animePopularhead.insertAdjacentHTML("beforeend", loader);
  const loaderAnimation = document.querySelector(`.loader__${cnt}`);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  await sleep(1000);
  // loader

  // animePopularhead.innerHTML = " ";
  try {
    const res = await fetch(`https://api.jikan.moe/v3/top/anime/${cnt}`);
    const data = await res.json();

    loaderAnimation.classList.add("anime__search__result__loader__sleep");

    if (!res.ok) throw new Error(`${data.message}`);

    // console.log(res, data);
    let top50up = data.top.reverse();
    for (let i = top50up.length - 1; i >= 0; i--) {
      const testmark = generateMarkup(top50up[i]);

      animePopularhead.insertAdjacentHTML("beforeend", testmark);
    }

    // console.log(top10Air);
  } catch (err) {
    console.log(err);
  }
};

const openDetails = async function () {
  const id = window.location.hash.slice(1);

  if (!id) {
    return;
  }
  let posY;

  posY = this.scrollY;

  modal.style.display = "block";
  modal.innerHTML = " ";

  try {
    const results = await axios({
      method: "GET",

      url: `https://api.jikan.moe/v3/anime/${id}`,
    });

    const detail = results.data;

    modal.insertAdjacentHTML("afterbegin", detailmarkup(detail));
  } catch (error) {
    console.log(error);
  }

  let youtubecontainer = document.querySelector(".youtube-vid");

  ///CLOSE MODAL WINDOW?????
  const closeModalWindow = function () {
    modal.style.display = "none";
    location.hash = "#";
    window.scrollTo(0, posY);
  };
  modal_close = document.getElementsByClassName("close")[0];
  modal_close.addEventListener("click", function () {
    videostop(youtubecontainer);
    closeModalWindow();
  });
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      videostop(youtubecontainer);
      closeModalWindow();
    }
  });
};

/////////EVENT LISTNERs/////////////////////
// console.log(searchbtn);
form.addEventListener("submit", function (event) {
  event.preventDefault();
  searchView();
});
showTop10Airing();
showTop10Upcomig();
showTop10Movie();
showAnimePopular(1);
let loadmrecnt = 2;
animeLoadMorebtn.addEventListener("click", function (event) {
  showAnimePopular(loadmrecnt);
  loadmrecnt++;
});
window.addEventListener("hashchange", openDetails);
window.addEventListener("load", openDetails);
