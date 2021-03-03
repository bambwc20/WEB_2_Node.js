var Body = {
  SetColor: function (Bodycolor, Fontcolor) {
    document.querySelector("body").style.backgroundColor = Bodycolor;
    document.querySelector("body").style.color = Fontcolor;
  },
};
var AllLinks = {
  SetColor: function (color) {
    var alist = document.querySelectorAll("a");
    var i = 0;
    while (i < alist.length) {
      alist[i].style.color = color;
      i = ++i;
    }
  },
};
function night_day_control(click) {
  if (click.value === "night") {
    Body.SetColor("black", "white");
    click.value = "day";

    AllLinks.SetColor("powderblue");
  } else {
    Body.SetColor("white", "black");
    click.value = "night";

    AllLinks.SetColor("blue");
  }
}

/*
    var Body = {
        SetColor: function(Bodycolor) {
          document.querySelector('body').style.backgroundColor = Bodycolor;
          },
        SetTextColor: function(Fontcolor) {
          document.querySelector('body').style.color = Fontcolor;
          }
      }
      var Links = {
        SetColor: function(color) {
        var alist = document.querySelectorAll('a');
        var i = 0;
        while (i < alist.length) {
        alist[i].style.color = color;
        i = i + 1;
        } 
      }
    }
      function night_day_control(click) {
      if(click.value === 'night') {
        Body.SetColor ("black", "white");
        Body.SetTextColor("white");
        click.value = 'day';  
        Links.SetColor("powderblue");
      } else {
        Body.SetColor ("white", "black");
        Body.SetTextColor("black");
        click.value = 'night';
        Links.SetColor("blue");
      } 
    } 
    */
