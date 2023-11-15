(function () {

var copyButton = document.getElementById('copy-ip-address');
copyButton.addEventListener('click', function () { copyAddress('ip-address'); });

function copyAddress (inputId) {
  var input = document.getElementById(inputId);
  navigator.clipboard.writeText(input.value);
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark');
}

}());
