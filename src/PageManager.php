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
            $pos = strpos($content, '@pageTitle="');
            $pos += 12;
            $content_title = "";
            $s = 0;
            while(true) {
                if(substr($content, $pos, 1) == '"') {
                    break;
                }
                if($s == 100) {
                    Logger::log("Variable @pageTitle is too long!");
                    break;
                }
                $content_title = $content_title.substr($content, $pos, 1);
                $pos++;
                $s++;
            }
            $content = str_replace('@pageTitle="'.$content_title.'"', "", $content);
            $structure = str_replace("@pageContent", $content, $structure);
            $structure = str_replace("@pageTitle", $content_title, $structure);
            CacheManager::createCache(PageManager::$content, $structure);
            echo $structure;
        }

        public static function setContent($contentName) {
            PageManager::$content = $contentName;
        }

        public static function getPage($pageName) {
            return file_get_contents("./src/pages/".$pageName.".html");
        }

    }

?>