/* add your code here */
const photos = JSON.parse(content);

function outputCard(photoObject){

   let title = photoObject.title;
   let city = photoObject.location.city;
   let country = photoObject.location.country;
   let filename = photoObject.filename;
   let section = `
   <article>
      <img src="images/${filename}" alt="${title}">
      <div class="caption">
         <h2>${title}</h2>
         <p>${city}, ${country}</p>
         <h3>Colors</h3>
   `;

   document.write(section);
   outputColors(photoObject.colors);
   document.write(`</div></article>`);
}

function outputColors(colorArray){
   for(let color of colorArray){
      let colorString = constructColor(color);
      document.write(colorString);
   }
}

function constructColor(colorObject){
   return constructStyle(colorObject);
}

function constructStyle(colorObject){
   let hex = colorObject.hex;
   let name = colorObject.name;
   let luminance = colorObject.luminance;
   let result = `<span style="background-color: ${hex};">${name}</span>`;

   if (luminance < 70){
      result = `<span style="background-color: ${hex}; color: white;">${name}</span>`;
   }

   return result;
}

for (let photo of photos){
   outputCard(photo);
}
