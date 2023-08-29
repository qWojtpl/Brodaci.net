<?php

    include("./src/PageManager.php");

    $content = "index";

    if(isset($_GET["c"])) {
        $content = $_GET["c"];
    }

    PageManager::setContent($content);
    PageManager::build();

?>