import './index.scss';

export const MrCatFom = () => {

    const carousel = document.querySelector('.carousel');
    const urls = ['https://mrcatstore.myvtex.com/arquivos/catalogo_fom2.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom3.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom4.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom5.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom6.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom7.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom8.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom9.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom10.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom11.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom12.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom13.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom14.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom15.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom16.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom17.jpg',
'https://mrcatstore.myvtex.com/arquivos/catalogo_fom18.jpg']

    function loadImage(url) {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.addEventListener('load', e => resolve(img));
          img.addEventListener('error', () => {
            reject(new Error(`Failed to load image's URL: ${url}`));
          });
          img.src = url;
        });
      }
    
      // load the image, and append it to the element id="image-holder"
      loadImage('http://thecatapi.com/api/images/get?format=src&type=jpg&size=small')
        .then(img => document.getElementById('image-holder').appendChild(img))
        .catch(error => console.error(error));


    $('.carousel').slick({
        lazyLoad: 'ondemand',
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev slick-arrow"></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow"></button>'

    });

    // const url = 'https://media.mrcat.com.br/imagens/MR.%20CAT%20FOM.pdf://mrcatstore.myvtex.com';
    // const loadingTask = pdfjsLib.getDocument(url);

    // loadingTask.promise.then(function(pdf) {
    //     console.log('PDF loaded');
    // })
}