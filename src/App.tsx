import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, BarChart3, BrainCircuit, Check, ChevronLeft, CircleCheck, Globe2, Layers3, Mail, Menu, MessageCircle, Palette, PenTool, Phone, Rocket, Search, Send, Sparkles, Target, X, type LucideIcon } from 'lucide-react'

const nav = [['الرئيسية', 'home'], ['من نحن', 'about'], ['خدماتنا', 'services'], ['أعمالنا', 'portfolio'], ['لماذا ناجح', 'why-us'], ['آلية العمل', 'process'], ['تواصل معنا', 'contact']]
const mobileNav = nav
const slides = [
  { src: '/images/hero-01.png', alt: 'تصميم تسويقي من أعمال ناجح — الصورة الأولى' },
  { src: '/images/hero-02.png', alt: 'تصميم تسويقي من أعمال ناجح — الصورة الثانية' },
  { src: '/images/hero-03.png', alt: 'تصميم تسويقي من أعمال ناجح — الصورة الثالثة' },
  { src: '/images/hero-04.png', alt: 'تصميم تسويقي من أعمال ناجح — الصورة الرابعة' },
  { src: '/images/hero-05.png', alt: 'تصميم تسويقي من أعمال ناجح — الصورة الخامسة' },
  { src: '/images/hero-06.png', alt: 'تصميم تسويقي من أعمال ناجح — الصورة السادسة' },
]
const services: [string, string, LucideIcon][] = [
  ['تصميم الهوية البصرية', 'هوية متفرّدة تمنح علامتك حضورًا لا يُنسى.', Palette],
  ['صناعة المحتوى', 'محتوى بصري وكتابي يحكي قصتك ويحرّك جمهورك.', PenTool],
  ['إدارة وسائل التواصل الاجتماعي', 'حضور يومي متسق يبني مجتمعًا حول علامتك.', MessageCircle],
  ['الإعلانات الرقمية', 'حملات ذكية تصل للعميل المناسب في الوقت الأنسب.', Target],
  ['تحسين محركات البحث SEO', 'ظهور مستدام أمام الأشخاص الذين يبحثون عنك.', Search],
  ['تصميم وتطوير المواقع', 'تجارب رقمية سريعة وأنيقة تحوّل الزيارة إلى فرصة.', Globe2],
  ['الاستشارات التسويقية', 'رؤية استراتيجية واضحة تساعدك على اتخاذ القرار.', BrainCircuit],
  ['تحليل البيانات والأداء', 'قرارات أوضح عبر قراءة عميقة لما تقوله الأرقام.', BarChart3],
]
const portfolio = [
  ['هوية بصرية', 'أثر', 'هوية فاخرة لعلامة عطور محلية', '/images/hero-01.png'], ['تسويق رقمي', 'مدار', 'استراتيجية نمو لمنصة تقنية', '/images/hero-02.png'],
  ['مواقع', 'واجهة', 'تجربة رقمية لعلامة تجارية طموحة', '/images/hero-03.png'], ['محتوى', 'نبض', 'نظام محتوى بصري متكامل', '/images/hero-04.png'],
  ['هوية بصرية', 'دار', 'هوية معمارية تتحدث بثقة', '/images/hero-05.png'], ['تسويق رقمي', 'بداية', 'إطلاق حملة لمنتج جديد', '/images/hero-06.png'],
]
const whyItems = [['استراتيجيات مخصصة', BrainCircuit], ['إبداع متجدد', Sparkles], ['خبرة تسويقية', Rocket], ['نتائج قابلة للقياس', BarChart3], ['حلول متكاملة', Layers3], ['دعم مستمر', CircleCheck]] as const
const process = [['01', 'نفهم احتياجك', 'نستمع لعلامتك وجمهورك وأهدافك.'], ['02', 'نبني الاستراتيجية', 'نرسم خطة واقعية قابلة للتنفيذ والقياس.'], ['03', 'ننفذ الحل', 'نحوّل الرؤية إلى محتوى وتجارب مؤثرة.'], ['04', 'نقيس النتائج', 'نتابع المؤشرات ونتعلم من كل خطوة.'], ['05', 'نطوّر وننمو', 'نحسّن الأداء ونضاعف أثره باستمرار.']]
const categories = ['الكل', 'هوية بصرية', 'تسويق رقمي', 'مواقع', 'محتوى']

function Logo({ light = false }: { light?: boolean }) {
  return <a href="#home" className="brand" aria-label="ناجح لخدمات التسويق الإلكتروني"><img src="/images/logo.png" alt="شعار ناجح" /><span className={light ? 'brand-caption light' : 'brand-caption'}>ناجح لخدمات التسويق الإلكتروني</span></a>
}

function SectionTitle({ eyebrow, title, text, center = false }: { eyebrow: string; title: ReactNode; text?: string; center?: boolean }) {
  return <div className={`section-title${center ? ' centered' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="section-copy">{text}</p>}</div>
}

function HeroSlider() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchStart = useRef<number | null>(null)
  const resumeTimer = useRef<number | null>(null)
  const go = useCallback((delta: number) => setActive((current) => (current + delta + slides.length) % slides.length), [])
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    updatePreference()
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])
  useEffect(() => {
    if (paused || reducedMotion) return
    const timer = window.setInterval(() => go(1), 5000)
    return () => window.clearInterval(timer)
  }, [active, go, paused, reducedMotion])
  useEffect(() => () => { if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current) }, [])
  const onSliderKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(1) }
    if (event.key === 'ArrowRight') { event.preventDefault(); go(-1) }
  }
  return <div className="hero-visual" role="region" aria-roledescription="عرض شرائح" aria-label="صور ناجح التسويقية" tabIndex={0} onKeyDown={onSliderKeyDown} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }} onTouchStart={(e) => { setPaused(true); if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current); touchStart.current = e.changedTouches[0].clientX }} onTouchEnd={(e) => { if (touchStart.current === null) return; const distance = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) go(distance > 0 ? 1 : -1); touchStart.current = null; resumeTimer.current = window.setTimeout(() => setPaused(false), 900) }}>
    <div className="visual-frame"><span className="frame-corner corner-a"/><span className="frame-corner corner-b"/>{slides.map((slide, index) => <img key={slide.src} src={slide.src} alt={slide.alt} className={`hero-slide${active === index ? ' active' : ''}`} fetchPriority={index === 0 ? 'high' : 'auto'} loading={index < 2 ? 'eager' : 'lazy'} />)}</div>
    <div className="slider-controls"><div className="slider-dots" role="group" aria-label="اختيار صورة العرض">{slides.map((slide, index) => <button key={slide.src} className={`slider-dot${active === index ? ' selected' : ''}`} onClick={() => setActive(index)} aria-label={`عرض الصورة ${index + 1}`} aria-current={active === index ? 'true' : undefined}/>)}</div><div className="slider-arrows"><button onClick={() => go(-1)} aria-label="الصورة السابقة"><ArrowRight size={18}/></button><button onClick={() => go(1)} aria-label="الصورة التالية"><ArrowLeft size={18}/></button></div></div>
  </div>
}

function Counter({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setCount(value); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const duration = 1200
      const animate = (now: number) => { const progress = Math.min((now - start) / duration, 1); setCount(Math.round(value * progress)); if (progress < 1) requestAnimationFrame(animate) }
      requestAnimationFrame(animate); observer.disconnect()
    }, { threshold: 0.4 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])
  return <div ref={ref}><strong className="counter-value">+{count}</strong><span className="counter-label">{label}</span></div>
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [filter, setFilter] = useState('الكل')
  const [sent, setSent] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 30); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { document.body.classList.toggle('menu-open', menu); return () => document.body.classList.remove('menu-open') }, [menu])
  useEffect(() => {
    if (!menu) return
    const closeOnEscape = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menu])
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const items = document.querySelectorAll('.section-title, .service-card, .about-card, .why-list article, .portfolio-card, .process-grid article, .testimonial-grid figure')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('in-view')
      observer.unobserve(entry.target)
    }), { threshold: 0.12 })
    items.forEach((item) => { item.classList.add('reveal-item'); observer.observe(item) })
    return () => observer.disconnect()
  }, [])
  const works = filter === 'الكل' ? portfolio : portfolio.filter(([category]) => category === filter)
  return <div className="site-shell" dir="rtl">
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}><div className="header-inner"><Logo/><nav className="desktop-nav" aria-label="التنقل الرئيسي">{nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><a href="#contact" className="button button-gold header-cta">ابدأ مشروعك <ArrowLeft size={15}/></a><button className="menu-toggle" onClick={() => setMenu((open) => !open)} aria-label={menu ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menu} aria-controls="mobile-navigation">{menu ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}</button></div></header>
    {menu && createPortal(<nav id="mobile-navigation" className="mobile-nav" aria-label="قائمة الهاتف">{mobileNav.map(([label, id]) => <a onClick={() => setMenu(false)} key={id} href={`#${id}`}>{label}<ChevronLeft size={17}/></a>)}<a className="mobile-cta" onClick={() => setMenu(false)} href="#contact">ابدأ مشروعك <ArrowLeft size={16}/></a></nav>, document.body)}
    <main>
      <section id="home" className="hero-section"><div className="hero-grid"/><div className="hero-glow glow-blue"/><div className="hero-glow glow-gold"/><div className="hero-inner"><div className="hero-copy"><div className="hero-kicker"><Sparkles size={15}/> شريكك في النمو الرقمي</div><h1>نصنع حضورًا رقميًا<br/><span>يصنع نتائج حقيقية</span></h1><p>ناجح لخدمات التسويق الإلكتروني — نبني استراتيجيات رقمية متكاملة تساعد علامتك التجارية على النمو والوصول إلى جمهورها وتحقيق نتائج قابلة للقياس.</p><div className="hero-actions"><a className="button button-gold" href="#contact">ابدأ مشروعك <ArrowLeft size={17}/></a><a className="button button-outline" href="#services">اكتشف خدماتنا</a></div><div className="hero-proof"><span className="proof-icon"><Check size={14}/></span> شريكك من الفكرة إلى النتيجة</div></div><HeroSlider/></div><div className="hero-bottom"><span>01 <i/> استراتيجية</span><span>02 <i/> إبداع</span><span>03 <i/> نمو مستدام</span></div></section>
      <section id="about" className="about-section section-pad"><div className="about-geometry"><span/><span/><span/></div><div className="about-inner"><div><SectionTitle eyebrow="من نحن" title={<>نحوّل الأفكار إلى حضور<br className="mobile-title-break"/> رقمي مؤثر</>} text="ناجح لخدمات التسويق الإلكتروني شريك نمو للعلامات التجارية الطموحة. نجمع بين الاستراتيجية والإبداع والتحليل لنصنع تجارب رقمية متكاملة، ونحوّل أهدافك إلى خطوات واضحة ونتائج قابلة للقياس."/><a className="text-link" href="#contact">تعرّف على خدماتنا <ArrowLeft size={16}/></a></div><div className="about-cards">{[['01','رؤيتنا','أن نكون الشريك الرقمي الموثوق للعلامات الطموحة.'],['02','رسالتنا','ابتكار حلول تسويقية تصنع نموًا حقيقيًا ومستدامًا.'],['03','قيمنا','الشغف والوضوح والإتقان والالتزام بالنتائج.']].map(([n, title, text], index) => <article className={`about-card${index === 1 ? ' featured' : ''}`} key={n}><b>{n}</b><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section id="services" className="services-section section-pad"><div className="container"><SectionTitle eyebrow="خدماتنا" title="كل ما تحتاجه علامتك لتنمو بثقة" text="حلول رقمية متكاملة تُصمم حول أهدافك وترافق علامتك في كل مرحلة من مراحل النمو." center/><div className="services-grid">{services.map(([title, text, Icon], index) => <article className="service-card" key={title}><span className="service-index">0{index + 1}</span><span className="service-icon"><Icon size={23}/></span><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`اطلب خدمة ${title}`}><ArrowLeft size={17}/></a></article>)}</div></div></section>
      <section id="why-us" className="why-section section-pad"><div className="container why-layout"><div><SectionTitle eyebrow="لماذا ناجح؟" title="شريك يرى الصورة كاملة" text="نبدأ بفهم ما يميزك، ثم نبني مسارًا تسويقيًا واضحًا يجمع الأدوات المناسبة ويقيس أثر كل خطوة."/><div className="why-stats"><Counter value={100} label="مشروع منجز"/><Counter value={50} label="عميل وثق بنا"/><Counter value={5} label="سنوات من الخبرة"/></div></div><div className="why-list">{whyItems.map(([title, Icon], index) => <article key={title}><span className="why-icon"><Icon size={20}/></span><div><h3>{title}</h3><p>{['خطط مبنية على أهداف عملك وجمهورك.', 'أفكار متجددة تعبّر عن شخصية علامتك.', 'فريق متخصص يفهم تحديات التسويق الرقمي.', 'مؤشرات واضحة تربط الجهد بأثره.', 'خدمات تعمل معًا ضمن رؤية واحدة.', 'نتابع معك ونساند خطواتك نحو النمو.'][index]}</p></div></article>)}</div></div></section>
      <section id="portfolio" className="portfolio-section section-pad"><div className="container"><div className="portfolio-heading"><SectionTitle eyebrow="أعمالنا" title="قصص رقمية نصنعها معًا" text="نماذج تصورية توضح كيف يلتقي الإبداع بالاستراتيجية لصناعة حضور مميز."/><div className="portfolio-filters" role="group" aria-label="تصفية الأعمال">{categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={filter === category ? 'active' : ''} aria-pressed={filter === category}>{category}</button>)}</div></div><div className="portfolio-grid">{works.map(([category, name, description, image]) => <article className="portfolio-card" key={name}><img src={image} alt={`تصور مشروع ${name} — ${category}`} loading="lazy"/><div className="portfolio-overlay"><span>{category}</span><h3>{name}</h3><p>{description}</p></div><span className="portfolio-open" aria-hidden="true"><ArrowLeft size={18}/></span></article>)}</div></div></section>
      <section id="process" className="process-section section-pad"><div className="container"><SectionTitle eyebrow="آلية العمل" title="خطوات واضحة نحو نتائج أكبر" text="رحلة تعاون منظمة تضع أهدافك في المقدمة من أول لقاء إلى التطوير المستمر." center/><div className="process-grid">{process.map(([number, title, text]) => <article key={number}><span>{number}</span><i/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="testimonial-section section-pad"><div className="container"><SectionTitle eyebrow="شراكة نعتز بها" title="نجاح شركائنا هو قصتنا" center/><div className="testimonial-grid">{[['فهم فريق ناجح علامتنا بسرعة، ثم ترجمها إلى حضور رقمي نشعر بالفخر به.', 'سارة العنسي', 'المديرة التنفيذية'], ['شراكة احترافية وواضحة ومليئة بالأفكار، تجمع الإبداع بالاهتمام بالتفاصيل.', 'عمر الحكيمي', 'مؤسس مشروع'], ['ساعدتنا ناجح على رؤية جمهورنا بوضوح والتواصل معه بطريقة أكثر تأثيرًا.', 'ليان القاضي', 'مديرة التسويق']].map(([quote, name, title]) => <figure key={name}><span className="quote-mark">“</span><blockquote>{quote}</blockquote><figcaption><b>{name}</b><span>{title}</span></figcaption></figure>)}</div></div></section>
      <section className="cta-section"><div className="cta-glow"/><Sparkles size={21}/><p className="eyebrow">خطوتك التالية تبدأ هنا</p><h2><span className="cta-title-desktop">جاهز لبناء حضور رقمي أقوى؟</span><span className="cta-title-mobile">جاهز لتحويل حضورك الرقمي؟</span></h2><p className="cta-copy">دعنا نحوّل طموحك إلى خطة واضحة ونتائج تستحقها علامتك.</p><div className="cta-actions"><a className="button button-gold" href="#contact">ابدأ مشروعك الآن <ArrowLeft size={17}/></a><a className="button button-outline" href="#contact">تواصل معنا</a></div></section>
      <section id="contact" className="contact-section section-pad"><div className="container contact-panel"><aside><p className="eyebrow">تواصل معنا</p><h2>لنبدأ قصة نجاحك التالية</h2><p className="contact-intro">أخبرنا عن مشروعك وطموحك، وسيعود إليك فريقنا لمناقشة الخطوة المناسبة.</p><div className="contact-details"><a href="mailto:hello@najah.digital"><Mail size={18}/> hello@najah.digital</a><a href="tel:+967700000000"><Phone size={18}/> +967 7XX XXX XXX</a><span><MessageCircle size={18}/> متاحون من الأحد إلى الخميس</span></div><div className="social-links"><a aria-label="إنستغرام" href="#contact">ig</a><a aria-label="فيسبوك" href="#contact">f</a><a aria-label="لينكدإن" href="#contact">in</a></div></aside><form onSubmit={(event) => { event.preventDefault(); setSent(true) }}><div className="form-grid"><label>الاسم<input name="name" required autoComplete="name" placeholder="الاسم الكامل"/></label><label>رقم الهاتف<input name="phone" type="tel" required autoComplete="tel" placeholder="رقم التواصل"/></label><label>البريد الإلكتروني<input name="email" type="email" autoComplete="email" placeholder="name@example.com"/></label><label>الخدمة<select name="service" defaultValue=""><option value="" disabled>اختر الخدمة المناسبة</option>{services.map(([title]) => <option key={title}>{title}</option>)}</select></label></div><label className="message-field">الرسالة<textarea name="message" required rows={4} placeholder="أخبرنا قليلًا عن مشروعك..."/></label><button className="button button-gold submit-button" type="submit">{sent ? 'تم استلام طلبك، شكرًا لك' : 'أرسل طلبك'} <Send size={15}/></button>{sent && <p className="form-success" role="status">شكرًا لتواصلك معنا، سنعود إليك قريبًا.</p>}</form></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-grid"><div><Logo light/><p className="footer-about">نبني استراتيجيات رقمية متكاملة تساعد علامتك التجارية على النمو والوصول لجمهورها.</p></div><div><h3>روابط سريعة</h3>{nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div><h3>خدماتنا</h3>{services.slice(0, 5).map(([title]) => <a key={title} href="#services">{title}</a>)}</div><div><h3>ابقَ على تواصل</h3><a href="mailto:hello@najah.digital">hello@najah.digital</a><a href="tel:+967700000000">+967 7XX XXX XXX</a><div className="footer-social"><a aria-label="إنستغرام" href="#contact">ig</a><a aria-label="فيسبوك" href="#contact">f</a><a aria-label="لينكدإن" href="#contact">in</a></div><a className="footer-contact-button" href="#contact">تواصل معنا <ArrowLeft size={15}/></a></div></div><div className="footer-bottom"><div className="container">© {new Date().getFullYear()} ناجح لخدمات التسويق الإلكتروني. جميع الحقوق محفوظة.</div></div></footer>
  </div>
}
