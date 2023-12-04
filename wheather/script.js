console.log("hello")
let lat,lon
let api
var display
const action_lat_lon=document.getElementById('action')
const action_getcurrent=document.getElementById('getCurrent')
let searbycon=document.getElementById('searbycon')







searbycon.addEventListener('click',async()=>{
    searbycon.disabled=true
    const searchBar=await document.getElementById('searchBar').value
    const lovetext=await "i love you"
    if(searchBar.toUpperCase()===lovetext.toUpperCase()){
        searbycon.disabled=true
        let upperdisplay=document.getElementById('tobeHiddle')
        upperdisplay.style.visibility='hidden'
        let apc=await document.getElementById('apc')
        let ttext=await document.createElement('div')
        // searbycon.disabled=false
        apc.appendChild(ttext)
        let displaylove=await document.getElementById('display')
        ttext.innerHTML='<button class="btn btn-lg btn-outline-danger"> <p class="lead display-3">Temperature very HOT Due to girl Tanisha(Tanu aur uski pinky aur uske bade bade dudu bhi hayeee meko sharam aari) khikhi</p> <button class="btn btn-outline-warning mx-auto "id="imgin">Warning:-click me to see that hot and sexy girl with me</button> </button>'
        let imgin=await document.getElementById('imgin')
        let show=await document.getElementById('show')
        // show.style.visibility = 'visible'
        // shwo.removeAttribute('disabled');
        imgin.addEventListener("click",async()=>{
            // img=document.createElement('img')
            show.style.display='block'



        })
        // searbycon.removeAttribute('disabled');

    } else{
        const url = await `https://open-weather13.p.rapidapi.com/city/${searchBar}`;
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3c4da1bf40mshcd59769f0bda824p1e7a08jsn7d4031ede67f',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
            }
        };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        const apidata=await JSON.parse(result)
        const datainf=await apidata.main.temp;
        let datainc= (datainf-32)*5/9
        datainc= datainc.toFixed(2)
        console.log(datainc)
        display=document.getElementById('display')
        display.innerHTML=`<p>${datainc}C</p>`
        searbycon.disabled=false

    
    } catch (error) {
        let ddisplay=document.getElementById('display')
        ddisplay.innerHTML="<p>Cannot find city</p>"
        console.error(error);
        searbycon.disabled=false
    }
}
    })















action_lat_lon.addEventListener("click", async () => {
    // Disable the button to prevent multiple clicks
    action_lat_lon.disabled = true;

    try {
        // Simulate a time-consuming task, e.g., fetching data from an API
        lat=await document.getElementById('lat').value;
        lon=await document.getElementById('lon').value;
        api=`https://api.open-meteo.com/v1/forecast?latitude=${lon}&longitude=${lat}.41&hourly=temperature_2m`
        // api='https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m'

        fetch(api)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('User data:', data.hourly.temperature_2m[0]);
            let text= data.hourly.temperature_2m[0]
                display=document.getElementById('display')
                display.innerHTML=`<p>${text}C</p>`
        })
        .catch(error => {
            let ddisplay=document.getElementById('display')
            ddisplay.innerHTML="<p>Unable to get the coordinates</p>"
            console.error('Fetch error:', error);

        });


        // Re-enable the button when the task is complete
        action.disabled = false;
    } catch (error) {
        console.error("An error occurred:", error);
        // Re-enable the button in case of an error
        action.disabled = false;
    }
});








action_getcurrent.addEventListener("click",async()=>{
    action_getcurrent.disabled=true
    try{
        const watchId=navigator.geolocation.watchPosition(success,err)
        async function success(pos){
            lat=await pos.coords.latitude;
            lon=await pos.coords.longitude;
            lat=parseFloat(lat).toFixed(2)
            lon=parseFloat(lon).toFixed(2)
            console.log(`latitude ${lat} longitude ${lon}`)
            api=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
            // api='https://api.open-meteo.com/v1/forecast?latitude=28&longitude=79&hourly=temperature_2m'
            navigator.geolocation.clearWatch(watchId)

            fetch(api)
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('User data:', data.hourly.temperature_2m[0]);
                let text= data.hourly.temperature_2m[0]
                display=document.getElementById('display')
                display.innerHTML=`<p>${text}C</p>`
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // display.innerHTML="<p>some prblem</p>"
            });
            action_getcurrent.disabled=false
        }
        function err(err){
            if(err.code===1){
                alert("Please allow access to location")
            }else{
                alert("something went wrong")
            }
        }
    }catch(err){
        console.log("err")    
    }
})


