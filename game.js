const W=600,H=900,app=new PIXI.Application();await app.init({width:W,height:H,background:'#f4cf8f',antialias:true,resolution:devicePixelRatio});document.querySelector('#game').appendChild(app.canvas);
const C=PIXI.Container,G=PIXI.Graphics,T=PIXI.Text,add=(p,c)=>(p.addChild(c),c),style=(n,c='#fff5d2')=>({fontFamily:'Fredoka',fontWeight:'700',fontSize:n,fill:c,stroke:{color:'#54271c',width:Math.max(2,n/10)},align:'center'});
function box(x,y,w,h,c,r=0,p=app.stage){let g=new G();g.roundRect(x,y,w,h,r).fill(c);add(p,g);return g}function dot(x,y,r,c,p=app.stage){let g=new G();g.circle(x,y,r).fill(c);add(p,g);return g}function txt(s,x,y,n=17,p=app.stage,c='#fff5d2'){let t=new T({text:s,style:style(n,c)});t.anchor.set(.5);t.position.set(x,y);add(p,t);return t}
// Warm top-down restaurant room.
box(0,0,W,H,'#160d1d');box(0,0,W,90,'#3a1246');box(14,14,W-28,62,'#b51ebf',14);txt('CHICKEN SHOARMA TYCOON',300,45,26,app.stage,'#38ee95');box(13,104,W-26,590,'#2a1736',15);for(let y=112;y<690;y+=27)for(let x=20+(y/27%2)*18;x<W;x+=58){let l=new G();l.moveTo(x,y).lineTo(x+43,y).stroke({color:'#553060',width:2});app.stage.addChild(l)}
// Door: all customers use this entrance and exit.
box(470,105,104,26,'#2a1037',3);box(480,118,84,55,'#07090e',4);box(494,126,55,10,'#38ee95',2);txt('DEUR',522,187,14,app.stage,'#38ee95');
function grill(x,y){box(x+9,y+18,166,100,'#0a0a10',12);box(x,y,160,94,'#7a257c',10);box(x+12,y+14,135,55,'#11121a',5);for(let i=0;i<4;i++)for(let j=0;j<2;j++)dot(x+33+i*32,y+31+j*20,10,'#45214e');box(x+6,y+76,149,14,'#36df8e',3);txt('GRILL',x+80,y+107,14,app.stage,'#e0ffec')}grill(43,150);
// Cash register and distinct interaction circles.
box(265,178,151,91,'#090a0f',11);box(256,160,151,92,'#6f287b',10);box(270,174,93,30,'#111620',5);box(277,181,78,14,'#38ee95',3);box(367,183,35,35,'#be21c7',5);txt('KASSA',331,236,16,app.stage,'#dfffea');
function ring(x,y,label){let g=new G();g.circle(x,y,40).stroke({color:'#38ee95',width:5});g.circle(x,y,34).stroke({color:'#d833d8',width:2});add(app.stage,g);txt(label,x,y+55,13,app.stage,'#dfffea');return{x,y}}
const grillSpot=ring(145,300,'PAK SHOARMA'),cashSpot=ring(331,307,'ZET AF'),moneySpot=ring(438,307,'PAK GELD');
// Tables.
const tables=[];function table(x,y,n){box(x+6,y+10,118,68,'#090b11',8);box(x,y,118,60,'#a924ad',7);box(x+10,y+8,98,39,'#2fe393',4);txt(`TAFEL ${n}`,x+59,y+28,13,app.stage,'#171022');let lock=n>2?txt('🔒',x+59,y+30,25,app.stage):null;tables.push({x:x+59,y:y+29,occupied:false,open:n<3,lock})}table(69,445,1);table(244,445,2);table(420,445,3);table(157,565,4);table(365,565,5);
function wrap(x,y,p=app.stage){box(x-12,y-5,24,15,'#edbf78',5,p);dot(x,y-7,10,'#7d432b',p);dot(x-5,y-8,2,'#d96835',p);dot(x+5,y-8,2,'#d96835',p)}
// Original, generic top-down restaurant worker (red cap and uniform).
// A potato mascot: lopsided body, purple eyes and a goofy toothy mouth.
const hero=new C();hero.position.set(190,670);hero.scale.set(1.25);add(app.stage,hero);
let potato=new G();potato.moveTo(-7,-57).bezierCurveTo(34,-45,42,-4,29,38).bezierCurveTo(18,64,-22,57,-31,27).bezierCurveTo(-43,-7,-28,-43,-7,-57).closePath().fill('#a85e4d').stroke({color:'#422235',width:5});hero.addChild(potato);
// little potato speckles
for(const [x,y] of [[-13,-24],[13,-37],[23,4],[-21,13],[1,39],[-6,-5]])dot(x,y,2,'#714039',hero);
for(const [x,y] of [[-12,-15],[15,-18]]){dot(x,y,14,'#8edcff',hero);dot(x+2,y+1,7,'#743a9f',hero);dot(x+4,y,3,'#1c1528',hero);dot(x-4,y-4,3,'#fff',hero)}
let mouth=new G();mouth.ellipse(1,19,21,14).fill('#3bd1f1').stroke({color:'#263c61',width:3});hero.addChild(mouth);for(const [x,y,r] of [[-8,17,7],[3,20,8],[12,14,6]])dot(x,y,r,'#f8f6df',hero);
const helpers=[];function makeHelper(n){const h=new C();h.position.set(92+n*36,270);h.route=0;dot(0,-12,14,'#86e9c8',h);box(-14,1,28,25,'#c322c5',6,h);dot(-10,31,5,'#86e9c8',h);dot(10,31,5,'#86e9c8',h);txt('HULP',0,45,10,h,'#38ee95');add(app.stage,h);helpers.push(h);return h}
function customer(x,y,scale=.9){let c=new C();c.position.set(x,y);c.scale.set(scale);dot(0,-15,20,'#f0cbaa',c);dot(0,-38,17,'#fff1d3',c);dot(6,-38,3,'#28140d',c);let b=new G();b.poly([-5,-34,-23,-26,-5,-20]).fill('#38ee95');c.addChild(b);dot(-9,-54,5,'#d833d8',c);dot(3,-60,5,'#d833d8',c);dot(14,-54,5,'#d833d8',c);box(-19,1,38,26,'#171b22',7,c);txt('ABRAHAM',0,-73,13,c);c.mode='enter';c.table=null;c.eat=0;add(app.stage,c);return c}
const people=[];for(let i=0;i<6;i++)people.push(customer(570+i*18,660,.8));txt('RIJ VAN ABRAHAMS',300,710,16,app.stage,'#38ee95');
box(18,102,190,42,'#fff5dc',12);const counter=txt('€ 0',145,123,24,app.stage,'#592719');txt('KASSA',66,123,13,app.stage,'#db442c');const cashLabel=txt('€ 0',438,278,17,app.stage,'#4c9d31');const carryLabel=txt('🥙 0 / 3',190,397,16,app.stage,'#fff6d0');let stock=0,held=0,money=0,bank=0,capacity=3,walkSpeed=3.3,employees=0,lastAction=0,lastHelper=0,started=false,keys=new Set();
// Upgrade shelf: this is the idle-tycoon progression loop.
box(0,744,W,156,'#090a11');txt('UPGRADES',300,765,18,app.stage,'#38ee95');
function upgrade(x,title,detail,fn){const c=new C();c.eventMode='static';c.cursor='pointer';box(x,783,136,92,'#4d175b',12,c);box(x+5,788,126,82,'#bc27c0',9,c);txt(title,x+68,808,14,c);const price=txt(detail,x+68,842,13,c);c.on('pointertap',e=>{e.stopPropagation();fn(price)});add(app.stage,c)}
upgrade(16,'🥙 STAPEL','€ 134',p=>{const cost=Number(p.text.replace(/\D/g,''));if(bank<cost)return instruction('Te weinig geld voor een grotere stapel.');bank-=cost;capacity+=2;p.text=`€ ${cost+134}`;counter.text=`€ ${bank}`;carryLabel.text=`🥙 ${held} / ${capacity}`;instruction('Je kunt nu meer shoarma tegelijk dragen!')});
upgrade(160,'⚡ SNELLER','€ 201',p=>{const cost=Number(p.text.replace(/\D/g,''));if(bank<cost)return instruction('Te weinig geld voor snelheid.');bank-=cost;walkSpeed+=.7;p.text=`€ ${cost+201}`;counter.text=`€ ${bank}`;instruction('Je loopt sneller!')});
upgrade(304,'🪑 TAFEL','€ 201',p=>{const cost=Number(p.text.replace(/\D/g,''));const t=tables.find(t=>!t.open);if(!t)return instruction('Alle tafels zijn al geopend!');if(bank<cost)return instruction('Te weinig geld voor een tafel.');bank-=cost;t.open=true;if(t.lock)t.lock.visible=false;p.text=`€ ${cost+201}`;counter.text=`€ ${bank}`;instruction('Nieuwe tafel geopend!')});
upgrade(448,'🤖 HULP','€ 402',p=>{const cost=Number(p.text.replace(/\D/g,''));if(bank<cost)return instruction('Te weinig geld voor een medewerker.');bank-=cost;employees++;p.text=`€ ${cost+402}`;counter.text=`€ ${bank}`;makeHelper(employees);instruction('Medewerker gekocht: die brengt shoarma naar de kassa!')});
addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();keys.add(e.key)}});addEventListener('keyup',e=>keys.delete(e.key));
const near=(a,b,d=48)=>Math.hypot(a.x-b.x,a.y-b.y)<d;function instruction(t){document.querySelector('#instructions').innerHTML=t}
function action(){
 if(near(hero,grillSpot)){held=Math.min(capacity,held+1);carryLabel.text=`🥙 ${held} / ${capacity}`;instruction(`Je hebt <b>${held}</b> shoarma. Ga naar de kassacirkel.`);return}
 if(near(hero,cashSpot)&&held){held--;stock++;carryLabel.text=`🥙 ${held} / ${capacity}`;instruction(`Broodje bij de kassa gezet: <b>${stock}</b>. Abraham haalt het zelf op.`);return}
 if(near(hero,moneySpot)&&money){bank+=money;counter.text=`€ ${bank}`;instruction(`€${money} opgehaald bij de kassa! Koop upgrades onderaan.`);money=0;cashLabel.text='€ 0';return}
}
addEventListener('keydown',e=>{if(e.key===' '){e.preventDefault();action()}});app.stage.eventMode='static';app.stage.on('pointertap',action);
function go(c,x,y,next){c.target={x,y};c.next=next;c.mode='walk'}function openTable(){return tables.find(t=>t.open&&!t.occupied)}
setInterval(()=>{if(people.filter(p=>p.mode!=='gone').length<8)people.push(customer(630,660,.8))},1900);
// Start screen: a friendly elephant is the only start button.
const startScreen=new C();startScreen.eventMode='static';startScreen.cursor='pointer';add(app.stage,startScreen);box(0,0,W,H,'#160d1d',0,startScreen);box(25,120,W-50,620,'#31133f',30,startScreen);txt('CHICKEN',300,213,49,startScreen,'#38ee95');txt('SHOARMA TYCOON',300,270,36,startScreen,'#df39dc');txt('BEGIN JE SHOARMA-IMPERIUM',300,320,17,startScreen,'#fff5d2');
// Purple, round, text-free play button.
dot(300,480,78,'#150d21',startScreen);dot(300,472,72,'#a51abc',startScreen);dot(300,468,62,'#cf35df',startScreen);let playIcon=new G();playIcon.poly([[282,437],[282,499],[336,468]]).fill('#f7f2ff');startScreen.addChild(playIcon);txt('KLIK OM TE STARTEN',300,580,16,startScreen,'#dfffea');
function playMusic(){if(document.querySelector('#music-player iframe'))return;const f=document.createElement('iframe');f.width='320';f.height='180';f.src='https://www.youtube.com/embed/J3l48QQ7y4A?autoplay=1&controls=0&loop=1&playlist=J3l48QQ7y4A&playsinline=1';f.allow='autoplay; encrypted-media';f.title='I\'m a Pancake achtergrondmuziek';document.querySelector('#music-player').appendChild(f)}
startScreen.on('pointertap',e=>{e.stopPropagation();playMusic();started=true;startScreen.visible=false;instruction('Loop naar de cirkels: grill → zet af → pak geld. Koop hulpjes wanneer je genoeg hebt!')});
app.ticker.add(()=>{if(!started)return;const now=app.ticker.lastTime;if(now-lastAction>260&&(near(hero,grillSpot)||near(hero,cashSpot)||near(hero,moneySpot))){action();lastAction=now}if(employees&&now-lastHelper>800){stock=Math.min(12,stock+employees);lastHelper=now}for(const h of helpers){const stops=[grillSpot,cashSpot],target=stops[h.route];const dx=target.x-h.x,dy=target.y-h.y;h.x+=Math.sign(dx)*Math.min(1.55,Math.abs(dx));h.y+=Math.sign(dy)*Math.min(1.55,Math.abs(dy));if(Math.abs(dx)+Math.abs(dy)<3)h.route=(h.route+1)%stops.length}let dx=(keys.has('ArrowRight')?1:0)-(keys.has('ArrowLeft')?1:0),dy=(keys.has('ArrowDown')?1:0)-(keys.has('ArrowUp')?1:0);hero.x=Math.max(28,Math.min(W-28,hero.x+dx*walkSpeed));hero.y=Math.max(130,Math.min(H-28,hero.y+dy*walkSpeed));if(dx||dy)hero.rotation=Math.sin(app.ticker.lastTime/65)*.07;
 for(const c of people){
  if(c.mode==='enter'){const q=people.filter(p=>p.mode==='queue'||p.mode==='enter');const i=q.indexOf(c);go(c,510-i*60,660,'queue')}
  if(c.mode==='queue'){const q=people.filter(p=>p.mode==='queue');const i=q.indexOf(c),tx=510-i*60;c.x+=(tx-c.x)*.08;c.y+=(660-c.y)*.08;if(i===0&&stock>0){stock--;go(c,cashSpot.x,cashSpot.y,'getfood')}}
  if(c.mode==='walk'){let dx=c.target.x-c.x,dy=c.target.y-c.y;c.x+=Math.sign(dx)*Math.min(1.7,Math.abs(dx));c.y+=Math.sign(dy)*Math.min(1.7,Math.abs(dy));if(Math.abs(dx)+Math.abs(dy)<4){if(c.next==='getfood'){wrap(c.x,c.y-45,c);let t=openTable();if(t){t.occupied=true;c.table=t;go(c,t.x,t.y,'eat')}}else if(c.next==='exit'){c.mode='gone';c.visible=false}else c.mode=c.next}}
  if(c.mode==='eat'){c.eat++;c.scale.set(.72+Math.min(.35,c.eat/200*.35));if(c.eat>180){c.table.occupied=false;money+=67;cashLabel.text=`€ ${money}`;go(c,522,160,'exit')}}
 }
});
