document.getElementById('Input').onkeydown = function(e) {
    if(e.keyCode == 13){
      const Input = document.getElementById('Input').value;
      sessionStorage.setItem('INPUT', Input);
      window.location.href = "./PlayerSearcher.html";
      return;
    }
  };