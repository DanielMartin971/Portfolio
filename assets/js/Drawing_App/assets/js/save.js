var saveButton = document.getElementById('save');

saveButton.addEventListener('click', saveImage);

function saveImage(){
    var data = canvas.toDataURL();
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(requests.readyState == 4 && request.status == 200){
            //do our stuff
            var response = request.responseText;
            document.getElementById('downloadframe').src='../php/download.php?file'+response;
        }
    };
    
    request.open('POST', '../php/save.php', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send('img='+data);
    
}