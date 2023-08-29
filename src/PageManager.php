<?php

    class PageManager {

        private static $content = null;

        public static function build() {
            include("./src/config.php");
            include("./src/CacheManager.php");
            include("./src/Logger.php");
            if(PageManager::$content == null) {
                Logger::log("Content is null!");
                return;
            }
            CacheManager::setCacheExpiry($CACHE_EXPIRY);
            if(CacheManager::isAvailableCache(PageManager::$content)) {
                echo CacheManager::getCached(PageManager::$content);
                return;
            }
            $structure = PageManager::getPage("structure");
            $content = PageManager::getPage(PageManager::$content);
            $contentTitle = PageManager::readVariable($content, "pageTitle");
            $backgroundImage = PageManager::readVariable($content, "backgroundImage");
            $content = PageManager::hideVariable($content, "pageTitle", $contentTitle);
            $content = PageManager::hideVariable($content, "backgroundImage", $backgroundImage);
            $structure = str_replace("@pageContent", $content, $structure);
            $structure = str_replace("@pageTitle", $contentTitle, $structure);
            $structure = str_replace("@backgroundImage", $backgroundImage, $structure);
            $structure = str_replace("@contentName", PageManager::$content, $structure);
            CacheManager::createCache(PageManager::$content, $structure);
            echo $structure;
        }

        public static function setContent($contentName) {
            PageManager::$content = $contentName;
        }

        public static function getPage($pageName) {
            return file_get_contents("./src/pages/".$pageName.".html");
        }

        public static function readVariable($content, $variableName) {
            $var = "";
            $pos = strpos($content, '@'.$variableName.'="');
            $pos += strlen('@'.$variableName.'="');
            $s = 0;
            while(true) {
                if(substr($content, $pos, 1) == '"') {
                    break;
                }
                if($s == 100) {
                    Logger::log("Variable @".$variableName." is too long!");
                    break;
                }
                $var = $var.substr($content, $pos, 1);
                $pos++;
                $s++;
            }
            return $var;
        }

        public static function hideVariable($content, $variableName, $variable) {
            return str_replace('@'.$variableName.'="'.$variable.'"', "", $content);
        }

    }

?>