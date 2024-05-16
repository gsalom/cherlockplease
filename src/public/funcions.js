// -- carretons  -->

function loadAules(disable) {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    depts = JSON.parse(this.responseText);
    depts.forEach(function (d) {
      var aold = document.getElementById("aulaold").value
      if (d.codi == aold) {
        document.getElementById("lista2").innerHTML += ('<option selected value=' + d.codi.toString() + '>' + d.nom + '</option>');
      } else {
        if (disable) document.getElementById("lista2").innerHTML += ('<option disabled value=' + d.codi.toString() + '>' + d.nom + '</option>')
        else document.getElementById("lista2").innerHTML += ('<option value=' + d.codi.toString() + '>' + d.nom + '</option>')

      }
    });
  };
  xhttp.open("GET", "./laules", true);
  xhttp.send();
}

function loadProfes(disable) {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    depts = JSON.parse(this.responseText);
    depts.forEach(function (d) {
      var pold = document.getElementById("profold").value
      if (d.codi == pold) {
        document.getElementById("lista1").innerHTML += ('<option selected value=' + d.codi.toString() + '>' +
          d.profe + '</option>');
      } else {
        if (disable) document.getElementById("lista1").innerHTML += ('<option  disabled value=' + d.codi.toString() + '>' + d.profe +
          '</option>')
          else  document.getElementById("lista1").innerHTML += ('<option value=' + d.codi.toString() + '>' + d.profe +
          '</option>')
      }
    });
  };
  xhttp.open("GET", "./lprofes", true);
  xhttp.send();
}


function loadGrups(disable) {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    depts = JSON.parse(this.responseText);
    depts.forEach(function (d) {
      var gold = document.getElementById("grupold").value
      if (d.codi == gold) {
        document.getElementById("lista3").innerHTML += ('<option selected value=' + d.codi.toString() + '>' +
          d.grup + '</option>');
      } else {
        if (disable) document.getElementById("lista3").innerHTML += ('<option  disabled value=' + d.codi.toString() + '>' + d.grup +
          '</option>')
          else document.getElementById("lista3").innerHTML += ('<option value=' + d.codi.toString() + '>' + d.grup +
          '</option>')
      }
    });
  };
  xhttp.open("GET", "./lgrups", true);
  xhttp.send();
}

function loadDepts(disable) {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    depts = JSON.parse(this.responseText);
    depts.forEach(function (d) {
      var dold = document.getElementById("deptold").value
      if (d.codi == dold) {
        document.getElementById("lista").innerHTML += ('<option selected value=' + d.codi.toString() + '>' + d.nom + '</option>');
      } else {
        if (disable) document.getElementById("lista").innerHTML += ('<option disabled value=' + d.codi.toString() + '>' + d.nom + '</option>')
          else document.getElementById("lista").innerHTML += ('<option value=' + d.codi.toString() + '>' + d.nom + '</option>')

      }
    });
  };
  xhttp.open("GET", "./ldepartaments", true);
  xhttp.send();
}


function loadSelects(tipus) {
  switch (tipus) {
      // form carretons
    case 1:
      loadAules(false);
      break;
    case 2:
      // form grups
      loadAules(false);
      loadProfes(false);
      break;
    case 3:
      // form professorat
      loadDepts(false);
      break;
      // form horaris
    case 4:
      loadAules(true);
      loadProfes(false);
      loadGrups(true);
      break;
  }
}

function tanca() {
  window.close();
}

function activatancar(segons) {
  setTimeout(tanca, segons * 1000);
  return true;
}