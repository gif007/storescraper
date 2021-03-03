const fetch = require('node-fetch');
const cheerio = require('cheerio');


function getResource(url, params=null) {
  // Return the body of a web page
  if (!params) {
    return fetch(url).then(res=>res.text());
  }
}

function getElement(resource, selector) {
  // Return an element by selector
  return resource.then(data=>{
    let $ = cheerio.load(data);
    let links = $(selector);

    return links;
  })
}

function getContent(url, selector, params=null) {
  // Return some content from an element
  return getElement(getResource(url, params), selector);
}

const all_links = [];

Promise.all([
  getContent('https://eastcoastlifestyle.com/collections/all/', 'a.ProductItem__ImageWrapper')
  .then(arr=>{
    for (let i = 0; i < arr.length; i++) {
      all_links.push('https://eastcoastlifestyle.com' + arr[i]['attribs']['href']);
    }
  }),
  getContent('https://eastcoastlifestyle.com/collections/all?page=2', 'a.ProductItem__ImageWrapper')
.then(arr=>{
for (let i = 0; i < arr.length; i++) {
  all_links.push('https://eastcoastlifestyle.com' + arr[i]['attribs']['href']);
}
}),
getContent('https://eastcoastlifestyle.com/collections/all?page=3', 'a.ProductItem__ImageWrapper')
.then(arr=>{
  for (let i = 0; i < arr.length; i++) {
    all_links.push('https://eastcoastlifestyle.com' + arr[i]['attribs']['href']);
  }
})
])
.then(()=>{
  console.log(all_links.length);
  all_links.forEach(link=>{console.log(link)})
})
