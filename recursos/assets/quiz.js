/* Motor de cuestionarios de los recursos de demostración. Usa window.QUIZ = {items:[{q,code?,o:[],a,f}]} */
(function(){
  var Q = window.QUIZ, root = document.getElementById('quiz');
  if(!Q || !root) return;
  var answered = 0, correct = 0;
  function esc(s){return String(s).replace(/[&<>"]/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m];});}
  function build(){
    answered = 0; correct = 0;
    document.getElementById('qscore').textContent = '';
    root.innerHTML = Q.items.map(function(x,i){
      return '<div class="q" data-i="'+i+'"><p>'+(i+1)+'. '+esc(x.q)+'</p>'+(x.code?'<pre>'+esc(x.code)+'</pre>':'')+
        x.o.map(function(o,j){return '<button class="opt" data-j="'+j+'">'+esc(o)+'</button>';}).join('')+'<div class="fb"></div></div>';
    }).join('');
    Array.prototype.forEach.call(root.querySelectorAll('.q'), function(qe){
      var x = Q.items[+qe.dataset.i];
      Array.prototype.forEach.call(qe.querySelectorAll('.opt'), function(b){
        b.addEventListener('click', function(){
          if(qe.classList.contains('done')) return;
          qe.classList.add('done'); answered++;
          var j = +b.dataset.j;
          Array.prototype.forEach.call(qe.querySelectorAll('.opt'), function(o){ o.disabled = true; if(+o.dataset.j === x.a) o.classList.add('right'); });
          var fb = qe.querySelector('.fb');
          if(j === x.a){ correct++; fb.textContent = '✅ ¡Correcto! ' + x.f; }
          else { b.classList.add('wrong'); fb.textContent = '❌ No es la respuesta. ' + x.f; }
          if(answered === Q.items.length){
            var pct = Math.round(correct/Q.items.length*100);
            document.getElementById('qscore').textContent = 'Resultado: ' + correct + ' / ' + Q.items.length + ' (' + pct + '%)' + (pct>=80?' 🎉 ¡Muy bien!':pct>=50?' · Repasa los puntos fallados.':' · Te recomendamos repasar el tema y volver a intentarlo.');
          }
        });
      });
    });
  }
  var r = document.getElementById('qreset'); if(r) r.addEventListener('click', build);
  build();
})();
