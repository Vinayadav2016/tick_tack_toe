const themeButton = document.getElementById('themeButton');
let darkTheme = true;

themeButton.addEventListener('click', () => {
    let root = document.querySelector(':root');
    darkTheme =!darkTheme;
    if(!darkTheme){
        root.style.cssText=`
            --primary-color:  rgb(203, 203, 203);
            --secondary-color: black;
            --tertiary-color: white;;
            --text-primary-color: black;
            --text-secondary-color: white;
            --hovered-color: rgba(0, 0, 0);`;
    }else{
        root.style.cssText=`
            --primary-color:  rgba(0, 0, 0, .9);
            --secondary-color: white;
            --tertiary-color: black;
            --text-primary-color: white;
            --text-secondary-color: black;
            --hovered-color: lightgray;
        `;
    }
});
