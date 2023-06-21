const apiKey = 'd78eaef10f04df16f9f8183b7c605026';

const getWeather = async(city) =>{
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

try {
	const response = await fetch(url)
	if (!response.ok) {
		throw new Error("HTTP error: " + response.status);
	  }
	const result = await response.json();
		return result
	} catch (error) {
		console.log("error found")
		
		return error
	}
}

let searchIconDiv = document.getElementById("searchIcon")
searchIconDiv.onclick = () => {
	let city = document.getElementById("Search").value
	console.log(city)
	getWeather(city).then(data =>{
		sahiChangeHTML(data)
	}).catch(show_alert())
}



window.addEventListener("load", (event) => {
	getWeather('Delhi').then(data =>{
        sahiChangeHTML(data)
	})
});

const sahiChangeHTML = (data) =>{
	console.log(data)
	document.getElementById("city").innerHTML =data.name
	document.getElementById("temp").innerHTML = data.main.temp+'\u00B0'+'C'
	document.getElementById("hum").innerHTML = data.main.humidity+"%"
	document.getElementById("ws").innerHTML = data.wind.speed +" Km/Hrs"
 
     if(data.weather[0].main == "Clouds"){
		document.getElementById("imgid").src = "clouds.png"
	 }else if(data.weather[0].main == "Clear"){
		document.getElementById("imgid").src = "clear.png"
	 }else if(data.weather[0].main == "Rain"){
		document.getElementById("imgid").src = "rain.png"
	 }else if(data.weather[0].main == "Drizzle"){
		document.getElementById("imgid").src = "clear.png"
	 }else if(data.weather[0].main == "Mist"){
		document.getElementById("imgid").src = "clear.png"
	 }

}

function show_alert()
{
    alert("You have entered Invalid City");
	document.getElementById("Search").value = ''
    getWeather('Delhi').then(data =>{
        sahiChangeHTML(data)
	})
	
}