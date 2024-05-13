function loadAules() {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      depts = JSON.parse(this.responseText);
      depts.forEach(function (d) {
        var aold=document.getElementById("aulaold").value
        if (d.codi==aold) {
        document.getElementById("lista2").innerHTML+=('<option selected value=' + d.codi.toString() + '>' + d.nom + '</option>');
        }
        else {
          document.getElementById("lista2").innerHTML+=('<option value=' + d.codi.toString() + '>' + d.nom + '</option>');

        }
      });
    };
    xhttp.open("GET", "./laules", true);
    xhttp.send();
  }

  function loadSelects() {
    loadAules();
  }

  function tanca() {
    window.close();
  }

  function activatancar(segons) {
    setTimeout(tanca, segons * 1000);
    return true;
  }
