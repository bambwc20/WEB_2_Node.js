module.exports = {
  id_location: function (id) {
    switch (id) {
      case "":
        id = "/";
        break;

      case "HTML":
        id = "/?id=HTML";
        break;

      case "CSS":
        id = "/?id=CSS";
        break;

      case "Javascript":
        id = "/?id=Javascript";
        break;

      default:
        id = "/";
    }
    return id;
  },
};
