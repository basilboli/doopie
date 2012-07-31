
$(document).ready (function () {
    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;
});

function sayhello() {
    alert('hello' + document.getElementById('name').value + '!');
}
function checkin() {
    navigator.geolocation.getCurrentPosition(showMap);
}
function showMap (position) {
    document.getElementById("lat").innerHTML = position.coords.latitude;
    document.getElementById("long").innerHTML = position.coords.longitude;
}

function load_dudes() {
    var url = "http://127.0.0.1:8000/api/v1/dude/1/?format=json" ;
    var url = "http://127.0.0.1:8000/api/v1/dude/1/?format=json" ;
    console.log("v1");
    $.getJSON('dudes.json',function(json){
                                console.log("v2");
                                $('#list').html('json.items');});
    //navigate to the new page
    $.mobile.changePage("#dudes");
}

function load_flickr() {
    $('#images').remove('.doggy');
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=puppy&tagmode=any&format=json&jsoncallback=?",
    function(data){
    $.each(data.items, function(i,item){$("<img class='doggy'/>").attr("src", item.media.m).appendTo("#images");
                                        if ( i == 0 ) return false;});});
    //navigate to the new page
    $.mobile.changePage("#popup");
}


