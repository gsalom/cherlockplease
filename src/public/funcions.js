// -- carretons  -->

function loadAules() {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    depts = JSON.parse(this.responseText);
    depts.forEach(function (d) {
      var aold = document.getElementById("aulaold").value
      if (d.codi == aold) {
        document.getElementById("lista2").innerHTML += ('<option selected value=' + d.codi.toString() + '>' + d.nom + '</option>');
      }
      else {
        document.getElementById("lista2").innerHTML += ('<option value=' + d.codi.toString() + '>' + d.nom + '</option>');

      }
    });
  };
  xhttp.open("GET", "./laules", true);
  xhttp.send();
}

function loadTutors() {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    depts = JSON.parse(this.responseText);
    depts.forEach(function (d) {
      var told = document.getElementById("tutorold").value
      if (d.codi == told) {
        document.getElementById("lista1").innerHTML += ('<option selected value=' + d.codi.toString() + '>' + d.tutor + '</option>');
      }
      else {
        document.getElementById("lista1").innerHTML += ('<option value=' + d.codi.toString() + '>' + d.tutor + '</option>');

      }
    });
  };
  xhttp.open("GET", "./ltutors", true);
  xhttp.send();
}

function loadGrups() {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    depts = JSON.parse(this.responseText);
    depts.forEach(function (d) {
      var gold = document.getElementById("grupold").value
      if (d.codi == gold) {
        document.getElementById("lista3").innerHTML += ('<option selected value=' + d.codi.toString() + '>' +
          d.grup + '</option>');
      } else {
        document.getElementById("lista3").innerHTML += ('<option  disabled value=' + d.codi.toString() + '>' + d.grup +
          '</option>');
      }
    });
  };
  xhttp.open("GET", "./lgrups", true);
  xhttp.send();
}

function loadProfes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    depts = JSON.parse(this.responseText);
    depts.forEach(function (d) {
      var pold = document.getElementById("profold").value
      if (d.codi == pold) {
        document.getElementById("lista1").innerHTML += ('<option selected value=' + d.codi.toString() + '>' +
          d.profe + '</option>');
      } else {
        document.getElementById("lista1").innerHTML += ('<option value=' + d.codi.toString() + '>' + d.profe +
          '</option>');
      }
    });
  };
  xhttp.open("GET", "./lprofes", true);
  xhttp.send();
}


function loadDepts() {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    depts = JSON.parse(this.responseText);
    depts.forEach(function (d) {
      var dold = document.getElementById("deptold").value
      if (d.codi == dold) {
        document.getElementById("lista").innerHTML += ('<option selected value=' + d.codi.toString() + '>' + d.nom + '</option>');
      }
      else {
        document.getElementById("lista").innerHTML += ('<option value=' + d.codi.toString() + '>' + d.nom + '</option>');

      }
    });
  };
  xhttp.open("GET", "./ldepartaments", true);
  xhttp.send();
}

function loadSelects(taula) {
  loadAules();
  loadTutors();
  loadProfes();
  loadGrups();
  loadDepts()
}

function tanca() {
  window.close();
}

function activatancar(segons) {
  setTimeout(tanca, segons * 1000);
  return true;
}