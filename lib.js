/*
 ^ Primary project can be found at: https://github.com/extramaster/Age-Restriction-Bypass-YouTube
 ^
 * The MIT License (MIT)
 * 
 *     Copyright (c) 2015 extramaster, 
 * 
 *     Permission is hereby granted, free of charge, to any person obtaining a copy
 *     of this software and associated documentation files (the "Software"), to deal
 *     in the Software without restriction, including without limitation the rights
 *     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *     copies of the Software, and to permit persons to whom the Software is
 *     furnished to do so, subject to the following conditions:
 * 
 *     The above copyright notice and this permission notice shall be included in
 *     all copies or substantial portions of the Software.
 * 
 *     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *     AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *     THE SOFTWARE.
 */
/**
 * Inline version
 */
(function() {

    // Use strict to ensure code quality.
    'use strict';

    // Check to see if the video has been age restricted. (If it isn't, then what's the point?).
    if (document.getElementsByClassName('age-restricted').length >= 1 || (document.querySelector('#unavailable-submessage') && document.querySelector('#unavailable-submessage').innerText.search('age-restricted') !== -1 || document.querySelector('#unavailable-submessage').innerText.search('age restricted') !== -1) || document.querySelector('#unavailable-submessage') && document.querySelector('#unavailable-submessage').innerText.search('inappropriate') !== -1) {

        // Get the video id from the current YouTube URL.
        var QueryString = function() {
            var query_string = {};
            var query = window.location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (typeof query_string[pair[0]] === 'undefined') {
                    query_string[pair[0]] = pair[1];
                } else if (typeof query_string[pair[0]] === 'string') {
                    var arr = [
                        query_string[pair[0]],
                        pair[1]
                    ];
                    query_string[pair[0]] = arr;
                } else {
                    query_string[pair[0]].push(pair[1]);
                }
            }
            return query_string;
        }();

        // The first phase is to partially remove and hide the original player (as it won't serve much use whilst the YouTube video is blocked).
        try {

            // As you can see here, the following code hides and blocks the original video player from showing up.
            document.querySelector('#theater-background').style.display = 'none';
            var cs = document.querySelector('#player-unavailable').childNodes;
            for (var i = 0; i < cs.length; i++) {
                if (cs[i].style) {
                    cs[i].style.display = 'none';
                    cs[i].style.visibility = 'hidden';
                }
            }
            document.querySelector('#player-unavailable').style.background = 'black';
            document.querySelector('#player').style.display = 'none';
            document.querySelector('#content').style.maxWidth = '100vw';
            document.querySelector('div#watch7-sidebar-contents').style.display = 'none';
        } catch (e) {}

        // The following step is to inject an iFrame/Embedded version of the video player. This is the actual "bypass".
        document.querySelector('#placeholder-player').innerHTML = '<iframe src="' + window.location.toString().split('/')[0] + '//www.youtube.com/embed/' + QueryString.v + '?version=3&autoplay=1&showinfo=0" class="player-width player-height watch-content player-api" id="bypassagerestrict"></iframe>';

        // Some custom styling is applied to make the bypass as seamless as possible. This is where this extension really does the legwork.
        var customStyles = document.createElement('style');
        customStyles.appendChild(document.createTextNode('#watch7-content,#bypassagerestrict{position:relative;left: 2vw;width: 96vw;padding: 0px;border: 0px;margin: 0px;}'));
        document.documentElement.appendChild(customStyles);

        // The video block message is removed, and helpfully replaced with a message from this extension, as a barebones disclaimer.
        try {
            document.querySelector('.metadata-info').innerHTML = document.querySelector('.metadata-info').innerHTML.replace('This video has been age-restricted based on our <a href="/t/community_guidelines">Community Guidelines</a>', '<p><a href="https://chrome.google.com/webstore/detail/age-restriction-bypass-fo/idcgcddddikdniemhklllnbillohblpn/reviews">Hey! It works! Don\'t be afraid to say hi!</a></p><br>Note! This video has had Youtube Age Restriction Bypass automatically bypass the age restriction.<br>If you find the bypassed content disturbing then you can disable or remove the extension to keep it restricted.');
        } catch (e) {}
        try {
            var allExtendedMetadata = document.querySelectorAll('a.yt-uix-sessionlink');
            for (i = 0; i < allExtendedMetadata.length; i++) {
                if (allExtendedMetadata[i].innerHTML.indexOf('Age-restricted video (requested by uploader).') != -1) {
                    var newRefer = document.createElement('div');
                    newRefer.innerHTML = '<p><a href="https://chrome.google.com/webstore/detail/age-restriction-bypass-fo/idcgcddddikdniemhklllnbillohblpn/reviews">Hey! It works! Don\'t be afraid to say hi</a></p><br>';
                    allExtendedMetadata[i].parentNode.insertBefore(newRefer, allExtendedMetadata[i])
                }
                allExtendedMetadata[i].innerHTML = allExtendedMetadata[i].innerHTML.replace('Age-restricted video (requested by uploader).', 'Note! This video has had Youtube Age Restriction Bypass automatically bypass the age restriction.<br>If you find the bypassed content disturbing then you can disable or remove the extension to keep it restricted.<a>');
            }
        } catch (e) {}
    }
}());