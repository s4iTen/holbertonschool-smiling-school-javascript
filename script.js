$(document).ready(function () {
    getQuotes();
  
    getTutorials();
  
    getLatestVids();
  
    loadCourses();
  });
  
  const getQuotes = () => {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/quotes",
      method: "GET",
      success: function (data) {
        console.log(data);
  
        data.forEach(function (item) {
          $(`#quotes-pic-${item.id}`).attr("src", item.pic_url);
          $(`#quotes-text-${item.id}`).text(item.text);
          $(`#quotes-name-${item.id}`).text(item.name);
          $(`#quotes-title-${item.id}`).text(item.title);
        });
  
        $("#testimonialLoader").remove();
        $("#quotes").removeClass("d-none");
      },
      error: function () {
        console.log("Error fetching quotes");
      },
    });
  };
  
  const getTutorials = () => {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      method: "GET",
      success: (data) => {
        console.log(data);
  
        data.forEach((item) => {
          $(`#tutorials`).append(`
              <div id="tutorial-${
                item.id
              }" class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card border-0">
                  <img
                    src="${item.thumb_url}"
                    class="bg-img card-img-top img-fluid"
                    alt="thumbnail"
                  />
                  <img class="card-img-overlay w-50 ml-5 mt-3" src="./images/play.png">
                  <div class="card-body">
                    <h5>${item.title}</h5>
                    <p>${item["sub-title"]}</p>
                    <div class="row">
                      <img
                        src="${item.author_pic_url}"
                        alt="tiny profile"
                        style="height: 20px"
                        class="mx-3 rounded-circle"
                      />
                      <h6 class="purple-text">${item.author}</h6>
                    </div>
                    <!-- stars -->
                    <div class="row mx-0">
                      <img src="./images/star_${
                        item.star >= 1 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <img src="./images/star_${
                        item.star >= 2 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <img src="./images/star_${
                        item.star >= 3 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <img src="./images/star_${
                        item.star >= 4 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <img src="./images/star_${
                        item.star >= 5 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <h6 class="purple-text ml-auto">${item.duration}</h6>
                    </div>
                  </div>
                </div>
              </div>
            `);
        });
  
        $("#tutorial-1").addClass("active");
  
        $("#tutorialLoader").remove();
        $("#popular").removeClass("d-none");
      },
      error: () => {
        console.log("Error fetching tutorials");
      },
    });
  };
  
  const getLatestVids = () => {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/latest-videos",
      method: "GET",
      success: (data) => {
        console.log(data);
  
        data.forEach((item) => {
          console.log(item);
          $(`#blockbuster`).append(`
              <div id="latest-${
                item.id
              }" class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card border-0">
                  <img
                    src="${item.thumb_url}"
                    class="bg-img card-img-top img-fluid"
                    alt="thumbnail"
                  />
                  <img class="card-img-overlay w-50 ml-5 mt-3" src="./images/play.png">
                  <div class="card-body">
                    <h5>${item.title}</h5>
                    <p>${item["sub-title"]}</p>
                    <div class="row">
                      <img
                        src="${item.author_pic_url}"
                        alt="tiny profile"
                        style="height: 20px"
                        class="mx-3 rounded-circle"
                      />
                      <h6 class="purple-text">${item.author}</h6>
                    </div>
                    <!-- stars -->
                    <div class="row mx-0">
                      <img src="./images/star_${
                        item.star >= 1 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <img src="./images/star_${
                        item.star >= 2 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <img src="./images/star_${
                        item.star >= 3 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <img src="./images/star_${
                        item.star >= 4 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <img src="./images/star_${
                        item.star >= 5 ? "on" : "off"
                      }.png" height="15px" width="15px" />
                      <h6 class="purple-text ml-auto">${item.duration}</h6>
                    </div>
                  </div>
                </div>
              </div>
            `);
        });
        $("#latest-1").addClass("active");
  
        $("#latestLoader").remove();
        $("#latest-videos").removeClass("d-none");
      },
      error: () => {
        console.log("Error fetching latest vids");
      },
    });
  };
  
  const loadCourses = () => {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      type: "GET",
      success: function (response) {
        response.topics.forEach((topic) => {
          $("#topicDropDown").append(
            `<li class="dropdown-item">
                            <a href="#" class="text-dark" style="text-decoration: none;" onclick="topicSelect(this)">
                                ${toStandardString(topic)}
                            </a>
                        </li>`
          );
        });
  
        response.sorts.forEach((sort) => {
          $("#sorts").append(
            `<li class="dropdown-item">
                            <a href="#" class="text-dark" style="text-decoration: none;" onclick="sortSelect(this)">
                                ${toStandardString(sort)}
                            </a>
                        </li>`
          );
        });
      },
    });
  
    getCourses();
  
    $("#search").change(function () {
      getCourses();
    });
  };
  
  function getCourses() {
    $("#courseVideos").empty();
    $("#courseVideos").append(`<div class="loader" id="tutorialLoader"></div>`);
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      type: "GET",
      data: {
        q: $("#search").val(),
        topic: $("#topic").val(),
        sort: $("#sort-by").val(),
      },
      success: function (response) {
        const courses = response.courses;
  
        $("#tutorialLoader").remove();
        $("#courseVideos").append(
          `<span class="vid-count w-100 ml-3">${courses.length} videos</span>`
        );
        loadVideos(courses);
      },
      error: function (xhr) {
        console.log(xhr.responseText);
      },
    });
  }
  
  function toStandardString(snakeCaseString) {
    let words = snakeCaseString.split("_");
    words[0] = words[0][0].toUpperCase() + words[0].substr(1);
    return words.join(" ");
  }
  
  function stars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i < rating) {
        stars += `<img src="./images/star_on.png" height="15px" width="15px">`;
      } else {
        stars += `<img src="./images/star_off.png" height="15px" width="15px">`;
      }
    }
    return stars;
  }
  
  function loadVideos(courses) {
    courses.forEach((video) => {
      $("#courseVideos").append(
        `<div class="col-12 col-sm-4 col-md-3 my-3">
                    <div>
                        <img class="card-img-top" src="${video.thumb_url}" alt="">
                        <img class="card-img-overlay play mx-auto mt-1 px-4 w-50" src="images/play.png">
                    </div>
                    <div class="card-body">
                        <h1 class="card-title lead font-weight-bold text-dark">${
                          video.title
                        }</h1>
                        <p class="card-text text-secondary">${
                          video["sub-title"]
                        }</p>
                        <div class="row">
                            <img class="rounded-circle ml-3" src="${
                              video["author_pic_url"]
                            }" height="25px" width="25px"
                                alt="">
                            <p class="ml-3 purple">${video.author}</p>
                        </div>
                        <div class="row align-items-center justify-content-between px-4">
                            <div class="row">
                                ${stars(video.star)}
                            </div>
                            <p class="purple ml-3 pt-3">${video.duration}</p>
                        </div>
                    </div>
                </div>
                `
      );
    });
  }
  
  function topicSelect(topic) {
    $("#topic").text(topic.textContent);
    getCourses();
  }
  
  function sortSelect(sort) {
    $("#sort-by").text(sort.textContent);
    getCourses();
  }