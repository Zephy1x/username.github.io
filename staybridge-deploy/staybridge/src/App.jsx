import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FontLoader = () => {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
};

const N = "#0f2d52", G = "#c9a84c", W = "#fff", BG = "#f4f6f9", BR = "#e5e7eb";
const TX = "#111827", MT = "#6b7280", GR = "#059669", RD = "#ef4444";
const f = "'DM Sans',sans-serif", fH = "'Playfair Display',serif";

const s = {
  inp: { width:"100%", border:`1px solid ${BR}`, borderRadius:8, padding:"10px 12px", fontSize:13, fontFamily:f, outline:"none", color:TX, boxSizing:"border-box", background:W },
  lbl: { fontSize:10, fontWeight:600, color:"#374151", display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:".5px" },
  card: { background:W, borderRadius:12, border:`1px solid ${BR}` },
  navBtn: (on) => ({ background:on?N:"none", color:on?W:MT, border:on?"none":`1px solid ${BR}`, padding:"6px 13px", borderRadius:7, fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:f, display:"flex", alignItems:"center", gap:4, whiteSpace:"nowrap", transition:"all .2s" }),
  tabBtn: (on) => ({ flex:1, background:"none", border:"none", borderBottom:on?`2px solid ${N}`:"2px solid transparent", color:on?N:MT, padding:"11px 6px", fontSize:12, fontWeight:on?600:500, cursor:"pointer", fontFamily:f }),
  primary: { background:N, color:W, border:"none", borderRadius:8, padding:"10px 22px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:f, transition:"background .2s" },
  outline: { background:"none", border:`1px solid ${BR}`, color:"#374151", borderRadius:8, padding:"10px 20px", fontSize:13, cursor:"pointer", fontFamily:f },
  gold: { background:G, color:N, border:"none", borderRadius:8, padding:"10px 22px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:f },
};

const HOTELS = [
  { id:1, n:"Burj Al Arab Jumeirah", l:"Jumeirah Beach Road", p:850, r:"9.8", rv:"2,841", tags:["WiFi","Pool","Spa"], badge:"FEATURED", bc:G, bt:N, note:"Only 3 rooms left", nc:RD, g:"135deg,#0f2d52,#1e5f74,#2a5f80", ini:"BURJ", mx:"12%", my:"22%", freeCx:true },
  { id:2, n:"Atlantis The Palm", l:"Palm Jumeirah", p:480, r:"9.4", rv:"4,102", tags:["Water Park","Beach","Dining"], badge:"BEST VALUE", bc:GR, bt:W, note:"Breakfast included", nc:"#374151", g:"135deg,#1a3a20,#2a7040", ini:"ATL", mx:"65%", my:"38%" },
  { id:3, n:"JW Marriott Marquis", l:"Business Bay", p:390, r:"9.0", rv:"3,210", tags:["Business Ctr","Gym","Pool"], badge:"", bc:"", bt:"", note:"Pay at hotel", nc:MT, g:"135deg,#1a0a30,#3a1a60", ini:"JW", mx:"40%", my:"55%" },
  { id:4, n:"Rove Downtown Dubai", l:"Downtown Dubai", p:120, r:"8.7", rv:"5,640", tags:["WiFi","Free cancel"], badge:"BUDGET", bc:"#1d4ed8", bt:W, note:"Great location", nc:GR, g:"135deg,#1a0a08,#3a1a10", ini:"ROV", mx:"55%", my:"65%" },
  { id:5, n:"Sofitel Dubai The Palm", l:"Palm Jumeirah", p:280, r:"9.1", rv:"1,876", tags:["Beach","WiFi","Pool"], badge:"", bc:"", bt:"", note:"Free cancellation", nc:GR, g:"135deg,#0a1a10,#1a4a2a", ini:"SFT", mx:"75%", my:"28%" },
  { id:6, n:"Four Seasons DIFC", l:"DIFC, Dubai", p:620, r:"9.5", rv:"1,204", tags:["Rooftop Pool","Spa","Bar"], badge:"TOP RATED", bc:G, bt:N, note:"Only 2 rooms left", nc:RD, g:"135deg,#0a0a20,#1a1a40", ini:"FS", mx:"28%", my:"70%" },
  { id:7, n:"Waldorf Astoria Dubai", l:"Palm Jumeirah", p:540, r:"9.3", rv:"2,017", tags:["Private Beach","Spa"], badge:"", bc:"", bt:"", note:"Breakfast available", nc:"#374151", g:"135deg,#1f1000,#4a2a00", ini:"WA", mx:"60%", my:"18%" },
  { id:8, n:"Address Boulevard", l:"Downtown Dubai", p:460, r:"9.2", rv:"3,388", tags:["Burj View","Pool","Gym"], badge:"", bc:"", bt:"", note:"Pay at hotel", nc:MT, g:"135deg,#080820,#18184a", ini:"AB", mx:"45%", my:"80%" },
  { id:9, n:"Armani Hotel Dubai", l:"Burj Khalifa", p:750, r:"9.6", rv:"987", tags:["Burj Khalifa","Spa"], badge:"EXCLUSIVE", bc:"#374151", bt:W, note:"Only 1 suite left", nc:RD, g:"135deg,#0a0808,#1e1818", ini:"ARM", mx:"20%", my:"58%" },
  { id:10, n:"Jumeirah Al Naseem", l:"Madinat Jumeirah", p:340, r:"9.0", rv:"2,541", tags:["Beach","Waterpark"], badge:"", bc:"", bt:"", note:"Free cancellation", nc:GR, g:"135deg,#001a10,#003a28", ini:"JAN", mx:"82%", my:"48%" },
  { id:11, n:"Palace Downtown Dubai", l:"Downtown Dubai", p:410, r:"9.1", rv:"1,760", tags:["Lake View","Pool"], badge:"", bc:"", bt:"", note:"Breakfast included", nc:"#374151", g:"135deg,#0f0828,#221048", ini:"PAL", mx:"35%", my:"42%" },
  { id:12, n:"Vida Downtown Dubai", l:"Downtown Dubai", p:220, r:"8.9", rv:"2,100", tags:["Rooftop Pool","Bar"], badge:"DEAL", bc:GR, bt:W, note:"Free cancellation", nc:GR, g:"135deg,#050a18,#0f1e40", ini:"VDA", mx:"50%", my:"32%" },
];

const FAQS = [
  { q:"How do I make a reservation?", a:"Search your destination, pick dates and guests, browse hotels, click View Deal, choose a room, fill in your details and pay. A confirmation email with your booking reference arrives instantly." },
  { q:"Is my payment secure?", a:"Yes — all payments are 256-bit SSL encrypted. We never store full card details. Payments are processed through a PCI DSS Level 1 certified gateway." },
  { q:"Can I cancel or modify my booking?", a:"Most bookings offer free cancellation up to a date shown at checkout. Go to My Account → Bookings → Manage to cancel or request changes." },
  { q:"How do I list my hotel on StayBridge?", a:"Click 'List Hotel' in the nav, complete the 3-step form. Listings go live within 24 hours after review. No upfront fees — just a 12% commission per booking." },
  { q:"When do hotel owners get paid?", a:"Payouts are processed monthly via bank transfer. Track earnings in the Owner Dashboard under the Earnings tab." },
  { q:"What is Gold membership?", a:"Earned after your 5th completed stay. Benefits include priority support, early deal access, 500 bonus points, and 10% extra points per booking." },
  { q:"How do I contact a hotel before booking?", a:"On any hotel detail page, click Message Hotel. Messages go directly to the hotel team — average response time under 2 hours." },
  { q:"Are prices per room or per person?", a:"All prices are per room per night, taxes included. No hidden charges. The full total is always shown before you confirm payment." },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_IN = [31,28,31,30,31,30,31,31,30,31,30,31];
const fmtShort = (d) => d ? `${MONTHS[d.month].slice(0,3)} ${d.day}` : "—";
const fmtFull = (d) => d ? `${MONTHS[d.month].slice(0,3)} ${d.day}, ${d.year}` : "—";
const daysInMonth = (m, y) => m === 1 && y % 4 === 0 ? 29 : DAYS_IN[m];

function Modal({ open, onClose, children, maxW = 440 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:300, display:"flex", justifyContent:"center", paddingTop:60, alignItems:"flex-start", overflowY:"auto" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:W, borderRadius:14, padding:26, width:"90%", maxWidth:maxW, maxHeight:"85vh", overflowY:"auto", position:"relative", margin:"0 auto 40px" }}>
        <button onClick={onClose} style={{ position:"absolute", top:12, right:14, background:"none", border:"none", fontSize:22, cursor:"pointer", color:MT }}>×</button>
        {children}
      </div>
    </div>
  );
}

function CalendarModal({ open, onClose, onApply }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(6);
  const [ci, setCi] = useState(null);
  const [co, setCo] = useState(null);
  const [mode, setMode] = useState("checkin");
  const prevM = () => { if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); };
  const nextM = () => { if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1); };
  const click = (d) => {
    const obj={year,month,day:d};
    if(mode==="checkin"){setCi(obj);setMode("checkout");}else{setCo(obj);}
  };
  const inR = (d) => { if(!ci||!co)return false; const dd=new Date(year,month,d); return dd>new Date(ci.year,ci.month,ci.day)&&dd<new Date(co.year,co.month,co.day); };
  const isSel = (d) => (ci&&ci.year===year&&ci.month===month&&ci.day===d)||(co&&co.year===year&&co.month===month&&co.day===d);
  const isPast = (d) => new Date(year,month,d)<new Date(new Date().toDateString());
  const first = new Date(year,month,1).getDay();
  const days = daysInMonth(month,year);
  return (
    <Modal open={open} onClose={onClose} maxW={340}>
      <div style={{fontFamily:f}}>
        <div style={{fontSize:14,fontWeight:600,color:N,marginBottom:3}}>{mode==="checkin"?"Select Check-in":"Select Check-out"}</div>
        <div style={{fontSize:11,color:MT,marginBottom:14}}>{mode==="checkin"?"Click to set check-in date":"Now click your check-out date"}</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <button onClick={prevM} style={{...s.outline,padding:"5px 10px",fontSize:16}}>‹</button>
          <span style={{fontSize:13,fontWeight:600,color:TX}}>{MONTHS[month]} {year}</span>
          <button onClick={nextM} style={{...s.outline,padding:"5px 10px",fontSize:16}}>›</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:6}}>
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=><div key={d} style={{textAlign:"center",fontSize:10,fontWeight:600,color:MT,padding:"3px 0"}}>{d}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
          {Array(first).fill(null).map((_,i)=><div key={`e${i}`}/>)}
          {Array(days).fill(null).map((_,i)=>{
            const d=i+1,past=isPast(d),sel=isSel(d),rng=inR(d);
            return(<div key={d} onClick={()=>!past&&click(d)} style={{width:34,height:34,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,cursor:past?"default":"pointer",background:sel?N:rng?"#dbeafe":"transparent",color:sel?W:rng?"#1e40af":past?"#d1d5db":TX}}>{d}</div>);
          })}
        </div>
        <div style={{marginTop:14,paddingTop:12,borderTop:`1px solid ${BR}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:12,color:MT}}>{ci?fmtShort(ci):"No check-in"}{co?` → ${fmtShort(co)}`:""}</div>
          <button onClick={()=>onApply(ci,co)} style={{...s.primary,padding:"8px 18px",fontSize:12}}>Apply</button>
        </div>
      </div>
    </Modal>
  );
}

function AuthModal({ open, onClose, onLogin }) {
  const [tab,setTab]=useState("in");
  return (
    <Modal open={open} onClose={onClose} maxW={400}>
      <div style={{fontFamily:f}}>
        <div style={{display:"flex",marginBottom:20,borderBottom:`2px solid ${BR}`}}>
          {[["in","Sign In"],["up","Create Account"]].map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,background:"none",border:"none",borderBottom:tab===t?`2px solid ${N}`:"2px solid transparent",marginBottom:-2,color:tab===t?N:MT,padding:9,fontSize:13,fontWeight:tab===t?600:500,cursor:"pointer",fontFamily:f}}>{l}</button>
          ))}
        </div>
        {tab==="in"&&(<div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            <button onClick={()=>{onLogin();onClose();}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:W,border:`1px solid ${BR}`,borderRadius:8,padding:10,cursor:"pointer",fontFamily:f,fontSize:13,color:"#374151",fontWeight:500,width:"100%"}}>🌐 Continue with Google</button>
            <button onClick={()=>{onLogin();onClose();}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"#000",border:"none",borderRadius:8,padding:10,cursor:"pointer",fontFamily:f,fontSize:13,color:W,fontWeight:500,width:"100%"}}>🍎 Continue with Apple</button>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><div style={{flex:1,height:1,background:BR}}/><span style={{fontSize:11,color:MT}}>or email</span><div style={{flex:1,height:1,background:BR}}/></div>
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
            <div><label style={s.lbl}>Email Address</label><input type="email" placeholder="your@email.com" style={s.inp}/></div>
            <div><label style={{...s.lbl,display:"flex",justifyContent:"space-between"}}>Password <span style={{color:N,textTransform:"none",letterSpacing:0,fontWeight:400,cursor:"pointer"}}>Forgot?</span></label><input type="password" placeholder="Your password" style={s.inp}/></div>
            <label style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#374151",cursor:"pointer"}}><input type="checkbox" style={{accentColor:N}}/> Remember me</label>
          </div>
          <button onClick={()=>{onLogin();onClose();}} style={{...s.primary,width:"100%",padding:12,fontSize:14,marginBottom:12}}>Sign In</button>
          <div style={{textAlign:"center",fontSize:12,color:MT}}>No account? <span onClick={()=>setTab("up")} style={{color:N,fontWeight:600,cursor:"pointer"}}>Create one free</span></div>
        </div>)}
        {tab==="up"&&(<div>
          <button onClick={()=>{onLogin();onClose();}} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:W,border:`1px solid ${BR}`,borderRadius:8,padding:10,cursor:"pointer",fontFamily:f,fontSize:13,color:"#374151",fontWeight:500,width:"100%",marginBottom:16}}>🌐 Sign up with Google</button>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><div style={{flex:1,height:1,background:BR}}/><span style={{fontSize:11,color:MT}}>or email</span><div style={{flex:1,height:1,background:BR}}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
            <div><label style={s.lbl}>First Name</label><input placeholder="Alex" style={s.inp}/></div>
            <div><label style={s.lbl}>Last Name</label><input placeholder="Johnson" style={s.inp}/></div>
            <div style={{gridColumn:"1/3"}}><label style={s.lbl}>Email</label><input type="email" placeholder="your@email.com" style={s.inp}/></div>
            <div style={{gridColumn:"1/3"}}><label style={s.lbl}>Password</label><input type="password" placeholder="Min. 8 characters" style={s.inp}/></div>
          </div>
          <label style={{display:"flex",alignItems:"flex-start",gap:6,fontSize:11,color:"#374151",cursor:"pointer",marginBottom:14,lineHeight:1.5}}><input type="checkbox" style={{accentColor:N,marginTop:1}}/> I agree to the <span style={{color:N}}>Terms</span> and <span style={{color:N}}>Privacy Policy</span></label>
          <button onClick={()=>{onLogin();onClose();}} style={{...s.primary,width:"100%",padding:12,fontSize:14,marginBottom:12}}>Create Account</button>
          <div style={{textAlign:"center",fontSize:12,color:MT}}>Have an account? <span onClick={()=>setTab("in")} style={{color:N,fontWeight:600,cursor:"pointer"}}>Sign in</span></div>
        </div>)}
      </div>
    </Modal>
  );
}

function ReviewModal({ open, onClose }) {
  const [stars,setStars]=useState({o:0,c:0,sv:0,l:0,v:0});
  const [hov,setHov]=useState({o:0,c:0,sv:0,l:0,v:0});
  const [done,setDone]=useState(false);
  const SR=({k,size=26})=>(<div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(i=>(<span key={i} onClick={()=>setStars(v=>({...v,[k]:i}))} onMouseEnter={()=>setHov(v=>({...v,[k]:i}))} onMouseLeave={()=>setHov(v=>({...v,[k]:0}))} style={{fontSize:size,cursor:"pointer",color:(hov[k]||stars[k])>=i?"#f59e0b":"#d1d5db"}}>★</span>))}</div>);
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{fontFamily:f}}>
        <div style={{fontSize:16,fontWeight:700,color:N,marginBottom:3,fontFamily:fH}}>Write a Review</div>
        <div style={{fontSize:12,color:MT,marginBottom:18}}>Aman Tokyo · Mar 3–7, 2026</div>
        <div style={{marginBottom:16}}><div style={{fontSize:12,fontWeight:600,color:"#374151",marginBottom:8}}>Overall Rating</div><SR k="o"/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          {[["c","Cleanliness"],["sv","Service"],["l","Location"],["v","Value"]].map(([k,lbl])=>(<div key={k}><div style={{fontSize:11,color:MT,marginBottom:5}}>{lbl}</div><SR k={k} size={20}/></div>))}
        </div>
        <div style={{marginBottom:12}}><label style={s.lbl}>Review Title</label><input placeholder="Summarise your stay in one line" style={s.inp}/></div>
        <div style={{marginBottom:16}}><label style={s.lbl}>Your Review</label><textarea rows={4} placeholder="Tell other travellers about your experience..." style={{...s.inp,resize:"none"}}/></div>
        {done&&<div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"10px 14px",textAlign:"center",marginBottom:12,fontSize:13,fontWeight:600,color:GR}}>Thank you! Review submitted.</div>}
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>{setDone(true);setTimeout(onClose,1800);}} style={{...s.primary,flex:1,padding:11}}>Submit Review</button>
          <button onClick={onClose} style={{...s.outline,padding:"11px 18px"}}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

function HotelCard({ h, onBook }) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:W,borderRadius:12,border:`1px solid ${hov?N:BR}`,overflow:"hidden",display:"grid",gridTemplateColumns:"150px 1fr",cursor:"pointer",transition:"all .2s",boxShadow:hov?"0 6px 20px rgba(0,0,0,.1)":"none"}}>
      <div style={{background:`linear-gradient(${h.g})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",minHeight:130}}>
        <span style={{fontFamily:fH,fontSize:22,color:"rgba(255,255,255,0.1)",fontWeight:700}}>{h.ini}</span>
        {h.badge&&<div style={{position:"absolute",bottom:8,left:8,background:h.bc,color:h.bt,fontSize:9,fontWeight:700,padding:"2px 6px",borderRadius:3}}>{h.badge}</div>}
      </div>
      <div style={{padding:"12px 14px",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
            <span style={{fontSize:13,fontWeight:600,color:TX}}>{h.n}</span>
            <div style={{textAlign:"right",flexShrink:0,marginLeft:8}}><div style={{fontSize:15,fontWeight:700,color:N}}>${h.p}</div><div style={{fontSize:10,color:MT}}>/night</div></div>
          </div>
          <div style={{fontSize:11,color:MT,marginBottom:5}}>{h.l}, Dubai</div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={{background:"#fef3c7",color:"#d97706",fontSize:10,fontWeight:600,padding:"2px 6px",borderRadius:4}}>★ {h.r}</span>
            <span style={{fontSize:10,color:MT}}>{h.rv} reviews</span>
          </div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {h.tags.map(t=><span key={t} style={{background:"#f3f4f6",color:MT,fontSize:10,padding:"2px 6px",borderRadius:4}}>{t}</span>)}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
          <span style={{fontSize:10,color:h.nc,fontWeight:500}}>{h.note}</span>
          <button onClick={(e)=>{e.stopPropagation();onBook(h);}} style={{background:N,color:W,border:"none",padding:"6px 14px",borderRadius:6,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:f}}>View Deal</button>
        </div>
      </div>
    </div>
  );
}

function SearchPage({ onBook, checkin, checkout, onOpenCal }) {
  const [mapView,setMapView]=useState(false);
  const [page,setPage]=useState(1);
  const [activePin,setActivePin]=useState(null);
  const PER=4,TOTAL=Math.ceil(HOTELS.length/PER);
  const slice=HOTELS.slice((page-1)*PER,page*PER);
  return (
    <div>
      <div style={{background:W,borderBottom:`1px solid ${BR}`,padding:"10px 18px",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:130,display:"flex",alignItems:"center",gap:7,background:BG,border:`1px solid ${BR}`,borderRadius:8,padding:"8px 12px"}}>
          <span>📍</span><span style={{fontSize:13,color:"#374151",fontWeight:500}}>Dubai, UAE</span>
        </div>
        <button onClick={()=>onOpenCal("checkin")} style={{display:"flex",alignItems:"center",gap:6,background:BG,border:`1px solid ${BR}`,borderRadius:8,padding:"8px 12px",cursor:"pointer",fontFamily:f,fontSize:13,color:"#374151"}}>📅 {fmtShort(checkin)||"Jul 15"}</button>
        <button onClick={()=>onOpenCal("checkout")} style={{display:"flex",alignItems:"center",gap:6,background:BG,border:`1px solid ${BR}`,borderRadius:8,padding:"8px 12px",cursor:"pointer",fontFamily:f,fontSize:13,color:"#374151"}}>📅 {fmtShort(checkout)||"Jul 20"}</button>
        <div style={{display:"flex",alignItems:"center",gap:6,background:BG,border:`1px solid ${BR}`,borderRadius:8,padding:"8px 12px"}}>👥 <span style={{fontSize:13,color:"#374151"}}>2 Adults</span></div>
        <button onClick={()=>setMapView(v=>!v)} style={{...s.outline,padding:"8px 12px",fontSize:12,display:"flex",alignItems:"center",gap:5,background:mapView?"#eff6ff":W,borderColor:mapView?N:BR,color:mapView?N:"#374151"}}>🗺 {mapView?"List View":"Map View"}</button>
        <button style={{...s.primary,padding:"9px 18px",fontSize:13}}>🔍 Search</button>
      </div>
      {!mapView&&(
        <div style={{display:"grid",gridTemplateColumns:"210px 1fr",gap:14,padding:"16px 18px"}}>
          <div style={{...s.card,alignSelf:"start"}}>
            <div style={{padding:"12px 14px",borderBottom:`1px solid #f3f4f6`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:13,fontWeight:600,color:TX}}>Filters</span>
              <span style={{fontSize:11,color:G,fontWeight:600,cursor:"pointer"}}>Clear all</span>
            </div>
            <div style={{padding:"12px 14px",borderBottom:`1px solid #f3f4f6`}}>
              <div style={{...s.lbl,marginBottom:8}}>Price / night</div>
              <div style={{display:"flex",gap:6,marginBottom:6,marginTop:4}}>
                <div style={{flex:1}}><div style={{fontSize:10,color:MT,marginBottom:3}}>Min</div><input type="number" defaultValue={50} style={{...s.inp,padding:"6px 7px",fontSize:12}}/></div>
                <div style={{flex:1}}><div style={{fontSize:10,color:MT,marginBottom:3}}>Max</div><input type="number" defaultValue={2000} style={{...s.inp,padding:"6px 7px",fontSize:12}}/></div>
              </div>
              <input type="range" min={50} max={5000} defaultValue={2000} style={{width:"100%",accentColor:N}}/>
            </div>
            <div style={{padding:"12px 14px",borderBottom:`1px solid #f3f4f6`}}>
              <div style={{...s.lbl,marginBottom:8}}>Star Rating</div>
              {[["5 Stars",true],["4 Stars",true],["3 Stars",false],["2 Stars",false]].map(([l,c])=>(<label key={l} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#374151",cursor:"pointer",marginBottom:6}}><span style={{display:"flex",alignItems:"center",gap:5}}><input type="checkbox" defaultChecked={c} style={{accentColor:N}}/>{l}</span></label>))}
            </div>
            <div style={{padding:"12px 14px",borderBottom:`1px solid #f3f4f6`}}>
              <div style={{...s.lbl,marginBottom:8}}>Amenities</div>
              {["Free WiFi","Pool","Breakfast","Free Cancellation","Spa"].map((a,i)=>(<label key={a} style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#374151",cursor:"pointer",marginBottom:6}}><input type="checkbox" defaultChecked={i===0||i===3} style={{accentColor:N}}/>{a}</label>))}
            </div>
            <div style={{padding:"12px 14px"}}>
              <div style={{...s.lbl,marginBottom:8}}>Property Type</div>
              {["All types","Luxury","Resort","Boutique","Budget"].map((l,i)=>(<label key={l} style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#374151",cursor:"pointer",marginBottom:6}}><span style={{display:"flex",alignItems:"center",gap:5}}><input type="radio" name="ptype" defaultChecked={i===0} style={{accentColor:N}}/>{l}</span></label>))}
            </div>
          </div>
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:8}}>
              <div style={{fontSize:13,color:MT}}><strong style={{color:TX}}>248 hotels</strong> in Dubai, UAE · Page {page} of {TOTAL}</div>
              <select style={{border:`1px solid ${BR}`,borderRadius:6,padding:"5px 10px",fontSize:12,fontFamily:f,color:"#374151",outline:"none",background:W}}><option>Recommended</option><option>Price: Low–High</option><option>Price: High–Low</option><option>Highest Rated</option></select>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              {slice.map(h=><HotelCard key={h.id} h={h} onBook={onBook}/>)}
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:5,marginTop:16,paddingBottom:24}}>
              <button onClick={()=>page>1&&setPage(p=>p-1)} style={{width:32,height:32,borderRadius:8,fontSize:13,cursor:"pointer",fontFamily:f,border:`1px solid ${BR}`,background:W,color:page===1?"#d1d5db":"#374151"}}>‹</button>
              {Array(TOTAL).fill(null).map((_,i)=>(<button key={i} onClick={()=>setPage(i+1)} style={{width:32,height:32,borderRadius:8,fontSize:13,cursor:"pointer",fontFamily:f,border:page===i+1?"none":`1px solid ${BR}`,background:page===i+1?N:W,color:page===i+1?W:"#374151",fontWeight:page===i+1?700:400}}>{i+1}</button>))}
              <button onClick={()=>page<TOTAL&&setPage(p=>p+1)} style={{width:32,height:32,borderRadius:8,fontSize:13,cursor:"pointer",fontFamily:f,border:`1px solid ${BR}`,background:W,color:page===TOTAL?"#d1d5db":"#374151"}}>›</button>
            </div>
          </div>
        </div>
      )}
      {mapView&&(
        <div style={{padding:"14px 18px"}}>
          <div style={{display:"grid",gridTemplateColumns:"300px 1fr",gap:14,height:440}}>
            <div style={{overflowY:"auto",display:"flex",flexDirection:"column",gap:8,paddingRight:4}}>
              {HOTELS.slice(0,8).map(h=>(<div key={h.id} onMouseEnter={()=>setActivePin(h.id)} onMouseLeave={()=>setActivePin(null)} onClick={()=>onBook(h)} style={{background:W,border:`1px solid ${activePin===h.id?N:BR}`,borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",transition:"border-color .2s",flexShrink:0}}>
                <div style={{width:40,height:40,borderRadius:6,background:`linear-gradient(${h.g})`,flexShrink:0}}/>
                <div><div style={{fontSize:12,fontWeight:600,color:TX}}>{h.n}</div><div style={{fontSize:10,color:MT}}>★ {h.r} · ${h.p}/night</div></div>
              </div>))}
            </div>
            <div style={{borderRadius:12,position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#d4e8d4,#e8f4d4 25%,#e8e8c8 50%,#d8e8e8 75%,#d4dce8)",border:`1px solid ${BR}`}}>
              {[20,50,75].map(t=><div key={t} style={{position:"absolute",top:`${t}%`,left:0,right:0,height:2,background:"rgba(255,255,255,0.7)"}}/>)}
              {[30,60,80].map(l=><div key={l} style={{position:"absolute",top:0,bottom:0,left:`${l}%`,width:2,background:"rgba(255,255,255,0.7)"}}/>)}
              {HOTELS.slice(0,8).map(h=>(
                <div key={h.id} onClick={()=>onBook(h)} style={{position:"absolute",left:h.mx,top:h.my,transform:"translate(-50%,-100%)",cursor:"pointer",zIndex:10}}>
                  <div style={{background:activePin===h.id?G:N,color:activePin===h.id?N:W,fontSize:11,fontWeight:700,padding:"4px 8px",borderRadius:6,whiteSpace:"nowrap",border:"2px solid #fff",boxShadow:"0 2px 8px rgba(0,0,0,.25)"}}>${h.p}</div>
                  <div style={{width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:`7px solid ${activePin===h.id?G:N}`,margin:"0 auto"}}/>
                </div>
              ))}
              <div style={{position:"absolute",bottom:12,right:12,background:"rgba(255,255,255,0.9)",borderRadius:6,padding:"6px 10px",fontSize:11,color:"#374151",fontWeight:500}}>Dubai, UAE</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DealsPage() {
  const deals=[
    {ini:"BURJ",g:"135deg,#0f2d52,#1e5f74",name:"Burj Al Arab Jumeirah",sub:"Dubai · 5 nights min",orig:850,disc:553,pct:35,exp:"Jul 31",hot:false},
    {ini:"ATL",g:"135deg,#1a3a20,#2a7040",name:"Atlantis The Palm",sub:"Dubai · Breakfast included",orig:480,disc:360,pct:25,exp:"Aug 15",hot:false},
    {ini:"JW",g:"135deg,#1a0a30,#3a1a60",name:"JW Marriott Marquis",sub:"Dubai · Fri–Sun only",orig:390,disc:312,pct:20,exp:"Weekend",hot:false},
    {ini:"SFT",g:"135deg,#0a1a10,#1a4a2a",name:"Sofitel Dubai The Palm",sub:"Dubai · 3 nights min",orig:280,disc:168,pct:40,exp:"12h left",hot:true},
    {ini:"FS",g:"135deg,#0a0a20,#1a1a40",name:"Four Seasons DIFC",sub:"Dubai · Suite deal",orig:620,disc:434,pct:30,exp:"Aug 1",hot:false},
    {ini:"WA",g:"135deg,#1f1000,#4a2a00",name:"Waldorf Astoria Dubai",sub:"Dubai · Extended stay",orig:540,disc:378,pct:30,exp:"Jul 28",hot:false},
  ];
  return (
    <div style={{padding:"24px 18px 40px"}}>
      <div style={{background:`linear-gradient(135deg,${N},#1e4d8c)`,borderRadius:14,padding:28,marginBottom:24,textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-30,right:-30,width:160,height:160,borderRadius:"50%",background:"rgba(201,168,76,0.1)"}}/>
        <div style={{display:"inline-block",background:"rgba(201,168,76,0.2)",border:"1px solid rgba(201,168,76,0.4)",color:G,fontSize:11,fontWeight:600,padding:"3px 12px",borderRadius:20,letterSpacing:1,marginBottom:10}}>LIMITED TIME</div>
        <h2 style={{fontFamily:fH,fontSize:28,fontWeight:700,color:W,margin:"0 0 8px"}}>Up to 40% Off This Month</h2>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.65)",marginBottom:18}}>Exclusive deals on handpicked hotels worldwide.</p>
        <button style={s.gold}>Browse All Deals</button>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {["Flash Deals","Weekend Getaway","Extended Stay","Last Minute","Corporate"].map((l,i)=>(<button key={l} style={i===0?{...s.primary,padding:"7px 16px",fontSize:12}:{...s.outline,padding:"7px 16px",fontSize:12}}>{l}</button>))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
        {deals.map((d,i)=>(<div key={i} style={{background:W,border:`1px solid ${BR}`,borderRadius:12,overflow:"hidden",cursor:"pointer",transition:"all .2s"}}>
          <div style={{height:120,background:`linear-gradient(${d.g})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
            <span style={{fontFamily:fH,fontSize:32,color:"rgba(255,255,255,0.1)",fontWeight:700}}>{d.ini}</span>
            <div style={{position:"absolute",top:10,right:10,background:d.hot?GR:RD,color:W,fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:4}}>-{d.pct}%</div>
            <div style={{position:"absolute",bottom:10,left:10,background:"rgba(0,0,0,0.5)",color:W,fontSize:10,padding:"2px 7px",borderRadius:3}}>Expires {d.exp}</div>
          </div>
          <div style={{padding:"12px 14px"}}>
            <div style={{fontSize:13,fontWeight:600,color:TX,marginBottom:4}}>{d.name}</div>
            <div style={{fontSize:11,color:MT,marginBottom:8}}>{d.sub}</div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:18,fontWeight:700,color:N}}>${d.disc}</span>
              <span style={{fontSize:12,color:MT,textDecoration:"line-through"}}>${d.orig}</span>
              <span style={{fontSize:11,color:GR,fontWeight:500,marginLeft:"auto"}}>{d.hot?"🔥 Only 2 left":"Free cancel"}</span>
            </div>
          </div>
        </div>))}
      </div>
    </div>
  );
}

function FAQPage() {
  const [open,setOpen]=useState(null);
  return (
    <div style={{padding:"24px 18px 40px"}}>
      <h2 style={{fontFamily:fH,fontSize:22,fontWeight:700,color:N,marginBottom:6}}>Help Center</h2>
      <p style={{fontSize:13,color:MT,marginBottom:20}}>Find answers to the most common questions.</p>
      <div style={{position:"relative",marginBottom:20}}><span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}>🔍</span><input placeholder="Search for an answer..." style={{...s.inp,paddingLeft:36}}/></div>
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {["Booking","Payments","Cancellations","Hotel Owners","Account"].map((c,i)=>(<button key={c} style={i===0?{...s.primary,padding:"6px 14px",fontSize:12}:{...s.outline,padding:"6px 14px",fontSize:12}}>{c}</button>))}
      </div>
      <div>
        {FAQS.map((faq,i)=>(<div key={i} style={{border:`1px solid ${BR}`,borderRadius:10,overflow:"hidden",marginBottom:8}}>
          <div onClick={()=>setOpen(open===i?null:i)} style={{padding:"14px 16px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13,fontWeight:500,color:TX,background:W,userSelect:"none"}}>
            {faq.q}<span style={{fontSize:18,color:MT,display:"inline-block",transition:"transform .2s",transform:open===i?"rotate(45deg)":"none"}}>+</span>
          </div>
          {open===i&&<div style={{padding:"12px 16px 14px",fontSize:12,color:MT,lineHeight:1.65,background:"#f9fafb",borderTop:`1px solid #f3f4f6`}}>{faq.a}</div>}
        </div>))}
      </div>
      <div style={{marginTop:28,background:`linear-gradient(135deg,${N},#1e4d8c)`,borderRadius:12,padding:22,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14}}>
        <div><div style={{fontSize:14,fontWeight:600,color:W,marginBottom:4}}>Still need help?</div><div style={{fontSize:12,color:"rgba(255,255,255,0.65)"}}>Our team responds within 2 hours.</div></div>
        <div style={{display:"flex",gap:8}}><button style={s.gold}>Live Chat</button><button style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:W,padding:"9px 18px",borderRadius:8,fontSize:12,cursor:"pointer",fontFamily:f}}>Email Us</button></div>
      </div>
    </div>
  );
}

function ListingPage({ onSuccess }) {
  const [step,setStep]=useState(1);
  const [rooms,setRooms]=useState([{name:"Standard Room",bed:"King / Twin",price:"$200"}]);
  const [done,setDone]=useState(false);
  const SC=({n})=>(<div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:28,height:28,borderRadius:"50%",background:step>n?GR:step===n?N:"#e5e7eb",color:step>n||step===n?W:MT,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{step>n?"✓":n}</div><span style={{fontSize:12,fontWeight:step===n?600:500,color:step>n?GR:step===n?N:MT}}>{["Basic Info","Rooms & Amenities","Confirm"][n-1]}</span></div>);
  return (
    <div style={{padding:"24px 18px 40px"}}>
      <div style={{maxWidth:560,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:22}}>
          <div style={{display:"inline-block",background:"#eff6ff",color:"#1d4ed8",fontSize:11,fontWeight:600,padding:"3px 12px",borderRadius:20,letterSpacing:1,marginBottom:8}}>FOR HOTEL OWNERS</div>
          <h2 style={{fontFamily:fH,fontSize:24,fontWeight:700,color:N,margin:"0 0 6px"}}>List Your Property</h2>
          <p style={{fontSize:13,color:MT,margin:0}}>Reach millions of travellers in under 10 minutes.</p>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:22,gap:0}}>
          <SC n={1}/><div style={{width:36,height:2,background:step>1?GR:BR,margin:"0 8px"}}/><SC n={2}/><div style={{width:36,height:2,background:step>2?GR:BR,margin:"0 8px"}}/><SC n={3}/>
        </div>
        {step===1&&(<div style={{...s.card,padding:22}}>
          <h3 style={{fontSize:14,fontWeight:600,color:TX,margin:"0 0 16px"}}>Property Information</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div style={{gridColumn:"1/3"}}><label style={s.lbl}>Hotel Name *</label><input placeholder="e.g. The Grand Palace Hotel" style={s.inp}/></div>
            <div><label style={s.lbl}>Property Type *</label><select style={{...s.inp,background:W}}><option>Luxury Hotel</option><option>Business Hotel</option><option>Resort</option><option>Boutique Hotel</option><option>Budget Hotel</option></select></div>
            <div><label style={s.lbl}>Star Rating</label><select style={{...s.inp,background:W}}><option>5 Stars</option><option>4 Stars</option><option>3 Stars</option><option>2 Stars</option></select></div>
            <div><label style={s.lbl}>Country *</label><input placeholder="e.g. United Arab Emirates" style={s.inp}/></div>
            <div><label style={s.lbl}>City *</label><input placeholder="e.g. Dubai" style={s.inp}/></div>
            <div style={{gridColumn:"1/3"}}><label style={s.lbl}>Full Address *</label><input placeholder="Street address, area" style={s.inp}/></div>
            <div><label style={s.lbl}>Contact Email *</label><input type="email" placeholder="reservations@hotel.com" style={s.inp}/></div>
            <div><label style={s.lbl}>Phone *</label><input type="tel" placeholder="+1 234 567 8900" style={s.inp}/></div>
            <div style={{gridColumn:"1/3"}}><label style={s.lbl}>Description *</label><textarea rows={3} placeholder="Describe your property..." style={{...s.inp,resize:"none"}}/></div>
          </div>
          <div style={{display:"flex",justifyContent:"flex-end",marginTop:14}}><button onClick={()=>setStep(2)} style={s.primary}>Continue →</button></div>
        </div>)}
        {step===2&&(<div style={{...s.card,padding:22}}>
          <h3 style={{fontSize:14,fontWeight:600,color:TX,margin:"0 0 16px"}}>Rooms & Amenities</h3>
          <div style={{marginBottom:14}}><label style={s.lbl}>Total Rooms</label><input type="number" defaultValue={50} style={s.inp}/></div>
          <div style={{marginBottom:14}}>
            <div style={{...s.lbl,marginBottom:8}}>Room Types</div>
            {rooms.map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 80px 30px",gap:7,alignItems:"center",marginBottom:7}}>
              <input defaultValue={r.name} style={{...s.inp,padding:"7px 9px",fontSize:12}}/><input defaultValue={r.bed} style={{...s.inp,padding:"7px 9px",fontSize:12}}/><input defaultValue={r.price} style={{...s.inp,padding:"7px 9px",fontSize:12,textAlign:"center"}}/>
              <button onClick={()=>setRooms(rooms.filter((_,j)=>j!==i))} style={{background:"none",border:"1px solid #fecaca",color:RD,borderRadius:5,width:30,height:30,cursor:"pointer",fontSize:14}}>×</button>
            </div>))}
            <button onClick={()=>setRooms([...rooms,{name:"",bed:"",price:""}])} style={{background:"none",border:`1px dashed ${N}`,color:N,padding:"7px 14px",borderRadius:7,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:f,width:"100%"}}>+ Add Room Type</button>
          </div>
          <div style={{marginBottom:16}}>
            <div style={{...s.lbl,marginBottom:8}}>Amenities</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:7}}>
              {["Free WiFi","Swimming Pool","Spa","Fitness Center","Restaurant","Free Parking","Airport Shuttle","Pet Friendly","Bar & Lounge","Room Service"].map((a,i)=>(<label key={a} style={{display:"flex",alignItems:"center",gap:5,cursor:"pointer",background:"#f9fafb",border:"1px solid #f3f4f6",borderRadius:6,padding:"7px 9px",fontSize:12,color:"#374151"}}><input type="checkbox" defaultChecked={i===0||i===4} style={{accentColor:N}}/>{a}</label>))}
            </div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:14}}><button onClick={()=>setStep(1)} style={s.outline}>← Back</button><button onClick={()=>setStep(3)} style={s.primary}>Continue →</button></div>
        </div>)}
        {step===3&&(<div style={{...s.card,padding:22}}>
          <h3 style={{fontSize:14,fontWeight:600,color:TX,margin:"0 0 6px"}}>Almost Done!</h3>
          <p style={{fontSize:13,color:MT,margin:"0 0 16px"}}>Review details before going live.</p>
          <div style={{background:"#f9fafb",borderRadius:10,padding:14,marginBottom:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[["Commission","12% per booking"],["Payout","Monthly · Bank transfer"],["Goes live","Within 24 hours"],["Fee","Free"]].map(([k,v])=>(<div key={k}><div style={{fontSize:10,color:MT,marginBottom:2}}>{k}</div><div style={{fontSize:13,fontWeight:600,color:(k==="Goes live"||k==="Fee")?GR:TX}}>{v}</div></div>))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
            <label style={{display:"flex",alignItems:"flex-start",gap:7,cursor:"pointer",fontSize:12,color:"#374151",lineHeight:1.5}}><input type="checkbox" style={{accentColor:N,marginTop:1}}/>I confirm the property information is accurate.</label>
            <label style={{display:"flex",alignItems:"flex-start",gap:7,cursor:"pointer",fontSize:12,color:"#374151",lineHeight:1.5}}><input type="checkbox" style={{accentColor:N,marginTop:1}}/>I agree to the <span style={{color:N}}>Terms of Service</span> and <span style={{color:N}}>Commission Agreement</span>.</label>
          </div>
          {done&&<div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8,padding:"12px 14px",textAlign:"center",marginBottom:14}}><div style={{fontSize:13,fontWeight:600,color:GR,marginBottom:2}}>Property submitted!</div><div style={{fontSize:11,color:"#166534"}}>We'll activate your listing within 24 hours.</div></div>}
          <div style={{display:"flex",justifyContent:"space-between"}}><button onClick={()=>setStep(2)} style={s.outline}>← Back</button><button onClick={()=>{setDone(true);setTimeout(onSuccess,1500);}} style={s.gold}>🚀 Launch My Listing</button></div>
        </div>)}
      </div>
    </div>
  );
}

function PaymentPage({ hotel, checkin, checkout, onConfirm }) {
  const h=hotel||HOTELS[0];
  const nights=5,tax=Math.round(h.p*nights*0.12),total=h.p*nights+tax;
  const [card,setCard]=useState("");
  const fmtCard=(v)=>v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  return (
    <div style={{padding:"24px 18px 40px"}}>
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <h2 style={{fontFamily:fH,fontSize:22,fontWeight:700,color:N,marginBottom:20}}>Complete Your Booking</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:18}}>
          <div>
            <div style={{...s.card,padding:20,marginBottom:14}}>
              <h3 style={{fontSize:14,fontWeight:600,color:TX,margin:"0 0 16px"}}>💳 Payment Details</h3>
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                <div><label style={s.lbl}>Card Number</label><input value={card} onChange={e=>setCard(fmtCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} style={s.inp}/></div>
                <div><label style={s.lbl}>Cardholder Name</label><input placeholder="As it appears on card" style={s.inp}/></div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  <div><label style={s.lbl}>Expiry Date</label><input placeholder="MM / YY" maxLength={7} style={s.inp}/></div>
                  <div><label style={s.lbl}>CVV</label><input type="password" placeholder="•••" maxLength={4} style={s.inp}/></div>
                </div>
              </div>
            </div>
            <div style={{...s.card,padding:20,marginBottom:14}}>
              <h3 style={{fontSize:14,fontWeight:600,color:TX,margin:"0 0 16px"}}>Billing Address</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div style={{gridColumn:"1/3"}}><label style={s.lbl}>Full Name</label><input placeholder="Your full name" style={s.inp}/></div>
                <div style={{gridColumn:"1/3"}}><label style={s.lbl}>Address</label><input placeholder="Street address" style={s.inp}/></div>
                <div><label style={s.lbl}>City</label><input placeholder="City" style={s.inp}/></div>
                <div><label style={s.lbl}>Country</label><select style={{...s.inp,background:W}}><option>United Arab Emirates</option><option>United States</option><option>United Kingdom</option><option>France</option></select></div>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,padding:"12px 14px",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:8}}>
              <span>🔒</span><span style={{fontSize:12,color:"#166534"}}>Your payment is encrypted and 100% secure.</span>
            </div>
            <button onClick={onConfirm} style={{...s.primary,width:"100%",padding:13,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>🔒 Pay & Confirm Booking</button>
          </div>
          <div style={{...s.card,padding:18,alignSelf:"start",position:"sticky",top:60}}>
            <div style={{fontSize:13,fontWeight:600,color:TX,marginBottom:14}}>Booking Summary</div>
            <div style={{height:80,background:`linear-gradient(${h.g})`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><span style={{fontFamily:fH,fontSize:24,color:"rgba(255,255,255,0.15)",fontWeight:700}}>{h.ini}</span></div>
            <div style={{fontSize:13,fontWeight:600,color:TX,marginBottom:4}}>{h.n}</div>
            <div style={{fontSize:11,color:MT,marginBottom:12}}>Dubai, UAE</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${BR}`}}>
              {[["Check-in",fmtFull(checkin)||"Jul 15, 2026"],["Check-out",fmtFull(checkout)||"Jul 20, 2026"],["Room","Superior Room"],["Guests","2 Adults"]].map(([k,v])=>(<div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:MT}}>{k}</span><span style={{color:TX,fontWeight:500}}>{v}</span></div>))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5,marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${BR}`}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:MT}}><span>${h.p} × {nights} nights</span><span>${h.p*nights}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:MT}}><span>Taxes (12%)</span><span>${tax}</span></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:MT}}><span>Service fee</span><span>$0</span></div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:14,fontWeight:700,color:N,marginBottom:12}}><span>Total</span><span>${total.toLocaleString()}</span></div>
            <div style={{background:"#fef9ec",border:"1px solid #fde68a",borderRadius:6,padding:"8px 10px",fontSize:11,color:"#92400e"}}>Free cancellation until Jul 10, 2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmationPage({ checkin, checkout, onViewBookings, onSearchMore }) {
  return (
    <div style={{padding:"40px 18px 60px"}}>
      <div style={{maxWidth:520,margin:"0 auto",textAlign:"center"}}>
        <div style={{width:72,height:72,background:"#f0fdf4",border:"3px solid #86efac",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:32}}>✓</div>
        <h2 style={{fontFamily:fH,fontSize:26,fontWeight:700,color:N,marginBottom:6}}>Booking Confirmed!</h2>
        <p style={{fontSize:13,color:MT,marginBottom:6}}>Your stay has been successfully reserved.</p>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:8,padding:"8px 16px",marginBottom:24}}>
          <span>🎫</span><span style={{fontSize:14,fontWeight:700,color:"#1e40af",letterSpacing:1}}>SB-2026-84721</span>
        </div>
        <div style={{...s.card,padding:20,marginBottom:16,textAlign:"left"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16,paddingBottom:16,borderBottom:`1px solid ${BR}`}}>
            <div style={{width:52,height:52,borderRadius:8,background:"linear-gradient(135deg,#0f2d52,#1e5f74)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:fH,fontSize:16,color:"rgba(255,255,255,0.3)",fontWeight:700,flexShrink:0}}>BA</div>
            <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:TX,marginBottom:2}}>Burj Al Arab Jumeirah</div><div style={{fontSize:11,color:MT}}>Jumeirah Beach Road, Dubai, UAE</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700,color:N}}>$4,760</div><div style={{fontSize:10,color:MT}}>Total paid</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[["Check-in",fmtFull(checkin)||"Jul 15, 2026","From 3:00 PM"],["Check-out",fmtFull(checkout)||"Jul 20, 2026","Before 12:00 PM"],["Room","Superior Room","1 King bed · Sea view"],["Guests","2 Adults","Breakfast included"]].map(([k,v,sub])=>(<div key={k} style={{background:"#f9fafb",borderRadius:8,padding:"10px 12px"}}><div style={{fontSize:10,color:MT,marginBottom:3,textTransform:"uppercase",letterSpacing:".5px"}}>{k}</div><div style={{fontSize:13,fontWeight:600,color:TX}}>{v}</div><div style={{fontSize:11,color:MT}}>{sub}</div></div>))}
          </div>
        </div>
        <div style={{background:"#eff6ff",border:"1px solid #bfdbfe",borderRadius:10,padding:"14px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:20,textAlign:"left"}}>
          <span style={{fontSize:20,flexShrink:0}}>✉️</span>
          <div><div style={{fontSize:13,fontWeight:600,color:"#1e40af",marginBottom:2}}>Confirmation email sent</div><div style={{fontSize:11,color:"#3b82f6"}}>Receipt and check-in instructions sent to alex.johnson@email.com</div></div>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={onViewBookings} style={{...s.primary,padding:"10px 20px",fontSize:13}}>📅 View My Bookings</button>
          <button style={{...s.outline,padding:"10px 18px",fontSize:13}}>↗ Share</button>
          <button onClick={onSearchMore} style={{...s.outline,padding:"10px 18px",fontSize:13}}>🔍 Search More</button>
        </div>
      </div>
    </div>
  );
}

function OwnerDashboard() {
  const [tab,setTab]=useState("overview");
  const chartData=[{m:"Jan",v:65000},{m:"Feb",v:72000},{m:"Mar",v:68000},{m:"Apr",v:75000},{m:"May",v:80000},{m:"Jun",v:87000},{m:"Jul",v:45000}];
  const bookings=[
    {guest:"Alex Johnson",email:"alex@email.com",room:"Superior Room",dates:"Jul 15–20",rev:4760,status:"Confirmed"},
    {guest:"Sarah Chen",email:"schen@gmail.com",room:"Deluxe Suite",dates:"Jul 18–22",rev:5376,status:"Pending"},
    {guest:"Mohammed Al-Farsi",email:"mfarsi@corp.ae",room:"Presidential Suite",dates:"Aug 2–5",rev:8400,status:"Confirmed"},
    {guest:"Emma Wilson",email:"ewilson@uk.com",room:"Superior Room",dates:"Jul 12–14",rev:1904,status:"Cancelled"},
  ];
  const SS={Confirmed:{bg:"#f0fdf4",c:GR},Pending:{bg:"#fef9c3",c:"#a16207"},Cancelled:{bg:"#fef2f2",c:"#991b1b"}};
  return (
    <div style={{padding:"20px 18px 40px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
        <div><h2 style={{fontFamily:fH,fontSize:20,fontWeight:700,color:N,margin:"0 0 3px"}}>Hotel Dashboard</h2><div style={{fontSize:12,color:MT}}>Burj Al Arab Jumeirah · Dubai, UAE</div></div>
        <div style={{display:"flex",gap:8}}><button style={{...s.outline,padding:"7px 14px",fontSize:12}}>⚙ Settings</button><button style={{...s.primary,padding:"7px 14px",fontSize:12}}>+ Add Room</button></div>
      </div>
      <div style={{...s.card,overflow:"hidden"}}>
        <div style={{display:"flex",borderBottom:`1px solid #f3f4f6`}}>
          {[["overview","Overview"],["bookings","Bookings"],["messages","Messages"],["earnings","Earnings"]].map(([t,l])=>(<button key={t} onClick={()=>setTab(t)} style={s.tabBtn(tab===t)}>{l}</button>))}
        </div>
        {tab==="overview"&&(<div style={{padding:18}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:12,marginBottom:22}}>
            {[["142","Total Bookings","+12%",GR],["$87k","Revenue (Jun)","+8%",GR],["87%","Occupancy","+5%",GR],["9.8","Avg. Rating","★ Exceptional","#f59e0b"]].map(([v,l,s2,c])=>(<div key={l} style={{background:"#f9fafb",border:"1px solid #f3f4f6",borderRadius:10,padding:16,textAlign:"center"}}><div style={{fontFamily:fH,fontSize:28,fontWeight:700,color:N,marginBottom:2}}>{v}</div><div style={{fontSize:11,color:MT}}>{l}</div><div style={{fontSize:10,color:c,marginTop:3}}>{s2}</div></div>))}
          </div>
          <div style={{marginBottom:8,fontSize:12,fontWeight:600,color:"#374151"}}>Monthly Revenue (2026)</div>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={chartData} margin={{top:0,right:0,bottom:0,left:0}}>
              <XAxis dataKey="m" tick={{fontSize:10,fill:MT}} axisLine={false} tickLine={false}/>
              <Tooltip formatter={v=>`$${(v/1000).toFixed(0)}k`} contentStyle={{fontFamily:f,fontSize:11}}/>
              <Bar dataKey="v" fill={N} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>)}
        {tab==="bookings"&&(<div style={{padding:18}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
            <div style={{fontSize:13,fontWeight:600,color:TX}}>Recent Bookings</div>
            <div style={{display:"flex",gap:8}}><button style={{...s.outline,padding:"5px 12px",fontSize:11}}>Export</button><select style={{border:`1px solid ${BR}`,borderRadius:6,padding:"5px 10px",fontSize:11,fontFamily:f,color:"#374151",outline:"none",background:W}}><option>All Status</option><option>Confirmed</option><option>Pending</option><option>Cancelled</option></select></div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr style={{borderBottom:`2px solid #f3f4f6`}}>{["Guest","Room","Dates","Revenue","Status"].map(h=>(<th key={h} style={{textAlign:"left",padding:"8px 10px",color:MT,fontWeight:600,textTransform:"uppercase",fontSize:10,letterSpacing:".5px"}}>{h}</th>))}</tr></thead>
              <tbody>{bookings.map((b,i)=>(<tr key={i} style={{borderBottom:`1px solid #f9fafb`}}><td style={{padding:10}}><div style={{fontWeight:500,color:TX}}>{b.guest}</div><div style={{color:MT,fontSize:10}}>{b.email}</div></td><td style={{padding:10,color:"#374151"}}>{b.room}</td><td style={{padding:10,color:"#374151"}}>{b.dates}</td><td style={{padding:10,fontWeight:600,color:b.status==="Cancelled"?MT:N}}>${b.rev.toLocaleString()}</td><td style={{padding:10}}><span style={{background:SS[b.status].bg,color:SS[b.status].c,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:12}}>{b.status}</span></td></tr>))}</tbody>
            </table>
          </div>
        </div>)}
        {tab==="messages"&&(<div>{[{ini:"AJ",g:"135deg,#0f2d52,#1e5f74",name:"Alex Johnson",time:"10min",msg:"Is early check-in available on July 15?",u:true},{ini:"SC",g:"135deg,#1a3a20,#2a7040",name:"Sarah Chen",time:"2h",msg:"Can we arrange an airport transfer for 4 people?",u:false},{ini:"MF",g:"135deg,#300a10,#6a1a20",name:"Mohammed Al-Farsi",time:"Yesterday",msg:"We need a private chef for our stay.",u:false}].map((m,i)=>(<div key={i} style={{borderBottom:`1px solid #f3f4f6`,padding:"12px 16px",display:"flex",gap:10,cursor:"pointer",background:m.u?"#eff6ff":W}}><div style={{width:38,height:38,borderRadius:7,background:`linear-gradient(${m.g})`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"rgba(255,255,255,0.4)",fontFamily:fH}}>{m.ini}</div><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:13,fontWeight:600,color:TX}}>{m.name}</span><span style={{fontSize:10,color:MT}}>{m.time} ago</span></div><div style={{fontSize:12,color:m.u?MT:"#9ca3af",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.msg}</div></div>{m.u&&<div style={{width:8,height:8,borderRadius:"50%",background:N,flexShrink:0,marginTop:5}}/>}</div>))}</div>)}
        {tab==="earnings"&&(<div style={{padding:18}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:18}}>
            <div style={{background:"#f9fafb",border:"1px solid #f3f4f6",borderRadius:10,padding:16}}><div style={{fontSize:11,color:MT,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Total Earnings (2026)</div><div style={{fontFamily:fH,fontSize:26,fontWeight:700,color:N,marginBottom:2}}>$487,200</div><div style={{fontSize:11,color:GR}}>+24% vs 2025</div></div>
            <div style={{background:"#f9fafb",border:"1px solid #f3f4f6",borderRadius:10,padding:16}}><div style={{fontSize:11,color:MT,marginBottom:4,textTransform:"uppercase",letterSpacing:".5px"}}>Next Payout</div><div style={{fontFamily:fH,fontSize:26,fontWeight:700,color:GR,marginBottom:2}}>$76,560</div><div style={{fontSize:11,color:MT}}>Jul 31, 2026</div></div>
          </div>
          {[{m:"June 2026",sub:"Jun 30 · 23 bookings",amt:"$87,200",s:"Paid",c:GR,bg:"#f0fdf4"},{m:"May 2026",sub:"May 31 · 19 bookings",amt:"$71,800",s:"Paid",c:GR,bg:"#f0fdf4"},{m:"July 2026",sub:"Jul 31 · in progress",amt:"$76,560",s:"Pending",c:"#1d4ed8",bg:"#eff6ff"}].map((p,i)=>(<div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",background:p.bg,borderRadius:8,border:`1px solid ${i<2?"#f3f4f6":"#bfdbfe"}`,marginBottom:8}}><div><div style={{fontSize:12,fontWeight:500,color:TX}}>{p.m}</div><div style={{fontSize:11,color:MT}}>{p.sub}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:p.c}}>{p.amt}</div><span style={{background:p.bg,color:p.c,fontSize:10,fontWeight:600,padding:"1px 7px",borderRadius:12}}>{p.s}</span></div></div>))}
        </div>)}
      </div>
    </div>
  );
}

function AccountPage({ loggedIn, onWriteReview }) {
  const [tab,setTab]=useState("bookings");
  const [saveOk,setSaveOk]=useState(false);
  return (
    <div style={{padding:"20px 18px 40px"}}>
      {!loggedIn&&(<div style={{...s.card,padding:24,textAlign:"center"}}><div style={{fontSize:40,marginBottom:12}}>👤</div><h3 style={{fontFamily:fH,fontSize:18,fontWeight:700,color:N,margin:"0 0 8px"}}>Sign in to your account</h3><p style={{fontSize:13,color:MT}}>View your bookings, saved hotels, and manage your profile.</p></div>)}
      {loggedIn&&(<>
        <div style={{background:`linear-gradient(135deg,${N},#1e4d8c)`,borderRadius:14,padding:22,marginBottom:18,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${G},#8b6914)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:fH,fontSize:20,fontWeight:700,color:N,border:"3px solid rgba(255,255,255,0.2)"}}>AJ</div>
            <div><div style={{fontFamily:fH,fontSize:18,fontWeight:700,color:W}}>Alex Johnson</div><div style={{fontSize:11,color:"rgba(255,255,255,0.6)",marginTop:2}}>alex.johnson@email.com · Member since Jan 2024</div></div>
          </div>
          <div style={{background:"rgba(201,168,76,0.15)",border:"1px solid rgba(201,168,76,0.35)",borderRadius:8,padding:"10px 16px",textAlign:"center"}}><div style={{fontSize:10,color:G,fontWeight:600,letterSpacing:1,marginBottom:2}}>GOLD MEMBER</div><div style={{fontSize:20,fontWeight:700,color:W}}>4,280 pts</div><div style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginTop:1}}>720 pts to Platinum</div></div>
        </div>
        <div style={{...s.card,overflow:"hidden"}}>
          <div style={{display:"flex",borderBottom:`1px solid #f3f4f6`}}>
            {[["bookings","Bookings"],["saved","Saved"],["messages","Messages"],["settings","Settings"]].map(([t,l])=>(<button key={t} onClick={()=>setTab(t)} style={s.tabBtn(tab===t)}>{l}</button>))}
          </div>
          {tab==="bookings"&&(<div style={{padding:18}}>
            <div style={{fontSize:10,fontWeight:600,color:MT,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Upcoming Stays</div>
            <div style={{border:`1px solid ${BR}`,borderRadius:10,padding:"12px 14px",display:"grid",gridTemplateColumns:"44px 1fr auto",gap:10,alignItems:"center",marginBottom:18}}>
              <div style={{width:44,height:44,borderRadius:8,background:"linear-gradient(135deg,#0f2d52,#1e5f74)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:fH,fontSize:14,color:"rgba(255,255,255,0.3)",fontWeight:700}}>BA</div>
              <div><div style={{fontSize:13,fontWeight:600,color:TX,marginBottom:2}}>Burj Al Arab Jumeirah</div><div style={{fontSize:11,color:MT}}>Jul 15–20, 2026 · Superior Room</div><div style={{fontSize:10,color:GR,fontWeight:500,marginTop:2}}>Confirmed · Free cancellation until Jul 10</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:N}}>$4,760</div><button style={{background:"none",border:`1px solid ${BR}`,color:"#374151",padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",fontFamily:f,marginTop:4,display:"block"}}>Manage</button></div>
            </div>
            <div style={{fontSize:10,fontWeight:600,color:MT,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>Past Stays</div>
            <div style={{border:`1px solid #f3f4f6`,borderRadius:10,padding:"12px 14px",display:"grid",gridTemplateColumns:"44px 1fr auto",gap:10,alignItems:"center",background:"#fafafa"}}>
              <div style={{width:44,height:44,borderRadius:8,background:"linear-gradient(135deg,#0a2a1a,#1a5a3a)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:fH,fontSize:14,color:"rgba(255,255,255,0.3)",fontWeight:700}}>AM</div>
              <div><div style={{fontSize:13,fontWeight:600,color:MT,marginBottom:2}}>Aman Tokyo</div><div style={{fontSize:11,color:"#9ca3af"}}>Mar 3–7, 2026 · Superior Room</div><div style={{fontSize:10,color:"#9ca3af",marginTop:2}}>Did you enjoy your stay?</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:700,color:"#9ca3af"}}>$2,848</div><button onClick={onWriteReview} style={{...s.primary,padding:"4px 10px",fontSize:10,marginTop:4,display:"block"}}>Write Review</button></div>
            </div>
          </div>)}
          {tab==="saved"&&(<div style={{padding:18}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>{[{ini:"BURJ",g:"135deg,#0f2d52,#1e5f74",n:"Burj Al Arab",p:"$850",l:"Dubai"},{ini:"RITZ",g:"135deg,#1a1040,#3a1860",n:"The Ritz Paris",p:"$1,200",l:"Paris"},{ini:"ATLS",g:"135deg,#1a3a20,#2a7040",n:"Atlantis The Palm",p:"$480",l:"Dubai"},{ini:"AMAN",g:"135deg,#0a1a10,#1a4a2a",n:"Aman Tokyo",p:"$640",l:"Tokyo"}].map(h=>(<div key={h.ini} style={{border:`1px solid ${BR}`,borderRadius:10,overflow:"hidden",cursor:"pointer"}}><div style={{height:90,background:`linear-gradient(${h.g})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}><span style={{fontFamily:fH,fontSize:24,color:"rgba(255,255,255,0.1)",fontWeight:700}}>{h.ini}</span><span style={{position:"absolute",top:6,right:7,color:"#f87171",fontSize:16,cursor:"pointer"}}>♥</span></div><div style={{padding:"9px 11px"}}><div style={{fontSize:12,fontWeight:600,color:TX,marginBottom:1}}>{h.n}</div><div style={{fontSize:10,color:MT}}>{h.l} · {h.p}/night</div></div></div>))}</div></div>)}
          {tab==="messages"&&(<div><div style={{padding:"12px 16px",display:"flex",gap:10,cursor:"pointer",background:"#eff6ff"}}><div style={{width:38,height:38,borderRadius:7,background:"linear-gradient(135deg,#0f2d52,#1e5f74)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"rgba(255,255,255,0.4)"}}>BA</div><div style={{flex:1,minWidth:0}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontSize:13,fontWeight:600,color:TX}}>Burj Al Arab Jumeirah</span><span style={{fontSize:10,color:MT}}>2h ago</span></div><div style={{fontSize:12,color:MT,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>Your suite is confirmed. Butler team will contact you...</div></div><div style={{width:8,height:8,borderRadius:"50%",background:N,flexShrink:0,marginTop:5}}/></div></div>)}
          {tab==="settings"&&(<div style={{padding:18}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}><div><label style={s.lbl}>First Name</label><input defaultValue="Alex" style={s.inp}/></div><div><label style={s.lbl}>Last Name</label><input defaultValue="Johnson" style={s.inp}/></div><div><label style={s.lbl}>Email</label><input defaultValue="alex.johnson@email.com" style={s.inp}/></div><div><label style={s.lbl}>Phone</label><input defaultValue="+1 415 555 0192" style={s.inp}/></div><div style={{gridColumn:"1/3"}}><label style={s.lbl}>New Password</label><input type="password" placeholder="Leave blank to keep current" style={s.inp}/></div></div><div style={{display:"flex",alignItems:"center",gap:10}}><button onClick={()=>{setSaveOk(true);setTimeout(()=>setSaveOk(false),2500);}} style={{...s.primary,padding:"10px 22px",fontSize:13}}>Save Changes</button>{saveOk&&<span style={{fontSize:12,color:GR,fontWeight:500}}>✓ Saved</span>}</div></div>)}
        </div>
      </>)}
    </div>
  );
}

function Nav({ page, setPage, loggedIn, onAuthClick }) {
  const pages=[["search","🔍","Search"],["deals","🏷","Deals"],["faq","❓","FAQ"],["listing","🏨","List Hotel"],["owner","📊","Dashboard"],["account","👤","Account"]];
  return (
    <nav style={{background:W,borderBottom:`1px solid ${BR}`,padding:"0 18px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 4px rgba(0,0,0,.06)",gap:6}}>
      <div onClick={()=>setPage("search")} style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",flexShrink:0}}>
        <div style={{width:24,height:24,background:N,borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🏢</div>
        <span style={{fontFamily:fH,fontSize:16,fontWeight:700,color:N}}>StayBridge</span>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"nowrap",overflowX:"auto"}}>
        {pages.map(([pg,icon,lbl])=>(<button key={pg} onClick={()=>setPage(pg)} style={s.navBtn(page===pg)}><span>{icon}</span><span style={{fontSize:11}}>{lbl}</span></button>))}
      </div>
      <button onClick={onAuthClick} style={{...s.primary,padding:"6px 14px",fontSize:12,flexShrink:0,display:"flex",alignItems:"center",gap:5}}>
        {loggedIn?(<div style={{width:26,height:26,borderRadius:"50%",background:`linear-gradient(135deg,${G},#8b6914)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:N}}>AJ</div>):<>🔐 Sign In</>}
      </button>
    </nav>
  );
}

export default function App() {
  const [page,setPage]=useState("search");
  const [modal,setModal]=useState(null);
  const [loggedIn,setLoggedIn]=useState(false);
  const [checkin,setCheckin]=useState(null);
  const [checkout,setCheckout]=useState(null);
  const [bookedHotel,setBookedHotel]=useState(null);

  const handleBook=(h)=>{setBookedHotel(h);setPage("payment");};
  const handleConfirm=()=>setPage("confirm");
  const handleLogin=()=>setLoggedIn(true);
  const applyDates=(ci,co)=>{setCheckin(ci);setCheckout(co);setModal(null);};

  return (
    <div style={{background:BG,minHeight:"100vh",fontFamily:f}}>
      <FontLoader/>
      <Nav page={page} setPage={setPage} loggedIn={loggedIn} onAuthClick={()=>loggedIn?setPage("account"):setModal("auth")}/>
      {page==="search"&&<SearchPage onBook={handleBook} checkin={checkin} checkout={checkout} onOpenCal={(mode)=>setModal("cal")}/>}
      {page==="deals"&&<DealsPage/>}
      {page==="faq"&&<FAQPage/>}
      {page==="listing"&&<ListingPage onSuccess={()=>setPage("owner")}/>}
      {page==="payment"&&<PaymentPage hotel={bookedHotel} checkin={checkin} checkout={checkout} onConfirm={handleConfirm}/>}
      {page==="confirm"&&<ConfirmationPage checkin={checkin} checkout={checkout} onViewBookings={()=>setPage("account")} onSearchMore={()=>setPage("search")}/>}
      {page==="owner"&&<OwnerDashboard/>}
      {page==="account"&&<AccountPage loggedIn={loggedIn} onWriteReview={()=>setModal("review")}/>}
      <AuthModal open={modal==="auth"} onClose={()=>setModal(null)} onLogin={handleLogin}/>
      <CalendarModal open={modal==="cal"} onClose={()=>setModal(null)} onApply={applyDates}/>
      <ReviewModal open={modal==="review"} onClose={()=>setModal(null)}/>
    </div>
  );
}
