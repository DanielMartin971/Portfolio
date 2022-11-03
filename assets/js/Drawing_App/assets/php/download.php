<?php
//got file
$file = $_GET['file'];
//told php it's a png
header('Content-type: image/png');
//told php it's an attachment
header("Content-disposition: attachment; filename=canvasoutput.png");
//spit out file
readfile($file);

?>