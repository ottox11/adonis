// function clear() {
// var formulario = document.formularioLogin;
//     var todoCorrecto=true;

// for (var i=0; i<formulario.length; i++) {
//     if (formulario[i].value == null || formulario[i].value.length == 0 || /^\s*$/.test(formulario[i].value)){
//     var vacio = (formulario[i].name+ ' no puede estar vacío o contener sólo espacios en blanco');
//       alertify
//       .alert(vacio, function(){

//     });
//   }
//   todoCorrecto=false;
// } 
// }
////// ---------- FUNCIÓN LOGIN APP -------------- //////////////////////////////////////
function entrar() {


  var mail = document.getElementById("InputEmail").value;
  var passwd = document.getElementById("InputPassword").value;


  var data = {};
  data.mail = mail;
  data.passwd = passwd;
  
  $.ajax({
    type: 'POST',
    data: data,

    url: 'http://34.235.106.212:8080/api/authenticate',
    success: function (data) {
      
      if (data.status == true) {
        window.open("http://34.235.106.212/dashboard.html", "_self");
      } else {
        alertify
          .alert(data.message, function () {
           
          });
      }

    },
    error: function (xhr, status, error) {
        alertify
        .alert('Error de comunicación con el servidor, contacte a sistemas', function () {
         
        });
    },
  });
}
///////////////// --------------------------------------- /////////////////////////////////////////////

//////////////// FUNCIÓN REGISTRAR USUARIOS DE LA PLATAFORMA ---------- ////////////////////////////
function registrar() {

  var name = document.getElementById("inputName").value;
  var lastname = document.getElementById("inputLastName").value;
  var mail = document.getElementById("inputEmail").value;
  var passwd = document.getElementById("inputPassword").value;
  var rpasswd = document.getElementById("inputRepeatPassword").value;

  var data = {};
  data.name = name;
  data.lastname = lastname;
  data.mail = mail;
  data.passwd = passwd;
  data.rpasswd = rpasswd;
  
  $.ajax({
    type: 'POST',
    data: data,

    url: 'http://34.235.106.212:8080/api/register',
    success: function (data) {

      if (data.status == true) {
        alertify
          .alert(data.message, function () {
            //alertify.message('OK');
            document.forms[0].reset()
            window.open("http://34.235.106.212/login.html", "_self");
          });
      } else {
        alertify
          .alert(data.message, function () {
            //alertify.message('OK');
          });
      }
    },
    error: function (xhr, status, error) {
      
      alertify
        .alert('Error de comunicación con el servidor, contacte a sistemas', function () {
          //alertify.message('OK');
        });
    },
  });
}
///////////// ---------------------------------------------- ///////////////////////////////////

//////////// FUNCIÓN REGISTRAR PAS -------------------------- ////////////////////////////////
async function registrar_prod() {

  let name = document.getElementById("inputFirstName").value;
  let lastname = document.getElementById("inputLastName").value;
  let dni = document.getElementById("inputDni").value;
  let mail = document.getElementById("inputEmail").value;
  let cphone = document.getElementById("inputCelularPhone").value;
  let ophone = document.getElementById("inputOfficePhone").value;
  let otphone = document.getElementById("inputOtherPhone").value;
  let birthday = document.getElementById("inputBirthday").value;
  let address = document.getElementById("inputAddress").value;
  let locate = document.getElementById("inputLocate").value;
  let zp = document.getElementById("inputZp").value;
  // let province = document.getElementById("inputProvince").value;
  let posicionProv = document.getElementById('prov').options.selectedIndex;
  let province = (document.getElementById('prov').options[posicionProv].text); //valor
  let ojob = document.getElementById("inputOtherJob").value;
  let registration = document.getElementById("inputRegistration").value;
  let income = document.getElementById("inputIncome").value;
  let sorganizer = document.getElementById("inputSubOrganizer").value;
  let executive = document.getElementById("inputExecutive").value;
  let note = document.getElementById("inputNote").value;
  //  var file=document.getElementById("inputImage").files[0];
  let locker = document.getElementsByName("casillero");

  for (i = 0; i < locker.length; i++) {
    if (locker[i].checked) {
      //var memory=memo[i].checked;
      var lock = locker[i].value;

      
    }
  }

   //                      ------ MODULO CARGAR IMÁGENES ------------------ 
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.readAsText(file);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  let photo;
  async function Main() {
    const file = document.getElementById("inputImage").files[0];
    
    photo = await toBase64(file);
  }

  await Main();
  
  //// -----------------------------------------------------

  var data = {};
  data.name = name;
  data.lastname = lastname;
  data.dni = dni;
  data.mail = mail;
  data.cphone = cphone;
  data.ophone = ophone;
  data.otphone = otphone;
  data.birthday = birthday;
  data.address = address;
  data.locate = locate;
  data.zp = zp;
  data.province = province;
  data.ojob = ojob;
  data.registration = registration;
  data.income = income;
  data.sorganizer = sorganizer;
  data.executive = executive;
  data.note = note;
  data.lock = lock;
  data.photo = photo;
  
    $.ajax({
    type: 'POST',
    data: data,

    url: 'http://34.235.106.212:8080/api/registerProd',
    success: function (data) {


      if (data.status == true) {
         alertify
          .alert(data.message, function () {

            document.getElementById('addCompany').disabled = true;
            let form = document.getElementById('formAddProd');
            document.getElementById('FormRegCompanies').style.display = 'block';
            document.getElementById('comp').focus();

            for (var i = 0; i < form.length; i++) {
              form[i].disabled = true
            }

           });
      } else {
        alertify
          .alert(data.message, function () {
            //alertify.message('OK');
            
          });
      }
    },
    error: function (xhr, status, error) {
      
      alertify
        .alert('Error de comunicación con el servidor, contacte a sistemas', function () {
          //alertify.message('OK');
        });
    },

  });

}
//////////////////////// FUNCIÓN LISTAR COMAPÑIAS EN FORM DE REG. PAS -------- //////////////////////
function myOnLoad() {
  cargar_companies()
  cargar_provincias()
}

// funcion para Cargar Compañias al campo <select>
function cargar_companies() {

  $.ajax({
    type: 'GET',
    //  data: data,

    url: 'http://34.235.106.212:8080/api/companies',
    success: function (data) {


      if (data.status == true) {
        
        var companiesList = data.data;
        companiesList.sort();

        for (var i in companiesList) {
          
          document.getElementById("comp").innerHTML += "<option id='XQ' value='" + Object.values(companiesList[i]) + "'>" + Object.values(companiesList[i]) + "</option>";

        }
        //  });
      } else {
        alertify
          .alert(data.message, function () {
            //alertify.message('OK');
            
          });
      }
    }
  });

}

// funcion para Cargar Provincias al campo <select>
function cargar_provincias() {

  $.ajax({
    type: 'GET',
    //  data: data,

    url: 'http://34.235.106.212:8080/api/tools',
    success: function (data) {


      if (data.status == true) {

        let provincesList = data.data;
        provincesList.sort();

        for (let i in provincesList) {
          
          document.getElementById("prov").innerHTML += "<option id='XZ' value='" + provincesList[i] + "'>" + provincesList[i] + "</option>";

        }
        //  });
      } else {
        alertify
          .alert(data.message, function () {});
      }
    }
  });

}
////////////////// -------------------------------------- ////////////////////////////////////////////

///////////////// FUNCIÓN REGISTRAR COMPAÑIAS Y CÓDIGOS DEL PAS --------- ///////////////////////////
async function registrar_comp() {

  var posicion = document.getElementById('comp').options.selectedIndex;
  var name = (document.getElementById('comp').options[posicion].text); //valor
  var code = document.getElementById("inputCode").value;

  var data = {};
  data.name = name;
  data.code = code;

    $.ajax({
    type: 'POST',
    data: data,

    url: 'http://34.235.106.212:8080/api/companies',
    success: function (data) {
      if (data.status == true) {

        alertify.confirm('Invai', data.message, function () {
          let fatherA = document.getElementById('A');
          let newLabelA = document.createElement('li');
          newLabelA.append(name);
          fatherA.appendChild(newLabelA);

          let fatherB = document.getElementById('B');
          let newLabelB = document.createElement('li');
          newLabelB.append(code);
          fatherB.appendChild(newLabelB);

          document.getElementById('FormRegCompanies').reset();
          document.getElementById('btnEnd').style.display = 'block';

        }, function () {
          alertify.success('¡Productor creado con exito!'), 9000;
          window.open("http://34.235.106.212/dashboard.html", "_self");
        });


      } else {
        alertify
          .alert(data.message, function () {
           
          });
      }
    },
    error: function (xhr, status, error) {
      
      alertify
        .alert('Error de comunicación con el servidor, contacte a sistemas', function () {
          //alertify.message('OK');
        });
    },

  });

}
/////////////////// -------------------------------------------- /////////////////////////////////

///////////////// FUNCIÓN LISTAR PAS ----////////////////////////
function myListOnLoad() {
  cargar_listProd()
}

// funcion para Cargar Provincias al campo <select>
function cargar_listProd() {

  $.ajax({
    type: 'GET',
    //  data: data,
    url: 'http://34.235.106.212:8080/api/listProducers',
    success: function (data) {

      if (data.status == true) {
        const valores = data.data;
        

        let tabla = $("#dataTable").DataTable();

        valores.forEach(f => {
          tabla.row.add(Object.values(f)).draw(false);

        });

        valores.forEach(e => {
          var result = Object.keys(e).map(function (key) {
            return [e[key]];
          });
                  })


      } else {
        alertify
          .alert(data.message, function () {
            
            
          });
      }
    }
  });

}
////////////////////////// ------------------------------ /////////////////////////////

/////////////////////// FUNCIÓN VALIDA EMAIL /////////////////////////////////////////
function valida_mail() {

  let valueEmail = document.getElementById('inputEmail').value;

  let data = {};
  data.mail = valueEmail;

  
  if (valueEmail != '') {

    $.ajax({
      type: 'POST',
      data: data,

      url: 'http://34.235.106.212:8080/api/validMail',
      success: function (data) {


        if (data.status == true && data.data != '') {
          alertify
            .alert(data.message, function () {
              //document.getElementById('inputEmail').focus();
            });

        } else {
          document.getElementById('inputCelularPhone').focus();
        }
      }
    });
  } else {
    return;
  }
}

/////// ------ FUNCIÓN FILTRAR PAS EN LIST2 PAS/COMPAÑIAS ------ /////////////////
$(function () {
  $('#input-search').on('keyup', function () {
    var rex = new RegExp($(this).val(), 'i');
    $('.searchable-container .items').hide();
    $('.searchable-container .items').filter(function () {
      return rex.test($(this).text());
    }).show();
  });
});
//////////////// ---------------------------------------------- ///////////////////

///////// ---- FUNCIÓN LISTAR PAS POR TARJETAS COMPAÑIA - CÓDIGO --- ////////////////

function myListTwoOnLoad() {
  cargar_listTwoProd()
}

// funcion para Cargar Provincias al campo <select>
function cargar_listTwoProd() {

  $.ajax({
    type: 'GET',
    //  data: data,
    url: 'http://34.235.106.212:8080/api/listTwoProducers',
    success: function (data) {

      if (data.status == true) {
        const valores = data.data;
        

        let outputDatax = valores.map(Object.values);
        
        outputDatax.forEach(element => {
          
          const divFather = document.getElementById('QQ');
          const sect = document.getElementById('sect');
          const divSonA = document.getElementById('divSonA');
          const divSonB = document.getElementById('divSonB');
          const divGchildA = document.createElement('div');
          divGchildA.setAttribute('class', 'col-md-6 items');
          const divGchildB = document.createElement('div');
          divGchildB.setAttribute('class', 'd-flex flex-row border rounded');
          const divConImg = document.createElement('div');
          divConImg.setAttribute('class', 'p-0 w-25');
          divConImg.setAttribute('id', 'imgDiv');
          const divGchildC = document.createElement('div');
          divGchildC.setAttribute('class', 'pl-3 pt-2 pr-2 pb-2 w-75 border-left');
          const A = document.createElement('div');
          divFather.appendChild(sect);
          sect.appendChild(divSonA);
          divSonA.appendChild(divSonB);
          divSonB.appendChild(divGchildA);
          divGchildA.appendChild(divGchildB);
          divGchildB.appendChild(divConImg);
          divGchildB.appendChild(divGchildC);


          const hName = document.createElement('h5');
          divGchildC.appendChild(hName);
          const elementH4 = element[0] + ' ' + element[1];
          hName.append(elementH4);

          const hCompany = document.createElement('h5');
          divGchildC.appendChild(hCompany);
          const elementH5 = element[3];
          hCompany.append(elementH5);
          hCompany.setAttribute('class', 'companyL')

          const hCode = document.createElement('h5');
          divGchildC.appendChild(hCode);
          const elementP = element[2];
          hCode.append(elementP);
          hCode.setAttribute('class', 'code')

          const img = document.createElement('img');
          divConImg.appendChild(img);
          const srcImage = element[4];
          img.setAttribute('class', 'img-thumbnail border-0');
          img.setAttribute('src', srcImage);
          img.setAttribute('id', 'imgCard');

          const iconPas = document.createElement('i');
          iconPas.setAttribute('class', 'far fa-handshake float-left margIcon');
          hName.appendChild(iconPas);

          const iconComp = document.createElement('i');
          iconComp.setAttribute('class', 'fas fa-business-time float-left margIcon');
          hCompany.appendChild(iconComp);

          const iconCode = document.createElement('i');
          iconCode.setAttribute('class', 'fas fa-barcode float-left margIcon');
          hCode.appendChild(iconCode);

          const butt = document.createElement('button');
          butt.setAttribute('class', 'btn btn-primary butt-prof');
          butt.setAttribute('onclick', 'javascript:profile()')
          const spanButt = document.createElement('span');
          spanButt.setAttribute('class', 'text');
          spanButt.innerText = 'Ver perfil';
          const iconButt = document.createElement('i');
          iconButt.setAttribute('class', 'far fa-user');
          butt.appendChild(iconButt);
          butt.appendChild(spanButt);
          divGchildC.appendChild(butt);

          // const pButt = document.createElement('p');
          // pButt.setAttribute('class', 'text-right m-0');
          // const aButt = document.createElement('a');
          // aButt.setAttribute('class', 'btn btn-primary');
          // aButt.innerText = 'Ver Perfil';
          // const iButt = document.createElement('i');
          // iButt.setAttribute('class', 'far fa-user');
          // pButt.appendChild(aButt);
          // aButt.appendChild(iButt);
          // divGchildC.appendChild(pButt);

        });

      } else {
        alertify
          .alert(data.message, function () {
           
          });
      }
    }
  });


}

/////// -----------------------------------////////////////////

function profile() {
  console.log('nnnn')
}