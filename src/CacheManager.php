<?php

    class CacheManager {

        private static $cache_expiry = 600;
        private static $cache_map = array();
        private static $map_loaded = false;

        public static function isAvailableCache($contentName) {
            CacheManager::loadMap();
            if(!array_key_exists($contentName, CacheManager::$cache_map)) {
                return false;
            }
            if(time() > intval(CacheManager::$cache_map[$contentName."Create"]) + CacheManager::$cache_expiry) {
                CacheManager::removeCache($contentName);
                return false;
            }
            return true;
        }

        public static function getCached($contentName) {
            CacheManager::loadMap();
            return file_get_contents("./cache/".CacheManager::$cache_map[$contentName]);
        }

        public static function createCache($contentName, $content) {
            CacheManager::loadMap();
            CacheManager::$cache_map[$contentName] = $contentName.".html";
            CacheManager::$cache_map[$contentName."Create"] = time();
            file_put_contents("./cache/".CacheManager::$cache_map[$contentName], $content);
            file_put_contents("./cache/map.json", json_encode(CacheManager::$cache_map));
        }

        public static function removeCache($contentName) {
            unlink("./cache/".CacheManager::$cache_map[$contentName]);
            CacheManager::$cache_map[$contentName] = null;
            CacheManager::$cache_map[$contentName."Create"] = null;
            file_put_contents("./cache/map.json", json_encode(CacheManager::$cache_map));
        }

        public static function setCacheExpiry($number) {
            CacheManager::$cache_expiry = $number;
        }

        public static function loadMap() {
            if(CacheManager::$map_loaded) {
                return;
            }
            CacheManager::$map_loaded = true;
            CacheManager::$cache_map = json_decode(file_get_contents("./cache/map.json"), true);
        }

    }

?>