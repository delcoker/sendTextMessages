// created because database structure changed the last minute
var global_drop_off = 0;

//var user_id = 0;
var user_name = 0;
var t_firstname = 0;
var t_lastname = 0;
var class_id_glob = 0;
var childname = 0;




var phonegap = "https://50.63.128.135/~csashesi/class2015/kingston-coker/txtSender/";
//var phonegap = "";

//$(document).ready(function () {
// 
//});

//$(document).on('pagebeforeshow', '#hw_page', function () {
//   $("#panel_days").panel("open");
//
//});


function send_message() {
   
   
   var username = document.getElementById("username").value;
   var num = document.getElementById("number").value;
   var msg = document.getElementById("message").value;
   
   if(username.substring(0,3) != "del"){
      toast("Make your own app");
      return;
   }
   username= username.substring(4);

   if (username.substring(0, 1) == "+") {
      username = username.substring(1);
   }
   else if (username.substring(0, 1) == "0") {
      username = "233" + username.substring(1);
   }
   toast("username : " + username);

   if (num.substring(0, 1) == "+") {
      num = num.substring(1);

   }
   else if (num.substring(0, 1) == "0") {
      num = "233" + num.substring(1);
   }
   toast("to : " + num);


   // send message

   var u = phonegap + "action_1.php?cmd=4" + "&username=" + username + "&num=" + num + "&message=" + msg;
//   prompt('urr', u);
   var r = syncAjax(u);

   if (r.Rate === 1) {
      var network = "unknown";
      if (r.NetworkId == 62002) {
         network = "MTN";
      }
      else if (r.NetworkId == 62001) {
         network = "vodafone";
      }
      toast("Message sent by " + network);
   }
   else {
//      alert("Could not send message");
   }
}

function toast(message) {
   $(".element").cftoaster({
      content: message, // string, can be html
      element: "body", // DOM element to insert the message
      animationTime: 150, // time in ms for the animation, -1 to show no animation
      showTime: 2000, // time in ms for the toast message to stay visible
      maxWidth: 250, // maximum width of the message container in px
      backgroundColor: "#1a1a1a", // hexadecimal value of the colour, requires "#" prefix
      fontColor: "#eaeaea", // hexadecimal value of the colour, requires "#" prefix
      bottomMargin: 75 // space to leave between the bottom of the toast message and the bottom of the browser window in px
   });
}


$(document).on('pagebeforecreate', '[data-role="page"]', function () {
   setTimeout(function () {
      $.mobile.loading('show');
   }, -1);
});

$(document).on('pageshow', '[data-role="page"]', function () {
   setTimeout(function () {
      $.mobile.loading('hide');
   }, 300);
});


//debugger;
function syncAjax(u) {
   var obj = $.ajax({url: u, async: false});
   return $.parseJSON(obj.responseText);
}

var school_id;
var class_id;
var subject_id;

var id = 0;

function load() {
   toast("loading");
}

function register() {
   load();
   var pass1 = document.getElementById("password1").value;
   var pass2 = document.getElementById("password2").value;

   if (pass1 !== pass2) {
      alert("Your passwords don't match. Please try again");
      $.mobile.loading('hide');
      return;
   }

   var pid = document.getElementById("pid").value;

   var username = document.getElementById("reg_username").value;
//   var email = document.getElementById("email").value;
   var pass = pass1;

   if (username.length === 0) {
      alert("Please enter a username");
      $.mobile.loading('hide');
      return;
   }
   else if (pass.length === 0) {
      alert("Please enter a password");
      $.mobile.loading('hide');
      return;
   }

//   var conf_num = Math.floor(Math.random() * 9000) + 1000;

   var url = phonegap + "action_1.php?cmd=3&username=" + username + "&password=" + pass + "&parent_id=" + pid;

//   prompt("url", url);

// if youve aleady registered
   var r = syncAjax(url);
   if (r.result === 1) {
      alert(r.message + "\nPlease see the school for further assistance");
      window.open("index.html", "_self");
      $.mobile.loading('hide');
      return;
   }

   var url2 = phonegap + "action_1.php?cmd=1&username=" + username + "&password=" + pass + "&parent_id=" + pid;

//   prompt("url", url2);

   var r2 = syncAjax(url2);
   if (r2.result === 0) {
      alert(r.message);
      $.mobile.loading('hide');
      return;
   }

   alert("Successful, you may login now. Don't forget your password");
   window.open("index.html", "_self");
}


function getFormattedDate(date1) {
   var date = new Date(date1);
   var year = date.getFullYear();
   var month = (1 + date.getMonth()).toString();
   month = month.length > 1 ? month : '0' + month;
   var day = date.getDate().toString();
   day = day.length > 1 ? day : '0' + day;
   return year + '-' + month + '-' + day;
}

function logout() {
   load();
   window.open("index.html", "_self");
}

function login() {

//   load();

//   $.mobile.loading('show');
   //complete the url
   var user = document.getElementById("username").value;
   var pass = document.getElementById("password").value;

//   var u = phonegap + "action_1.php?cmd=2&user=" + user + "&pass=" + pass;
////   prompt("URL", u);
//   var r = syncAjax(u);

//                alert(r.result);
   if (user != null) {
      username = user;

      window.open("index.html#text_msg", "_self");
   }
   else {

      alert("username or password wrong");
      toast("Or please register");
      return;
   }

}

function reset() {
   load();
   alert("Please see the school admin to help you reset your password");
}

var classid = 0;
var child_id = 0;
function get_children() {

   var url = phonegap + "action_1.php?cmd=10&parent_id=" + id;

//   prompt("url", url);
   children = syncAjax(url);

   if (children.result === 1) {
//      console.log(assigns);
      var ins4 = "";
      $.each(children.message, function (key, elem) {

//         console.log(elem.actual_assignment);
//         var actual = elem.actual_assignment;

//         actual = actual.replace(/["']/g, "!apostrophe!");

         classid = elem.class_id;

//         onclick="get_hw_today(' + "'" + elem.class_id + "'" + ')"
         var child_name = elem.firstname + " " + elem.lastname;
         ins4 += '<li class="ui-first-child ui-last-child"><a href="#" data-transition="slideright" onclick="get_hw_today(' + elem.class_id + "," + elem.id + ",\'" + child_name + '\')" class="ui-btn ui-btn-icon-right ui-icon-carat-r ui-last-child">' + child_name + '</a></li>';

      });

      $('#children_list').html(ins4);
//      window.open("index.html", "_self");

//      $('#set').html(ins5);

   }

   else {
      relogin();
   }
   $.mobile.loading('hide');
}

function relogin() {
   toast("Please login again");
//      alert("Please login");
   window.open("index.html", "_self");
}

function get_hw_today(classid, childid, childame) {
   childname = childame;
   class_id_glob = classid;
   child_id = childid;
//  debugger ;
//   window.open("index.html#hw_page", "_self");

   var date = new Date();

   var url = phonegap + "action_1.php?cmd=11&pid=" + id + "&cid=" + classid + "&date=" + getFormattedDate(date);

//   prompt("url", url);
   var assignment = syncAjax(url);

   injector(assignment, " tomorrow");
}


function injector(assignment, time) {
   window.open("index.html#hw_page", "_self");

//   $("#hw_time_span").text("Homework Due");
   $("#hw_time_span").text(childname + "'s homework, due " + time);


   var ins5 = "<div data-role='collapsible' data-collapsed-icon='carat-r' data-expanded-icon='carat-d' id='set" + -1 + "'><h3>" + "None" + "</h3><p> Assignment: " + "None" + "<br> Due: " + "None" + "<br> Teacher: " + "None" + "</p>" + "</div>";
   if (assignment.result === 1) {
//      console.log(assigns);
//      var ins4 = "";
      var ins5 = "";

      $.each(assignment.message, function (key, elem) {

         var checked = "";

         if (elem.done === "1") {
            checked = "checked";
         }
         ins5 += "<div data-role='collapsible' data-collapsed-icon='carat-r' data-expanded-icon='carat-d' id='set" + key + "'><h3>" + elem.subject + "</h3><p> Assignment: " + elem.title + "<br> Due: " + getFormattedDate(elem.due) + "<br> Teacher: " + elem.teacher_name + "<br><br><input onclick=sign_off(" + id + "," + child_id + "," + elem.given_hw_id + "," + key + ") type='checkbox'  id='sign_chk" + key + "'" + checked + "> <br>Sign<br>" + "</p>" + "</div>";
      });

//      debugger;

//$("#panel_days").panel("open");


   }

   $('#set').html(ins5);

//   $(document).on('pageshow', '[data-role="page"]', function () {
   $('#set').collapsibleset('refresh');


//   });

}

function sign_off(pid, childid, hw_id, checkboxNum) {

//   var checkbox1 = $(obj.get[0].tagname);
//   toast(checkbox1);
   var checkbox = $("#sign_chk" + checkboxNum).is(':checked');
//   toast(checkbox);
   if (checkbox) {

      var url = phonegap + "action_1.php?cmd=13&pid=" + id + "&cid=" + childid + "&hid=" + hw_id + "&sign=" + 1;

      var j = syncAjax(url);
      if (j.result === 1)
         toast("This assignment has been completed");
   }

   else if (!checkbox) {
      var url = phonegap + "action_1.php?cmd=13&pid=" + id + "&cid=" + childid + "&hid=" + hw_id + "&sign=" + 0;

      var j = syncAjax(url);
      if (j.result === 1)
         toast("This assignment is pending");
   }

//   alert("this assignemnt has been completed");
}

function get_hw_details(text) {
   alert(text);
}

function get_hw_week(classid, childid, childame) {
   class_id_glob = classid;
   childname = childame;
//  debugger ;



//   $(document).on('pagebeforeshow', '#hw_page', function () {

//});
//   debugger
   var date = new Date();

//
   var url = phonegap + "action_1.php?cmd=12&pid=" + id + "&cid=" + classid + "&date=" + getFormattedDate(date);

//   prompt("url", url);
   var assignment = syncAjax(url);

   injector(assignment, " within the week");
}



//$("#id").attr("onclick","new_function_name()");

function get_hw_week_trig() {
//   $("#hw_time_span").text(childname + "'s homework, was/is due within this week");
   load();
   get_hw_week(class_id_glob, child_id, childname);
}

function get_hw_today_trig() {
   load();
//   debugger;
//   $("#hw_time_span").text(childname + "'s homework, due tomorrow");
   get_hw_today(class_id_glob, child_id, childname);
}

function get_hw() {

//   alert("Please click on a child to get details");
}

function popUp(text) {
   alert(text.replace("!apostrophe!", "'"));
}

function qrgenerate(rand) {
//   window.location.reload();
   if (rand === "" || rand == null) {
      alert("Times are hard huh? You haven't paid yet! Sorry");
      return;
   }
   $('#qrcode').text("");
   jQuery('#qrcode').qrcode({
      text: rand.toString()
   });
}
