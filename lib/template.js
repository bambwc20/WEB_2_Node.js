module.exports = {
  //본문을 표시해주는 함수
  HTML: function (_title, _list, _body, _comment, _writecomment) {
    return ` 
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${_title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="http://localhost:3156/">
        <script src="http://localhost:3268/"></script>
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        <div id="grid">
            ${_list}
                <div id="article">
                    ${_body}
                </div>
        </div>

        ${_writecomment}

        ${_comment}

        <div id="box">
            <div id="button"> 
                <input style="font-size: 25px;" type="button" value="night" onclick="night_day_control(this)">
            </div>
        </div>

        </body>
        </html>
        `;
  },
  //본문에 목록들을 표시해주는 함수
  List: function (_filelist) {
    _filelist.splice(3, 1);
    _filelist.splice(0, 1, "HTML");
    _filelist.splice(1, 1, "CSS");
    var list = "<ol>";
    var i = 0;
    while (i < _filelist.length) {
      list =
        list + `<li><a href="/?id=${_filelist[i]}">${_filelist[i]}</a></li>`;
      i++;
    }
    list = list + "</ol>";
    return list;
  },
  CommentList: function (_commentlist, _url) {
    var url = require("url");
    var fs = require("fs");
    var queryData = url.parse(_url, true).query;
    var origin = queryData.id;
    var text = "<ul>";
    for (var i = 0; i < _commentlist.length; i++) {
      comment = fs.readFileSync(`comment_data/${_commentlist[i]}`, "utf8");
      text =
        text +
        `<li>
                Title: ${_commentlist[i]} 
                <p>Description: 
                    ${comment}
                    <form action="/delete_process" method="post">
                        <input type="hidden" name="origin" value="${origin}">
                        <input type="hidden" name="id" value="${_commentlist[i]}">
                        <input type="submit" value="delete">
                    </form>
                    <form action="/update" method="post">
                        <input type="hidden" name="origin" value="${origin}">
                        <input type="hidden" name="id" value="${_commentlist[i]}">
                        <input type="submit" value="update">
                    </form>
                </p>
            </li>`;
    }
    text = text + "</ul>";
    return text;
  },
};
