function displayCookie() {
  // getting cookie named ASP.NET_SessionId
  const url = "https://atk-cms.comsats.edu.pk:8090/";
  const name =  "ASP.NET_SessionId";
  chrome.cookies.get({ url: url, name: name }, function(cookie) {
    console.log(cookie);
    document.getElementById("session-id").innerText = cookie.value;
    var qrcode = new QRCode("qr-code", {
      width: 128,
      height: 128,
    });
    qrcode.makeCode(cookie.value);
  });
}

function copyToClipboard() {
  // marking button
  setTimeout(function() {
    document.getElementById("copy-to-clip").classList.add("btn-success");
  }, 1000);

  const text = document.getElementById("session-id").textContent;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Session ID copied to clipboard: ' + text);

  setTimeout(function() {
    document.getElementById("copy-to-clip").classList.remove("btn-success");
  }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    displayCookie();
    document.getElementById("copy-to-clip").onclick = copyToClipboard;
});
