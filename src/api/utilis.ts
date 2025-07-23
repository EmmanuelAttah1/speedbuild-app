export const getCookie = (cname: string) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const setCookie = (cname: string, cvalue: string, exdays: number, t = "day") => {
    const d = new Date();
    if (t === "day") {
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    } else {
        d.setTime(d.getTime() + (exdays * 60 * 1000));
    }
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const LogOut = () => {
    setCookie("access", "", -1)
    setCookie("refresh", "", -1)
    window.dispatchEvent(new Event("loggedOut"));
}