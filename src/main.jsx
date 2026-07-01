import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowLeft, ArrowRight, BarChart3, Bell, Check, ChevronRight,
  CircleDollarSign, CreditCard, Eye, Fingerprint, Home, LockKeyhole,
  Menu, Palette, Send, ShieldCheck, Sparkles, Target, UserRound, Wallet,
  X, Zap
} from 'lucide-react';
import './styles.css';

const navItems = [
  ['overview', 'Overview'],
  ['problem', 'Problem'],
  ['strategy', 'Strategy'],
  ['flows', 'User flows'],
  ['decisions', 'Key decisions'],
  ['system', 'Design system'],
  ['reflection', 'Reflection'],
];

const cardColors = [
  { name: 'Champagne', value: '#dcc9ae' },
  { name: 'Rose', value: '#d8aaa7' },
  { name: 'Sage', value: '#91a393' },
  { name: 'Powder', value: '#9eb6c8' },
  { name: 'Lavender', value: '#aaa3bd' },
];

function Logo({ light = false }) {
  return <div className={`logo ${light ? 'logo-light' : ''}`}><span>E</span><b>ELLIS</b></div>;
}

function Button({ children, secondary = false, onClick, className = '', ariaLabel }) {
  return (
    <button className={`button ${secondary ? 'button-secondary' : ''} ${className}`} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

function MiniCard({ color = '#dcc9ae', compact = false }) {
  return (
    <div className={`mini-card ${compact ? 'compact' : ''}`} style={{ '--card-color': color }}>
      <div className="card-top"><Logo /><span>VISA</span></div>
      <div className="chip"><i /><i /></div>
      <div className="card-bottom"><span>•••• 4582</span><span>12/28</span></div>
    </div>
  );
}

function Phone({ variant = 'home', cardColor = '#dcc9ae', className = '' }) {
  return (
    <div className={`phone ${className}`} aria-label={`${variant} mobile screen mockup`}>
      <div className="phone-bar"><span>9:41</span><div><i /><i /><i /></div></div>
      <div className="phone-content">
        {variant === 'home' && <>
          <div className="phone-heading"><div><small>Good morning</small><strong>Alex Morgan</strong></div><div className="avatar">AM</div></div>
          <div className="balance"><small>Total balance</small><strong>$24,860<sup>.40</sup></strong><span>+ 2.4% this month</span></div>
          <MiniCard color={cardColor} compact />
          <div className="quick-actions"><span><Send size={15}/>Send</span><span><CircleDollarSign size={15}/>Pay</span><span><Zap size={15}/>Top up</span></div>
          <div className="phone-section-title"><b>Recent activity</b><span>See all</span></div>
          <div className="transaction"><i>AC</i><div><b>Acqua Club</b><small>Today · Lifestyle</small></div><strong>−$42.00</strong></div>
          <div className="transaction"><i>AL</i><div><b>Alba Market</b><small>Yesterday · Groceries</small></div><strong>−$86.40</strong></div>
        </>}
        {variant === 'transfer' && <>
          <div className="screen-top"><ArrowLeft size={17}/><b>Review transfer</b><span /></div>
          <div className="recipient"><i>MS</i><small>You're sending</small><b>Maya Santos</b></div>
          <div className="transfer-amount">$1,240<sup>.00</sup></div>
          <div className="review-list"><span>From <b>Everyday •4582</b></span><span>Fee <b>$0.00</b></span><span>Arrival <b>Today</b></span></div>
          <button className="confirm-button"><LockKeyhole size={14}/>Confirm with Face ID</button>
          <div className="secure-note"><ShieldCheck size={14}/>Encrypted and protected</div>
        </>}
        {variant === 'analytics' && <>
          <div className="screen-top"><ArrowLeft size={17}/><b>Analytics</b><span>•••</span></div>
          <div className="period-tabs"><b>Month</b><span>Quarter</span><span>Year</span></div>
          <div className="spent"><small>Spent in May</small><strong>$3,842.60</strong><span>12% less than April</span></div>
          <div className="chart-bars">{[38,55,33,70,45,83,62].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div>
          <div className="category-row"><i className="cat-dot dining"/><span>Dining</span><b>$824</b><small>28%</small></div>
          <div className="category-row"><i className="cat-dot travel"/><span>Travel</span><b>$618</b><small>21%</small></div>
          <div className="category-row"><i className="cat-dot home"/><span>Home</span><b>$502</b><small>17%</small></div>
        </>}
        {variant === 'success' && <div className="success-screen">
          <div className="success-mark"><Check size={28}/></div><small>Transfer complete</small><strong>$1,240.00</strong><p>Maya Santos received your transfer.</p><button>View receipt</button><span>Done</span>
        </div>}
        <div className="phone-nav"><Home size={16}/><CreditCard size={16}/><CircleDollarSign size={16}/><BarChart3 size={16}/><UserRound size={16}/></div>
      </div>
      <div className="home-indicator" />
    </div>
  );
}

function ProjectHome({ openCaseStudy }) {
  const [cardColor, setCardColor] = useState(cardColors[0]);
  const [annual, setAnnual] = useState(true);
  const [signup, setSignup] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const capabilities = [
    [Wallet,'Accounts','See every balance and move money without hunting through menus.'],
    [CreditCard,'Cards','Freeze, set limits, reveal PIN and personalize in one place.'],
    [Send,'Transfers','A clear four-step flow with fees and arrival time up front.'],
    [BarChart3,'Analytics','Understand where, how much and compared to when.'],
    [Target,'Savings','Goals with visible progress and realistic completion estimates.'],
    [Sparkles,'Investments','Portfolio essentials without the trading-terminal noise.'],
    [Bell,'Smart alerts','Useful signals, shaped around the moments you choose.'],
    [ShieldCheck,'Security','Face ID, 2FA and device controls that stay discoverable.']
  ];
  const faqs = [
    ['Is Ellis a real bank?','Ellis is a product concept exploring how premium digital banking could feel. This website and prototype are portfolio work, not a live financial service.'],
    ['How is my account protected?','The product concept uses Face ID, passcodes, two-factor authentication, encrypted sessions and clear device management.'],
    ['Can I use Ellis while traveling?','Travel-friendly card controls, instant notifications and transparent foreign transaction information are part of the product model.'],
    ['Can I change my plan later?','Yes. Plan changes are designed to be transparent, effective at the next billing date and reversible from Profile.']
  ];
  return (
    <main className="project-home">
      <header className="project-header">
        <Logo light />
        <nav><a href="#product">Product</a><a href="#security">Security</a><a href="#pricing">Plans</a><button className="ux-entry" onClick={openCaseStudy}><Sparkles size={15}/>UX Case Study</button><button className="header-cta" onClick={()=>setSignup(true)}>Join Ellis</button></nav>
      </header>
      <section className="cover">
        <div className="cover-copy">
          <div className="eyebrow light">PREMIUM MOBILE BANKING · iOS</div>
          <h1>Banking,<br/><em>beautifully clear.</em></h1>
          <p>A calm financial experience designed for people who expect clarity, confidence and a little more grace from their bank.</p>
          <div className="cover-actions">
            <Button onClick={()=>setSignup(true)}>Open your account <ArrowRight size={17}/></Button>
            <button className="case-link" onClick={openCaseStudy}>Read UX Case Study <ArrowDown size={15}/></button>
          </div>
          <div className="project-meta"><span><small>ROLE</small>Product / UX / UI</span><span><small>PLATFORM</small>iOS</span><span><small>STATUS</small>Concept</span></div>
        </div>
        <div className="cover-visual">
          <div className="halo" />
          <Phone cardColor={cardColor.value} className="hero-phone" />
          <div className="floating-card"><small>CARD PERSONALIZATION</small><b>{cardColor.name} Pearl</b><div>{cardColors.map(c=><button key={c.name} onClick={()=>setCardColor(c)} aria-label={`Set card color ${c.name}`} className={cardColor.name===c.name?'active':''} style={{background:c.value}} />)}</div></div>
          <div className="floating-stat"><span>Monthly spend</span><b>$3,842</b><small>↓ 12% from April</small></div>
        </div>
      </section>
      <section className="preview" id="preview">
        <div className="preview-intro"><span>SELECTED SCREENS</span><h2>Quiet by design.<br/>Powerful when needed.</h2><p>Everyday actions stay close. Complexity appears only when the user asks for it.</p></div>
        <div className="screen-row"><Phone variant="transfer"/><Phone variant="analytics"/><Phone variant="success"/></div>
      </section>
      <section className="product-suite" id="product">
        <div className="suite-intro"><span>ONE CALM FINANCIAL HOME</span><h2>Everything you need.<br/><em>Nothing fighting for attention.</em></h2><p>Ellis brings everyday money, long-term goals and premium services into one predictable system.</p></div>
        <div className="capability-grid">{capabilities.map(([Icon,title,copy])=><article key={title}><Icon/><h3>{title}</h3><p>{copy}</p><button>Explore <ArrowRight size={13}/></button></article>)}</div>
      </section>
      <section className="security-section" id="security">
        <div className="security-art"><div className="security-ring"><Fingerprint/><i/><i/><i/></div><div className="security-toast"><Check/><span><b>Face ID confirmed</b><small>It’s really you</small></span></div></div>
        <div className="security-copy"><span>SECURITY YOU CAN UNDERSTAND</span><h2>Protection without<br/><em>the mystery.</em></h2><p>Strong security should feel reassuring, not obscure. Ellis makes every device, permission and sensitive action visible and controllable.</p><ul><li><Check/>Freeze any card in one tap</li><li><Check/>Review active devices and sessions</li><li><Check/>Confirm critical actions with Face ID</li><li><Check/>Color never carries meaning alone</li></ul><button onClick={()=>setSignup(true)}>Explore security <ArrowRight/></button></div>
      </section>
      <section className="wealth-section">
        <div><span>BEYOND EVERYDAY BANKING</span><h2>Make room for<br/><em>what comes next.</em></h2><p>Savings and investments use the same calm language as everyday banking—clear progress, plain risk information and no pressure to perform.</p></div>
        <div className="goal-card"><small>COASTAL HOME</small><strong>$42,850</strong><span>of $75,000</span><div><i/></div><footer><b>57% complete</b><span>On track · Aug 2028</span></footer></div>
        <div className="portfolio-card"><small>PORTFOLIO</small><strong>$118,420</strong><span>+$8,240 this year</span><div className="mini-allocation"><i/><i/><i/></div><footer><span>Global equity</span><span>Bonds</span><span>Cash</span></footer></div>
      </section>
      <section className="pricing-section" id="pricing">
        <div className="pricing-head"><span>MEMBERSHIP</span><h2>Choose how much bank<br/><em>you want around you.</em></h2><div className="billing-toggle"><button className={!annual?'active':''} onClick={()=>setAnnual(false)}>Monthly</button><button className={annual?'active':''} onClick={()=>setAnnual(true)}>Annual · save 20%</button></div></div>
        <div className="plan-grid">{[
          ['Essential',0,'Everyday clarity',['Accounts and cards','Instant transfers','Monthly analytics']],
          ['Signature',annual?15:19,'More insight, more reach',['Everything in Essential','Advanced analytics','Priority support','Travel benefits']],
          ['Private',annual?39:49,'A more personal bank',['Everything in Signature','Dedicated advisor','Investment insights','Lifestyle concierge']]
        ].map(([name,price,desc,features],i)=><article className={i===1?'featured-plan':''} key={name}>{i===1&&<span>MOST POPULAR</span>}<h3>{name}</h3><p>{desc}</p><div className="plan-price"><b>${price}</b><small>{price?'/ month':'forever'}</small></div><ul>{features.map(f=><li key={f}><Check/>{f}</li>)}</ul><button onClick={()=>setSignup(true)}>{price?'Choose plan':'Get started'} <ArrowRight/></button></article>)}</div>
      </section>
      <section className="faq-section"><div><span>COMMON QUESTIONS</span><h2>Small print,<br/><em>made readable.</em></h2></div><div className="faq-list">{faqs.map(([q,a],i)=><article key={q}><button onClick={()=>setOpenFaq(openFaq===i?-1:i)}><span>{q}</span><b>{openFaq===i?'−':'+'}</b></button>{openFaq===i&&<p>{a}</p>}</article>)}</div></section>
      <section className="case-cta">
        <span>THE THINKING BEHIND THE PIXELS</span><h2>Pretty screens are the beginning,<br/><em>not the argument.</em></h2><Button onClick={openCaseStudy}>Open full UX Case Study <ArrowRight size={17}/></Button>
      </section>
      <footer className="saas-footer"><div><Logo light/><p>Banking, beautifully clear.</p></div><div><span>PRODUCT</span><a href="#product">Accounts</a><a href="#product">Cards</a><a href="#product">Analytics</a></div><div><span>COMPANY</span><button onClick={openCaseStudy}>UX Case Study</button><a href="#security">Security</a><a href="#pricing">Membership</a></div><div><span>LEGAL</span><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#accessibility">Accessibility</a></div><small>© 2026 Ellis Bank concept. Not a real financial institution.</small></footer>
      {signup&&<div className="signup-overlay" onClick={()=>setSignup(false)}><div className="signup-modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSignup(false)} aria-label="Close"><X/></button><Logo/><span>EARLY ACCESS</span><h2>Your quieter bank<br/>starts here.</h2><p>This is a concept signup. Enter any email to preview the completion state.</p><form onSubmit={e=>{e.preventDefault();e.currentTarget.innerHTML='<div class="signup-success">✓<b>You’re on the list.</b><span>We’ll keep it quiet until there is something worth saying.</span></div>'}}><label>Email address<input required type="email" placeholder="alex@example.com"/></label><button>Request early access <ArrowRight/></button></form><small>No spam. No financial service is being offered.</small></div></div>}
    </main>
  );
}

function SectionTitle({ index, kicker, title, children }) {
  return <div className="section-title"><div className="section-index">{index}</div><div><span>{kicker}</span><h2>{title}</h2>{children && <p>{children}</p>}</div></div>;
}

function CaseStudy({ closeCaseStudy }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    window.scrollTo(0,0);
    const handle = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);
  const go = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenuOpen(false); };
  return (
    <main className="case-study">
      <div className="progress-bar" style={{width:`${progress}%`}} />
      <header className="case-header"><button className="back-project" onClick={closeCaseStudy}><ArrowLeft size={16}/>Back to project</button><Logo/><button className="menu-button" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Open table of contents">{menuOpen?<X/>:<Menu/>}</button></header>
      <aside className={`case-nav ${menuOpen?'open':''}`}><span>CASE STUDY</span>{navItems.map(([id,label],i)=><button key={id} onClick={()=>go(id)}><small>0{i+1}</small>{label}</button>)}</aside>

      <section className="case-hero" id="overview">
        <div className="case-hero-copy"><div className="eyebrow">ELLIS BANK · UX CASE STUDY</div><h1>How do you make<br/>money feel <em>quieter?</em></h1><p>A premium mobile banking concept that treats clarity, trust and emotional comfort as core product features.</p><div className="hero-facts"><span><small>MY ROLE</small>Product Designer</span><span><small>SCOPE</small>End-to-end concept</span><span><small>PLATFORM</small>iOS</span></div></div>
        <div className="case-hero-art"><div className="arch"><Phone/></div><div className="trust-pill"><Fingerprint/><span><b>Trust, made visible</b><small>Security without friction</small></span></div></div>
      </section>

      <section className="case-section opening-statement"><blockquote>“Premium” should not mean more features on screen. It should mean fewer moments of doubt.</blockquote><div className="metric-strip"><span><b>4</b><small>steps to transfer</small></span><span><b>1</b><small>tap to freeze a card</small></span><span><b>1</b><small>level for daily tasks</small></span><span><b>44px</b><small>minimum touch target</small></span></div></section>

      <section className="case-section" id="problem">
        <SectionTitle index="01" kicker="THE PROBLEM" title="More information. Less confidence.">Banking dashboards often compete for attention exactly when users need calm, speed and certainty.</SectionTitle>
        <div className="problem-grid"><div className="problem-copy"><h3>The paradox</h3><p>Modern banks add features to create value, but dense dashboards can bury the very actions people use most. Premium clients do not need fewer capabilities. They need better timing and hierarchy.</p><ul><li><span>01</span>Overwhelming dashboards</li><li><span>02</span>Hidden security controls</li><li><span>03</span>Hard-to-scan activity</li><li><span>04</span>Uncertain transfer states</li></ul></div><div className="noise-card"><div className="noise-before"><small>TYPICAL DASHBOARD</small>{Array.from({length:12}).map((_,i)=><i key={i}/>)}</div><ArrowRight/><div className="noise-after"><small>ELLIS HOME</small><b>$24,860.40</b><MiniCard compact/><span>3 clear actions</span></div></div></div>
        <div className="concept-note"><Target/><div><b>A note on evidence</b><p>This is a concept project. The problem framing is based on heuristic analysis and category patterns—not claimed user research. The next research step is defined at the end of this case study.</p></div></div>
      </section>

      <section className="case-section sage-section" id="strategy">
        <SectionTitle index="02" kicker="PRODUCT STRATEGY" title="Calm is a system, not a style.">The interface is guided by five principles that turn the emotional goal into repeatable product decisions.</SectionTitle>
        <div className="principle-grid">
          {[['01','Clarity before decoration','Every screen states its purpose immediately.'],['02','Important information first','Balance before detail. Actions before settings.'],['03','Progressive disclosure','Complexity waits until it is useful.'],['04','Predictable patterns','Position and meaning stay consistent.'],['05','Calm banking','Nothing flashes or competes for attention.']].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
        </div>
        <div className="audience"><div><span>PRIMARY AUDIENCE</span><h3>Designed for financially active lives.</h3></div><div className="audience-tags"><span>Professionals 25–50</span><span>Frequent travelers</span><span>Freelancers</span><span>Business owners</span><span>Multi-account users</span></div></div>
      </section>

      <section className="case-section" id="flows">
        <SectionTitle index="03" kicker="FLOWS & ARCHITECTURE" title="Everyday tasks stay shallow.">The navigation never exceeds one level of depth for common actions. Context carries users forward; menus do not make them hunt.</SectionTitle>
        <div className="flow-block"><div className="flow-label"><Send/><span><b>Send money</b><small>High-confidence path</small></span></div><div className="flow-line">{['Home','Recipient','Amount','Review','Success','Receipt'].map((v,i)=><React.Fragment key={v}><span className={i===4?'success-node':''}>{i===4&&<Check size={13}/>} {v}</span>{i<5&&<ChevronRight/>}</React.Fragment>)}</div></div>
        <div className="flow-block"><div className="flow-label"><Palette/><span><b>Customize card</b><small>Emotional utility</small></span></div><div className="flow-line">{['Home','Card','Customize','Color','Save','Updated'].map((v,i)=><React.Fragment key={v}><span>{v}</span>{i<5&&<ChevronRight/>}</React.Fragment>)}</div></div>
        <div className="ia-map"><div className="ia-root"><Logo/><span>5 destinations</span></div><div className="ia-branches">{[[Home,'Home','Balance · actions · activity'],[CreditCard,'Cards','Controls · details · style'],[CircleDollarSign,'Payments','Transfer · bills · history'],[BarChart3,'Analytics','Spend · compare · insights'],[UserRound,'Profile','Security · support · settings']].map(([Icon,t,d])=><div key={t}><Icon/><b>{t}</b><small>{d}</small></div>)}</div></div>
      </section>

      <section className="case-section dark-section" id="decisions">
        <SectionTitle index="04" kicker="KEY UX DECISIONS" title="Confidence is designed into the sequence." />
        <div className="decision-row"><div className="decision-copy"><span>DECISION 01 · HOME</span><h3>A dashboard with an opinion.</h3><p>The home screen does not try to summarize the entire bank. It answers three questions first: “How much do I have?”, “What can I do?” and “What just happened?”</p><div className="decision-rule"><b>Hierarchy</b><span>Balance → Card → Actions → Activity</span></div></div><Phone/></div>
        <div className="decision-row reverse"><div className="decision-copy"><span>DECISION 02 · TRANSFER</span><h3>Review before commitment.</h3><p>Recipient, amount, source account, fee and speed remain visible together at the moment of confirmation. The user should never need memory to verify a transfer.</p><div className="decision-rule"><b>Error prevention</b><span>One review screen, one deliberate action</span></div></div><Phone variant="transfer"/></div>
        <div className="decision-row"><div className="decision-copy"><span>DECISION 03 · ANALYTICS</span><h3>Answers, not reports.</h3><p>Analytics is organized around plain questions: where, how much and compared to when. Charts support the answer instead of becoming the task.</p><div className="decision-rule"><b>Progressive detail</b><span>Summary first, category depth on demand</span></div></div><Phone variant="analytics"/></div>
      </section>

      <section className="case-section" id="system">
        <SectionTitle index="05" kicker="DESIGN SYSTEM" title="Soft visually. Rigorous underneath.">The visual language pairs private-banking warmth with a predictable 8-point system and accessible interaction rules.</SectionTitle>
        <div className="system-grid"><div className="type-sample"><span>TYPOGRAPHY</span><b>Aa</b><h3>Elegant when it speaks.<br/><em>Quiet when it explains.</em></h3><p>Display / Georgia<br/>Interface / Arial</p></div><div className="color-sample"><span>COLOR</span><div><i style={{background:'#102d27'}}/><i style={{background:'#d8c5a7'}}/><i style={{background:'#9aa596'}}/><i style={{background:'#f3eee5'}}/><i style={{background:'#9f4f48'}}/></div><p>Forest · Champagne · Sage · Canvas · Signal</p></div><div className="tokens"><span>CORE TOKENS</span><b>8 <small>pt grid</small></b><b>24 <small>px radius</small></b><b>44 <small>px touch</small></b><b>200 <small>ms motion</small></b></div></div>
        <div className="accessibility"><div><Eye/><span><b>Contrast</b><small>Text remains legible across soft surfaces.</small></span></div><div><Fingerprint/><span><b>Non-color cues</b><small>State always includes shape, icon or label.</small></span></div><div><Zap/><span><b>Motion restraint</b><small>150–250 ms, reduced-motion aware.</small></span></div><div><ShieldCheck/><span><b>Clear labels</b><small>Security actions never rely on icons alone.</small></span></div></div>
      </section>

      <section className="case-section reflection" id="reflection">
        <SectionTitle index="06" kicker="REFLECTION" title="What this concept proves—and what it does not." />
        <div className="reflection-grid"><div><span>THE PRODUCT BET</span><h3>Emotional comfort can be functional.</h3><p>Calm hierarchy, explicit confirmation and restrained motion do more than create a premium aesthetic. They can reduce hesitation and help users understand consequences before acting.</p></div><div><span>WHAT I’D VALIDATE NEXT</span><ol><li>Can users find card security controls without prompting?</li><li>Do transfer review details reduce backtracking?</li><li>Which home-screen modules earn their place?</li><li>Does personalization increase attachment without distraction?</li></ol></div></div>
        <div className="validation-plan"><article><small>01 · DISCOVER</small><b>6 moderated interviews</b><p>Map anxiety, routines and language around money movement.</p></article><article><small>02 · TEST</small><b>Task-based prototype</b><p>Transfer, freeze a card and understand monthly spend.</p></article><article><small>03 · MEASURE</small><b>Confidence + completion</b><p>Track success, errors, time, backtracking and perceived certainty.</p></article></div>
      </section>

      <footer className="case-footer"><Logo light/><h2>Thank you for<br/><em>following the thinking.</em></h2><Button onClick={closeCaseStudy}>Back to visual project <ArrowRight size={17}/></Button><small>Ellis Bank · Product / UX / UI · Concept project</small></footer>
    </main>
  );
}

function App() {
  const [caseOpen, setCaseOpen] = useState(window.location.hash === '#case-study');
  const openCaseStudy = () => { setCaseOpen(true); history.pushState(null,'','#case-study'); };
  const closeCaseStudy = () => { setCaseOpen(false); history.pushState(null,'','#'); window.scrollTo(0,0); };
  useEffect(()=>{ const pop=()=>setCaseOpen(window.location.hash==='#case-study'); window.addEventListener('popstate',pop); return()=>window.removeEventListener('popstate',pop); },[]);
  return caseOpen ? <CaseStudy closeCaseStudy={closeCaseStudy}/> : <ProjectHome openCaseStudy={openCaseStudy}/>;
}

createRoot(document.getElementById('root')).render(<App />);
