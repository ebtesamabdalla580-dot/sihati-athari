const challenges=[
 {cat:'food',tag:'تغذية',title:'ابني طبقك الصحي',desc:'رتّبي مكونات طبق متوازن ثم برّري اختيارك.',steps:['قسّمي الطبق إلى خضروات وفاكهة، حبوب كاملة، وبروتين.','اختاري مصدر ماء بدل المشروبات المحلّاة.','اشرحي كيف يساعد الاختيار على التركيز أثناء اليوم الدراسي.']},
 {cat:'food',tag:'تغذية',title:'محقق الملصق الغذائي',desc:'قارني بين خيارين اعتمادًا على معلومات الملصق.',steps:['اختاري منتجين متشابهين.','قارني السكر والملح وحجم الحصة.','حددي الخيار الأنسب واذكري سببًا واحدًا.']},
 {cat:'move',tag:'حركة',title:'فاصل حركة آمن',desc:'صمّمي دقيقة حركة تناسب مساحة الصف والجميع.',steps:['اختاري ثلاث حركات آمنة دون أدوات.','ضعي ترتيبًا ومدة لكل حركة.','نفّذيها مع المجموعة دون تنافس.']},
 {cat:'move',tag:'حركة',title:'حركتي خلال يومي',desc:'اكتشفي فرص الحركة الصغيرة داخل الروتين اليومي.',steps:['ارسمي خطًا زمنيًا ليومك.','حددي ثلاث فرص واقعية للحركة.','اختاري فرصة واحدة لتجربتها هذا الأسبوع.']},
 {cat:'mind',tag:'عافية نفسية',title:'دقيقة إعادة التوازن',desc:'تدرّبي على التنفس الهادئ وتسمية الشعور.',steps:['خذي شهيقًا هادئًا ثم زفيرًا أطول.','سمّي شعورك بكلمة دون حكم.','اختاري خطوة آمنة تساعدك الآن.']},
 {cat:'mind',tag:'عافية نفسية',title:'روتين نوم أفضل',desc:'اختاري تغييرًا بسيطًا يدعم الراحة والاستعداد للتعلم.',steps:['راجعي الساعة السابقة للنوم.','حددي عادة واحدة تعيق الراحة.','اكتبي بديلًا واقعيًا وجرّبيه لثلاث ليالٍ.']}
];
const scenarios=[
 {q:'أمامك حصة طويلة وتشعرين بالعطش. ما الاختيار الأفضل؟',a:['انتظار نهاية اليوم','شرب الماء بانتظام'],correct:1,why:'الترطيب المنتظم يدعم التركيز والأداء.'},
 {q:'تشعرين بالضغط قبل مهمة دراسية. ما الخطوة الأنسب؟',a:['تنفس هادئ وتقسيم المهمة','تجاهل الشعور تمامًا'],correct:0,why:'تنظيم التنفس وتقسيم المهمة يساعدان على استعادة التوازن.'},
 {q:'جلستِ مدة طويلة داخل الصف. ماذا تفعلين؟',a:['فاصل حركة آمن قصير','حركة سريعة بين الطاولات دون انتباه'],correct:0,why:'الحركة القصيرة الآمنة تنشّط الجسم وتحافظ على سلامة الجميع.'},
 {q:'تريدين تحسين عادة صحية. ما البداية الأقوى؟',a:['تغيير كل شيء في يوم واحد','اختيار هدف صغير ومتابعته أسبوعيًا'],correct:1,why:'الهدف الصغير القابل للمتابعة أكثر قابلية للاستمرار.'}
];
const panels=document.querySelectorAll('.panel'),hubButtons=document.querySelectorAll('.hub-card');
hubButtons.forEach(btn=>btn.addEventListener('click',()=>{hubButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');panels.forEach(p=>p.classList.toggle('visible',p.id===btn.dataset.panel));document.querySelector('.panel-wrap').scrollIntoView({behavior:'smooth',block:'start'});}));
const grid=document.getElementById('challengeGrid');
function renderChallenges(filter='all'){grid.innerHTML='';challenges.filter(c=>filter==='all'||c.cat===filter).forEach(c=>{const b=document.createElement('button');b.className='challenge';b.innerHTML=`<span class="tag">${c.tag}</span><h3>${c.title}</h3><p>${c.desc}</p>`;b.addEventListener('click',()=>openChallenge(c));grid.appendChild(b);});}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderChallenges(b.dataset.filter);}));
const modal=document.getElementById('modal');function openChallenge(c){document.getElementById('modalContent').innerHTML=`<span class="eyebrow dark">${c.tag}</span><h2>${c.title}</h2><p>${c.desc}</p><ol>${c.steps.map(s=>`<li>${s}</li>`).join('')}</ol>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');}
document.querySelectorAll('[data-close]').forEach(x=>x.addEventListener('click',()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}));
let qIndex=0,score=0,answered=false;const scenario=document.getElementById('scenario'),choices=document.getElementById('choices'),feedback=document.getElementById('feedback'),next=document.getElementById('nextQuestion');
function renderQuestion(){answered=false;const q=scenarios[qIndex];scenario.textContent=q.q;feedback.textContent='';next.hidden=true;choices.innerHTML='';q.a.forEach((a,i)=>{const b=document.createElement('button');b.className='choice';b.textContent=a;b.addEventListener('click',()=>answer(i,b));choices.appendChild(b);});}
function answer(i,b){if(answered)return;answered=true;const q=scenarios[qIndex];document.querySelectorAll('.choice').forEach((x,n)=>x.classList.add(n===q.correct?'correct':n===i?'wrong':''));if(i===q.correct){score++;document.getElementById('score').textContent=score;feedback.textContent='اختيار موفق — '+q.why;}else feedback.textContent='فكري مرة أخرى — '+q.why;next.hidden=false;}
next.addEventListener('click',()=>{qIndex=(qIndex+1)%scenarios.length;renderQuestion();});
let en=false;document.getElementById('langBtn').addEventListener('click',()=>{en=!en;document.documentElement.lang=en?'en':'ar';document.documentElement.dir=en?'ltr':'rtl';document.getElementById('langBtn').textContent=en?'عربي':'EN';document.querySelectorAll('[data-ar][data-en]').forEach(el=>el.innerHTML=en?el.dataset.en:el.dataset.ar);});document.getElementById('printBtn').addEventListener('click',()=>window.print());
renderChallenges();renderQuestion();
