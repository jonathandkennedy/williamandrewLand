/* thank-you.html, 404.html and the review hub.
   Run after build-masters.mjs. */
import fs from 'node:fs';
const P='parts', rd=f=>fs.readFileSync(`${P}/${f}`,'utf8'), J=f=>JSON.parse(rd(f));
const CSS=rd('styles.css'), C=J('config.json'), EN=J('practices.json'), MK=J('markets.json');
const esc=s=>String(s??'').replace(/&(?!(?:amp|lt|gt|quot|#\d+);)/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const ICON='<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.3 2.1z"/></svg>';
const clarity=C.CLARITY_ID?`<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${C.CLARITY_ID}");</script>`:'';
const callrail=C.CALLRAIL_SWAP?`<script src="${C.CALLRAIL_SWAP}"></script>`:'';
const FAV=`<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%23000'/%3E%3Ctext x='32' y='45' font-family='Helvetica,Arial' font-size='38' font-weight='bold' fill='%23e02b1d' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E">`;

const head=(title,extra='')=>`<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#000">
${FAV}${extra}
<style>${CSS}</style></head>`;

const gtm=`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})
(window,document,'script','dataLayer','${C.GTM_ID}');</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${C.ADS_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());gtag('config','${C.ADS_ID}');gtag('config','${C.GA4_ID}');</script>${clarity}${callrail}`;

const mast=`<header class="mast"><div class="wrap">
<div class="mast__n">${esc(C.FIRM_NAME)}<span>${esc(C.FIRM_TAGLINE)}</span></div>
<a class="mast__call" href="tel:${C.INTAKE_PHONE}" data-loc="header">${ICON}<span>${esc(C.INTAKE_DISPLAY)}</span></a>
</div></header>`;

const sticky=`<div class="sticky" role="region" aria-label="Call now"><div class="sticky__r">
<a href="tel:${C.INTAKE_PHONE}" data-loc="sticky">${ICON}<span>${esc(C.INTAKE_DISPLAY)}</span></a></div>
<p>Free. No fee unless we win. A real person answers, 24/7.</p></div>`;

const foot=`<footer class="foot"><div class="wrap">
<p><strong>${esc(C.FIRM_LEGAL)}</strong><br>${esc(C.OFFICE_ADDR)}<br>
<a href="tel:${C.INTAKE_PHONE}" data-loc="footer">${esc(C.INTAKE_DISPLAY)}</a></p>
<p class="fine"><strong>Attorney advertising.</strong> General information, not legal advice. No
attorney-client relationship is created until we both sign a written agreement. Prior results do
not guarantee a similar outcome. Contingency fee: no fee unless there is a recovery.
Responsible attorney: ${esc(C.RESPONSIBLE_ATTORNEY)}, ${esc(C.BAR_STATE)} State Bar no.
${esc(C.BAR_NUMBER)}. Licensed in ${esc(C.BAR_STATE)}.</p>
<nav class="fine"><a href="${esc(C.PRIVACY_URL)}">Privacy policy</a>
<a href="${esc(C.TERMS_URL)}">Terms of use</a>
<a href="${esc(C.DNS_URL)}">Do Not Sell or Share My Personal Information</a></nav>
</div></footer>`;

/* ---------- thank-you ----------------------------------------------------
   The ONLY place lead_form_submit fires, and the lander only lands here on a
   confirmed 2xx — so a conversion in Ads always means a delivered lead. */
fs.writeFileSync('thank-you.html', `${head(`We got it — we're calling you | ${C.FIRM_NAME}`, gtm)}
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${C.GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
${mast}
<main id="main"><section class="hero"><div class="wrap">
<h1 data-ty-h1>Got it. We're calling you.</h1>
<p class="hero__sub" data-ty-sub>A real person answers, and callbacks are usually within 15 minutes.
If you would rather not wait, call now and you will get straight through.</p>
<div class="cta-wrap">
<a class="btn btn--call" href="tel:${C.INTAKE_PHONE}" data-loc="thankyou">${ICON}<span>Call ${esc(C.INTAKE_DISPLAY)}</span></a>
</div>
</div></section>
<section><div class="wrap"><h2 data-ty-h2>While you wait</h2>
<p class="lede" data-ty-lede>Three things that protect your case in the next few hours.</p>
<ol class="steps" data-ty-steps>
<li><h3>Do not give a recorded statement</h3><p>If an adjuster calls — especially the other side's — you can say "I have counsel, please call my attorney." You do not have to explain the crash to them today.</p></li>
<li><h3>Get checked, and say everything that hurts</h3><p>Adrenaline hides injuries for a day or two. What goes in the first medical record matters later, so mention every symptom, not just the worst one.</p></li>
<li><h3>Photograph what you still have</h3><p>Your vehicle, your injuries, the bills, the tow paperwork, the police report number. Send them once we speak — no need to organise anything first.</p></li>
</ol></div></section></main>
${foot}${sticky}
<script>
(function(){
  var q=new URLSearchParams(location.search);
  var dl=window.dataLayer=window.dataLayer||[];
  // The conversion event. Carries case type + market so Ads and GA4 can split
  // performance by campaign without guessing from the URL.
  dl.push({event:'lead_form_submit',geo:q.get('geo')||'',case_type:q.get('ct')||'',
           lang:q.get('lang')||'en',variant:q.get('variant')||''});
  if(q.get('lang')==='es'){
    document.documentElement.lang='es';
    document.title=${JSON.stringify(`Recibido — le vamos a llamar | ${C.FIRM_NAME}`)};
    var S={
      '[data-ty-h1]':'Recibido. Le vamos a llamar.',
      '[data-ty-sub]':'Contesta una persona real, y normalmente le devolvemos la llamada en unos 15 minutos. Si prefiere no esperar, llame ahora y le atendemos de inmediato.',
      '[data-ty-h2]':'Mientras espera',
      '[data-ty-lede]':'Tres cosas que protegen su caso en las próximas horas.'
    };
    for(var k in S){var el=document.querySelector(k);if(el)el.textContent=S[k];}
    var st=[['No dé una declaración grabada','Si le llama un ajustador — sobre todo el del otro lado — puede decirle: «Tengo abogado, por favor hable con él». Usted no está obligado a explicarles el accidente hoy.'],
    ['Vaya al médico y diga todo lo que le duele','La adrenalina esconde las lesiones uno o dos días. Lo que quede en el primer informe médico importa después, así que mencione cada molestia, no solo la peor.'],
    ['Tome fotos de lo que todavía tiene','Su vehículo, sus lesiones, las cuentas, el papeleo de la grúa y el número del reporte policial. Nos los manda cuando hablemos.']];
    document.querySelectorAll('[data-ty-steps] li').forEach(function(li,i){
      if(!st[i])return; li.querySelector('h3').textContent=st[i][0]; li.querySelector('p').textContent=st[i][1];});
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="tel:"]');
    if(a)dl.push({event:'call_click',cta_location:a.getAttribute('data-loc')||'thankyou',geo:q.get('geo')||''});
  },true);
})();
</script>
</body></html>
`);

/* ---------- 404 ----------------------------------------------------------
   Vercel serves this automatically. A mistyped final URL costs the click
   either way; it should not also dead-end the person who made it. */
fs.writeFileSync('404.html', `${head(`Page not found | ${C.FIRM_NAME}`, gtm)}
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${C.GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
${mast}
<main id="main"><section class="hero"><div class="wrap">
<h1>That page has moved.<span style="display:block;color:var(--red-tint)">We are still here.</span></h1>
<p class="hero__sub">If you were hurt in a crash in Utah, the fastest thing you can do right now is call.
Free, confidential, and no fee unless we win.</p>
<div class="cta-wrap">
<a class="btn btn--call" href="tel:${C.INTAKE_PHONE}" data-loc="404">${ICON}<span>Call ${esc(C.INTAKE_DISPLAY)}</span></a>
<p class="cta-note">A real person answers, 24/7.</p>
</div>
</div></section></main>
${foot}${sticky}
<script>
(function(){var dl=window.dataLayer=window.dataLayer||[];
dl.push({event:'lp_404',path:location.pathname});
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="tel:"]');
if(a)dl.push({event:'call_click',cta_location:'404',geo:'404'});},true);})();
</script>
</body></html>
`);

console.log('  thank-you.html + 404.html written');
