<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Util
 *
 * @author yaron
 */
namespace GAExamples;

class Util {
	private static $_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
	public static function getRandomString($length = 6) {
        $clen = strlen(self::$_chars) - 1;
        $string = '';
        while ($length--) {
            $string .= self::$_chars[mt_rand(0, $clen)];
        }
        return $string;
    }
}
