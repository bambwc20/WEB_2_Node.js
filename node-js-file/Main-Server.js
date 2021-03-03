var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require("../lib/template.js");
var location = require("../lib/location.js");

//Main 서버
var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  if (pathname === "/") {
    //"만약에 접속이 루트라면, 즉 path가 없는 경로로 접속했다면"
    //템플릿 리터럴: 표현식&문자열 삽입, 여러 줄 문자열, 문자열 형식화, 문자열 태깅 등 다양한 기능을 제공합니다.
    if (queryData.id === undefined) {
      //어떤 없는 값을 Js에서 출력할려고 했을때, 얘는 그거를 undefined라고 출력.
      queryData.id = "WEB";
    }
    fs.readFile(`data/${queryData.id}`, "utf8", function (err, data) {
      fs.readdir(`./data`, function (error, filelist) {
        fs.readdir(`./comment_data`, function (err, commentlist) {
          var title = queryData.id;
          var list = template.List(filelist);
          var comment = template.CommentList(commentlist, _url);
          // 데이타 디렉토리의 파일리스트를 templateList함수의 입력값으로 준다.
          // 그리고 templateList함수에서 return된 list값을 변수 list에 넣는다.
          var html = template.HTML(
            title,
            list,
            `<h2>${title}</h2><p>${data}</p>`,
            comment,
            `
                    <div id="comment_box_line">
                        <form action="/create_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="text" placeholder="title....." name="title" id="comment_input_box">
                            <p><textarea placeholder="description....." name="description" id="comment_textarea" cols="30" rows="10"></textarea></p> 
                            <input type="submit" value="create comment">
                        </form>
                    </div>
                    `
          );
          response.end(html);
          response.writeHead(200);
        });
      });
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      var id = post.id;
      var location_id = location.id_location(id);
      fs.readdir("./comment_data", function (err, commentlist) {
        fs.writeFile(`comment_data/${title}`, description, "utf8", function () {
          response.writeHead(302, { Location: `${location_id}` });
          response.end();
        });
      });
    });
  } else if (pathname === "/update") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var origin = post.origin;
      fs.readFile(`comment_data/${id}`, "utf8", function (err, data) {
        fs.readdir(`./data`, function (error, filelist) {
          fs.readdir(`./comment_data`, function (err, commentlist) {
            var title = "UPDATE";
            var list = template.List(filelist);
            var comment = template.CommentList(commentlist, "");
            var html = template.HTML(
              title,
              list,
              `
                       <h2>${title}</h2>
                        <div id="comment_box_line">
                            <form action="/update_process" method="post">
                            <input type="hidden" name="origin" value="${origin}">
                                <input type="hidden" name="id" value="${id}">
                                <input type="text" placeholder="title....." name="title" id="comment_input_box" value="${id}">
                                <p><textarea placeholder="description....." name="description" id="comment_textarea" cols="30" rows="10">${data}</textarea></p> 
                                <input type="submit" value="update">
                            </form>
                        </div>
                        `,
              comment,
              ""
            );
            response.end(html);
            response.writeHead(200);
          });
        });
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      var id = post.id;
      var oringin_location = post.origin;
      var location_id = location.id_location(oringin_location);
      fs.rename(`comment_data/${id}`, `comment_data/${title}`, function (err) {
        fs.writeFile(`comment_data/${title}`, description, "utf8", function () {
          response.writeHead(302, { Location: location_id });
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      body = body + data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var oringin_location = post.origin;
      var location_id = location.id_location(oringin_location);
      fs.unlink(`comment_data/${id}`, function (err) {
        response.writeHead(302, { Location: location_id });
        response.end();
      });
    });
  } else {
    response.end("Not founded");
    response.writeHead(404);
  }
});

//이미지 서버
var app1 = http.createServer(function (request, response) {
  fs.readFile(`JS-CSS-data/coding.jpg`, function (err, data) {
    response.writeHead(200, { "Content-Type": "image/jpeg" });
    response.end(data);
  });
});

//브라우저 JS서버
var app2 = http.createServer(function (request, response) {
  fs.readFile(`JS-CSS-data/colors.js`, function (err, data) {
    response.writeHead(200, { "Content-Type": "text/javascript" });
    response.write(data);
    response.end();
  });
});

//브라우저 CSS서버
var app3 = http.createServer(function (request, response) {
  fs.readFile(`JS-CSS-data/style.css`, function (err, data) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(data);
    response.end();
  });
});

app.listen(3000); //Main서버 시작
console.log("Server running at http://localhost:3000/");
app1.listen(3124); //이미지 서버 시작
console.log("Server running at http://localhost:3124/");
app2.listen(3268); //브라우저 JS 서버 시작
console.log("Server running at http://localhost:3268/");
app3.listen(3156); //브라우저 CSS 서버 시작
console.log("Server running at http://localhost:3156/");
