(function () {

var ipv4Addr = document.getElementById('ipv4-addr');
var ipv6Addr = document.getElementById('ipv6-addr');
var ipv4Copy = document.getElementById('ipv4-copy');
var ipv6Copy = document.getElementById('ipv6-copy');

function queryAddress (url, input, button) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function () { input.value = xhr.response; };
  xhr.onerror = function () {
    input.value = 'Not Available';
    button.disabled = true;
  };
  xhr.send();
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark');
}

if (ipv4Addr !== null && ipv4Addr.value === '') {
  queryAddress(ipv4Addr.dataset.url, ipv4Addr, ipv4Copy);
}
if (ipv6Addr !== null && ipv6Addr.value === '') {
  queryAddress(ipv6Addr.dataset.url, ipv6Addr, ipv6Copy);
}

if (ipv4Copy !== null) {
  ipv4Copy.addEventListener('click', function () { navigator.clipboard.writeText(ipv4Addr.value); });
}
if (ipv6Copy !== null) {
  ipv6Copy.addEventListener('click', function () { navigator.clipboard.writeText(ipv6Addr.value); });
}

}());
