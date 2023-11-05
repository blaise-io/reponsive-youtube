/* jshint esversion: 6, globalstrict: true, browser: true */
"use strict";

setWideCookie();
inflatePlayer();
switchToTheaterMode();


function setWideCookie() {
    if (-1 === document.cookie.indexOf('wide=1')) {
        document.cookie = 'wide=1; path=/; max-age=' + 3600 * 24 * 365;
    }
}


function inflatePlayer(tries=0) {
    const content = document.querySelector('#content');
    if (!content && tries < 50) {
        setTimeout(() => inflatePlayer(++tries), 20);
        return;
    }

    const contentOffsetTop = content ? content.offsetTop : 56;

    const biggerPlayerCSS = `
        ytd-watch-flexy[full-bleed-player] #full-bleed-container.ytd-watch-flexy {
            heigth: calc(100vh - ${contentOffsetTop}px) !important;
            max-height: calc(100vh - ${contentOffsetTop}px) !important;
        }
    `;

    // document.querySelector("#full-bleed-container").style = "height:100%;max-height:100%"

    const style = document.createElement('style');
    style.id = 'extension-responsiveyoutube';
    style.textContent = biggerPlayerCSS;
    document.body.appendChild(style);

    // Ensure YouTube fills up the new player area.
    window.dispatchEvent(new Event('resize'));
}


// Click the cinema mode button when not in cinema mode.
function switchToTheaterMode(tries=0) {
    const button = document.querySelector('.ytp-size-button');
    if (!document.querySelector('ytd-watch-flexy[full-bleed-player] #full-bleed-container')) {
        if (button) {
            button.click();
        }
        if (tries < 50) {
            setTimeout(() => switchToTheaterMode(++tries), 20);
        }
    }
}
