$(document).ready(get_translations(),test());

function test(){
  $.ajax({
    url: "/filter",
    type: "GET",
    datatype: "json"
  }).done(function(json){
    console.log('cool');
  }).fail(function(xhr, status, error){
    console.log('not cool');
  });
}

function get_translations(){
  $.ajax({
    url: "/translations",
    type: "GET",
    datatype: "json"
  }).done(function(json){
    console.log(json);
    translations = json;
    console.log(translations);
  }).fail(function(xhr, status, error){
    console.log('not cool');
  });
};

$(function() {
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 500) {
            $(".home-menu").addClass("active");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
           $(".home-menu").removeClass("active");
        }
    });
});

function validateInput(){
  console.log("Validating...");
  var _bribeyes = $('#bribe-yes:checked').length > 0;
  if (($('#amount').val()=="")&(_bribeyes)){
    console.log("Amount");
    $('#invalid').remove();
    $('#invalid_input').remove();

    $("#invalid_amount").append("<p id='invalid'>Введіть суму будь ласка</p>");
    $("#confirmation").append("<p id='invalid_input'>Введіть суму будь ласка</p>");

  }
  else if (($("#city").val()=="other")&($("#input_сustom_city").val()=="") ){
    console.log("CUSTOM CITY: ", $("#city").val(), $("#сustom_city").val());
    $('#invalid').remove();
    $('#invalid_input').remove();

    $("#invalid_city").append("<p id='invalid'>Введіть ваше місто будь ласка</p>");
    $("#confirmation").append("<p id='invalid_input'>Введіть ваше місто будь ласка</p>");
  }
  else if (($("#university").val()=="other")&($("#input_сustom_university").val()=="") ){
    console.log("CUSTOM UNI");
    $('#invalid').remove();
    $('#invalid_input').remove();

    $("#invalid_university").append("<p id='invalid'>Введіть назву вашого універсітету будь ласка</p>");
    $("#confirmation").append("<p id='invalid_input'>Введіть назву вашого універсітету будь ласка</p>");
  }
  else if ($('#major').val()==""){
    console.log("Major");
    $('#invalid').remove();
    $('#invalid_input').remove();

    $("#invalid_major").append("<p id='invalid'>Введіть вашу спеціальність будь ласка</p>");
    $("#confirmation").append("<p id='invalid_input'>Введіть вашу спеціальність будь ласка</p>");
  }
  else if ($('#department').val()==""){
    console.log("department");
    $('#invalid').remove();
    $('#invalid_input').remove();

    $("#invalid_department").append("<p id='invalid'>Введіть ваш факультет будь ласка</p>");
    $("#confirmation").append("<p id='invalid_input'>Введіть вашу факультет будь ласка</p>");
  }
  else if (($("#subject").val()=="-1")&(_bribeyes)){
    console.log();
    $('#invalid').remove();
    $('#invalid_input').remove();

    $("#invalid_subject").append("<p id='invalid'>Введіть предмет за який ви заплатили</p>");
    $("#confirmation").append("<p id='invalid_input'>Введіть предмет за який ви заплатили</p>");
  }
  else if (($("#official").val()=="-1")&(_bribeyes)){
    console.log();
    $('#invalid').remove();
    $('#invalid_input').remove();

    $("#invalid_official").append("<p id='invalid'>Введіть позицію посадової особи котрій ви заплатили </p>");
    $("#confirmation").append("<p id='invalid_input'>Введіть позицію посадової особи котрій ви заплатили </p>");
  }
  else{
    console.log("Validate Worked");
    $('#invalid').remove();
    $('#invalid_input').remove();
    submit();
  }
};

function universtityHandler(){
  var university = $("#university").val();
  if (university=="other"){
    $('#сustom_university').remove();
    $('#customUniversity').append("<div id='сustom_university'><label for='major'>Введіть ім'я вашого навчального закладу</label>" +
    "<input id='input_сustom_university' type='text' placeholder='Навчальний заклад'></div>");
  }
  else{
    $('#сustom_university').remove();
  }
};

function cityHandler(){
  console.log(translations);
  var city = $("#city").val();
  if (city!=="other"){
    $('#сustom_city').remove();
    $('#сustom_university').remove();
    $('#university')
        .find('option')
        .remove()
        .end();
        var city_obj = translations.universities;
        console.log(city_obj);

        var univerities = city_obj[city];
        console.log(univerities);

        var option = document.createElement('option');
        option.innerHTML= "";
        option.value = "-1";
        $('#university').append(option);

        for(var i = 0; i < univerities.length; i++ ) {
          var option = document.createElement('option');
          option.innerHTML= univerities[i][lang];
          option.value = univerities[i]["key"];
          $('#university').append(option);
        };

        /* Append other */
        var option = document.createElement('option');
        if (lang==="uk")
          option.innerHTML= "Інший";
        else {
          option.innerHTML= "Other";
        }
        option.value = "other";
        $('#university').append(option);
  }

  else if (city=="other"){
    $('#сustom_university').remove();
    $('#сustom_city').remove();

    $('#customCity').append("<div id='сustom_city'><label for='major'>Введіть ваше місто навчання</label>" +
    "<input id='input_сustom_city' type='text' placeholder='Місто'></div>");
    $('#customUniversity').append("<div id='сustom_university'><label for='major'>Введіть ім'я вашего навчального закладу</label>" +
    "<input id='input_сustom_university' type='text' placeholder='Навчальний заклад'></div>");
    $('#university')
        .find('option')
        .remove()
        .end()
        .append("<option value='other'> Інший </option>");
  }
}

// function cityHandler(){
//   var city = $("#city").val();
//   if (city=="kiev"){
//     $('#сustom_city').remove();
//     $('#сustom_university').remove();
//     $('#university')
//         .find('option')
//         .remove()
//         .end();
//         var kiev = translations.univerities;
//         var kiev
//
//
//         for(var i = 0; i < official.length; i++ ) {
//           var option = document.createElement('option');
//           option.innerHTML= official[i][lang];
//           option.value = i;
//           $('#university').append(option);
//         };
//         // .append("<option value='knu'>Київський національний університет імені Тараса Шевченка (КНУ)</option>")
//         // .append("<option value='knau'>Національний авіаційний університет (НАУ)</option>")
//         // .append("<option value='kteu'>Київський національний торговельно-економічний університет</option>")
//         // .append("<option value='kpi'>Національний технічний університет України “Київський політехнічний інститут”</option>")
//         // .append("<option value='kneu'>Київський національний економічний університет ім. Вадима Гетьмана</option>")
//         // .append("<option value='kutd'>Київський національний університет технологій і дизайну</option>")
//         // .append("<option value='knuba'>Київський національний університет будівництва і архітектури</option>")
//         // .append("<option value='knlu'>Київський національний лінгвістичний університет</option>")
//         // .append("<option value='other'> Інший </option>");
//   }
//   else if (city=="kharkiv"){
//     $('#сustom_city').remove();
//     $('#сustom_university').remove();
//     $('#university')
//         .find('option')
//         .remove()
//         .end()
//         .append("<option value='khbeketova'>Харківський національний університет міського господарства імені О.М. Бекетова</option>")
//         .append("<option value='khai'>Національний аерокосмічний університет ім. М.Є. Жуковського «Харківський авіаційний інститут»</option>")
//         .append("<option value='khpi'>Національний технічний університет «Харківський політехнічний інститут» (НТУ ХПІ)</option>")
//         .append("<option value='khmudrogo'>Національний юридичний університет імені Ярослава Мудрого</option>")
//         .append("<option value='khmed'>Харківський національний медичний університет (ХНМУ)</option>")
//         .append("<option value='khped'>Харківський національний педагогічний університет імені Г. С. Сковороди (ХНПУ)</option>")
//         .append("<option value='khkarazin'>Харківський національний університет імені В.Н. Каразіна</option>")
//         .append("<option value='khire'>Харківський національний університет радіоелектроніки (ХНУРЕ)</option>")
//         .append("<option value='khneu'>Харківський національний економічний університет</option>")
//         .append("<option value='other'> Інший </option>");
//
//   }
//   else if (city=="lviv"){
//     $('#сustom_city').remove();
//     $('#сustom_university').remove();
//     $('#university')
//         .find('option')
//         .remove()
//         .end()
//         .append("<option value='lpol'>Національний університет “Львівська політехніка”</option>")
//         .append("<option value='lnufranka'>Львівський національний університет ім. Івана Франка</option>")
//         .append("<option value='ldfa'> Львівська державна фінансова академія (ЛДФА)</option>")
//         .append("<option value='lnam'>Львівська національна академія мистецтв (ЛНАМ)</option>")
//         .append("<option value='other'> Інший </option>");
//
//
//
//   }
//   else if (city=="odesa"){
//     $('#сustom_city').remove();
//     $('#сustom_university').remove();
//     $('#university')
//         .find('option')
//         .remove()
//         .end()
//         .append("<option value='onua'>Одеська національна юридична академія</option>")
//         .append("<option value='onpu'>Одеський національний політехнічний університет</option>")
//         .append("<option value='onumechnikova'>Одеський національний університет ім. І.І. Мечнікова</option>")
//         .append("<option value='odaba'>Одеська державна академія будівництва і архітектури</option>")
//         .append("<option value='odeu'>Одеський державний економічний університет</option>")
//         .append("<option value='onma'>Одеська національна морська академія</option>")
//         .append("<option value='omgu'>Міжнародний гуманітарний університет</option>")
//         .append("<option value='other'> Інший </option>");
//
//
//
//   }
//   else if (city=="other"){
//     $('#сustom_university').remove();
//     $('#сustom_city').remove();
//
//     $('#customCity').append("<div id='сustom_city'><label for='major'>Введіть ваше місто навчання</label>" +
//     "<input id='input_сustom_city' type='text' placeholder='Місто'></div>");
//     $('#customUniversity').append("<div id='сustom_university'><label for='major'>Введіть ім'я вашего навчального закладу</label>" +
//     "<input id='input_сustom_university' type='text' placeholder='Навчальний заклад'></div>");
//     $('#university')
//         .find('option')
//         .remove()
//         .end()
//         .append("<option value='other'> Інший </option>");
//   }
// }

function subjectHandler(){
  var subject = $("#subject").val();

  if (subject==="36"){
    $('#сustom_subject').remove();

    $('#customSubject').append("<div id='сustom_subject'><label for='major'>Введіть предмет за який ви заплатили</label>" +
    "<input id='input_сustom_subject' type='text' placeholder='Предмет'></div>");
  }
  else{
    $('#сustom_subject').remove();

  }

}


function submit(){
  var d = new Date();
  var month = d.getMonth()+1;
  var _date = d.getDate() +'/'+ month + '/'+ d.getFullYear();
  var _name = $("#name").val();
  var _email = $("#email").val();
  var _city = $("#city").val();
  var _customCity = $("#input_сustom_city").val();
  var _customUniversity = $("#input_сustom_university").val();

/* if custom city exists append if not null*/
  var _university = $("#university").val();
  var _major = $("#major").val();
  var _bribeyes = $('#bribe-yes:checked').length > 0;
  var _forcedyes = $('#forced-yes:checked').length > 0;
  var _bribeother = $('#bribe-other:checked').length > 0;
  console.log(_bribeyes);
  var _subject = $("#subject").val();
  var _customSubject = $("#input_сustom_subject").val();
  var _department = $("#department").val();
  console.log(_subject);
  var _official = $("#official").val();
  var _officialName = $("#officialName").val();
  var _amount = $("#amount").val();
  var _grade = $("#grade").val();
  var _forcedyes = $('#forced-yes:checked').length > 0;
  console.log(_forcedyes);
  var _size = $("#size").val();

  $.ajax({
    url: "/submit",
    data: {
      name: _name,
      email: _email,
      city: _city,
      customCity:_customCity,
      university: _university,
      customUniversity:_customUniversity,
      major: _major,
      department: _department,
      bribeyes: _bribeyes,
      forcedyes: _forcedyes,
      bribeother: _bribeother,
      subject: _subject,
      customSubject: _customSubject,
      official: _official,
      officialName: _officialName,
      amount: _amount,
      grade: _grade,
      size: _size,
      date: _date
    },
    type: "GET",
    datatype: "json"
  }).done(function(json){
    $("#name").val("");
    $("#email").val("");
    $("#city").val("");
    $("#university").val("");
    $("#major").val("");
    $("#professor").val("");
    $("#amount").val("");
    $("#department").val("");
    $("#input_сustom_city").val("");
    $("#input_сustom_university").val("");
    $("#subject").val("");
    $("#official").val("");
    $('#confirm').remove();

    var resp = 'Дякую';
    $("submit_failed").remove();
    $("#confirmation").append("<center><p id='confirm'>Дякую за вашу допомогу</p></center>");

  }).fail(function(xhr, status, error){
    $("#confirmation").append("<p id='submit_failed'> Щось пішло не так, спробуйте ще раз.</p>");
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  });
}
