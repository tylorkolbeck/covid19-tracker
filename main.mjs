import { getTrendingNews } from "./logic/newsAPI.mjs";
import { getTopCountryData, getWorldData } from "./logic/covid-api-calls.mjs";
import NewsElement from "./components/NewsElement.mjs";
import SearchHistory from "./components/SearchHistory.mjs";
import CountrySearchElement from "./components/CountrySearchInput.mjs";
import TopCountryListElement from "./components/TopCountryList.mjs";
import WorldDataElement from "./components/WorldData.mjs";

// Start the app logic
$(init);

function init() {
  // Renders top country and world data UI
  renderData();

  setInterval(renderData, 600000);

  // Render trending news
  // renderTrendingNewsList();

  // Build the country search input
  CountrySearchElement();

  // Build Search History
  SearchHistory();
}

function renderData() {
  renderWorldData();
  renderTopCountryList();
}

function renderWorldData() {
  getWorldData().then((totals) => {
    WorldDataElement(totals);
  });
}

function renderTopCountryList() {
  getTopCountryData(10).then((data) => {
    TopCountryListElement(data);
  });
}

function renderTrendingNewsList() {
  getTrendingNews(5)
    .then(function (data) {
      $("world-news").append(NewsElement(data));
    })

    .catch(function (error) {
      console.log(error);
    });
}
