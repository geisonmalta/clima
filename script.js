document.querySelector('.busca').addEventListener('submit', async (event)=>{
   event.preventDefault(); // previne o comportamento padrão que o formulário deveria ter. Então vai evitar do submit atualizar a página

   let input = document.querySelector('#searchInput').value; //pegar o que o usuário digitou

   if(input !== '') { // condição para saber se o usuário realmente digitou algo
         clearInfo();
         showWarning('Carregando...');//load

         let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=aa53d610625ebdfa44b43a800f8baa0c&units=metric&lang=pt_br`;

         let results = await fetch(url);
         let json = await results.json();

         if(json.cod === 200){
            showInfo({
               name: json.name,
               country: json.sys.country,
               temp: json.main.temp,
               tempIcon: json.weather[0].icon,
               windSpeed: json.wind.speed,
               windAngle: json.wind.deg
            });
         }else {
               clearInfo();
               showWarning('Não encontramos esta localização.');
         }
   } else {
      clearInfo();
   }
});


function showInfo(json){
   showWarning('');

   document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
   document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
   document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

   document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

   document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

   document.querySelector('.resultado').style.display = 'block';
}


function clearInfo(){
   showWarning('');
   document.querySelector('.resultado').style.display = 'none';
}
function showWarning(msg) { // função para exibir na tela um load
   document.querySelector('.aviso').innerHTML = msg;
}