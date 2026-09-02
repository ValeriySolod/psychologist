import Image from "next/image";
import styles from "@/styles/page.module.scss";

const contactUrl = "https://t.me/";

const people = [
  {
    meta: "Волонтер / інженер, 34 роки",
    name: "Андрій",
    story: "Днями працює, вечорами закриває волонтерські задачі. Вважає, що не має права втомлюватись — адже комусь зараз набагато важче. Про власне виснаження мовчить навіть із близькими.",
    result: "Дозвіл на відновлення ресурсу — без провини й без пафосу.",
  },
  {
    meta: "Мама, чоловік у ЗСУ, 32 роки",
    name: "Катерина",
    story: "Тримає весь тиловий фронт: діти, побут, тривоги — і постійне очікування звістки. Зривається на дітей, потім звинувачує себе. Про власний страх майже не говорить.",
    result: "Техніки саморегуляції та простір, де можна не бути сильною.",
  },
  {
    meta: "Мама в евакуації, 35 років",
    name: "Олена",
    story: "Нове місто, нова мова, дитина, яка сумує за домом. Провина за безпеку й відчуття, ніби життя поставлене на паузу. Важко просити про допомогу.",
    result: "Робота з провиною вцілілого та підтримка дитини у новій реальності.",
  },
];

const formatSteps = [
  ["1", "Написати", "Коротке повідомлення в месенджер — без анкет і зобов'язань. Достатньо кількох слів про те, що відбувається."],
  ["2", "Коротка розмова", "15 хвилин, щоб зорієнтуватись у запиті та узгодити зручний час і формат сесій."],
  ["3", "Перша сесія", "Онлайн, у зручний для вас час. Без оцінок і без потреби «доводити», що вам це потрібно."],
];

function SectionTitle({ label, title }: { label: string; title: string }) {
  return <div className={styles.sectionTitle}><span>{label}</span><h2>{title}</h2></div>;
}

function Button({ children, secondary = false, href = contactUrl }: { children: React.ReactNode; secondary?: boolean; href?: string }) {
  return <a className={secondary ? styles.buttonSecondary : styles.button} href={href}>{children}</a>;
}

function CheckList({ items }: { items: string[] }) {
  return <ul className={styles.checkList}>{items.map((item) => <li key={item}><i aria-hidden="true" />{item}</li>)}</ul>;
}

export default function HomePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Основна навігація">
          <a className={styles.brand} href="#top"><i />Марина Гнатюк</a>
          <input className={styles.menuToggle} type="checkbox" id="menu-toggle" />
          <label className={styles.menuButton} htmlFor="menu-toggle" aria-label="Відкрити меню"><span className={styles.menuIcon}><span /><span /><span /></span><span className={styles.menuLabel}>Меню сайту</span></label>
          <div className={styles.navMenu}>
            <div className={styles.navLinks}>
              <a href="#about">Про мене</a><a href="#people">Кому допомагаю</a><a href="#practices">Практики</a><a className={styles.sosLink} href="#sos">SOS</a><a href="#format">Формат</a>
            </div>
            <div className={styles.navCta}><Button href="#contact">Написати</Button></div>
          </div>
        </nav>
      </header>

      <section className={`${styles.hero} ${styles.wrap}`} id="top">
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Психологічна підтримка під час війни</span>
          <h1>Ви тримаєте фронт, якого ніхто не бачить.</h1>
          <p>Волонтерите, працюєте, тримаєте на собі родину — і водночас несете тривогу, яку нема з ким розділити. Тут можна нарешті визнати: щоб допомагати далі, вам теж потрібна опора.</p>
          <div className={styles.actions}><Button>Написати конфіденційно</Button><Button secondary href="#practices">Подивитись практики</Button></div>
        </div>
        <div className={styles.heroImage}>
          <Image src="/images/photos/hero-illustration@2x.png" alt="Жінка серед листя та птахів" width={1536} height={1024} priority />
        </div>
      </section>

      <section className={`${styles.thoughts} ${styles.wrap}`} aria-label="Поширені переживання">
        <div>«Психолог потрібен тим, кому гірше» — ця думка не дає собі дозволу зупинитись.</div>
        <div>Втома, у якій соромно зізнатись навіть найближчим людям.</div>
        <div>Бажання допомагати й далі — але ресурс майже на нулі.</div>
      </section>

      <section className={`${styles.section} ${styles.wrap}`} id="people">
        <SectionTitle label="Кому я допомагаю" title="Три історії, у яких часто впізнають себе" />
        <div className={styles.peopleGrid}>{people.map((person, index) => <article className={styles.personCard} data-tone={index} key={person.name}><span>{person.meta}</span><h3>{person.name}</h3><p>{person.story}</p><strong>{person.result}</strong></article>)}</div>
      </section>

      <section className={`${styles.about} ${styles.wrap}`} id="about">
        <div className={styles.portrait}><Image src="/images/photos/therapist-portrait@2x.jpg" alt="Психологиня Марина Гнатюк" width={714} height={1071} /></div>
        <div><SectionTitle label="Про мене" title="Психологиня-коучиня, яка розуміє контекст війни зсередини" />
          <p>Я працюю з людьми, чиє повсякденне життя триває поруч із війною: з волонтерами, родинами військових, тими, хто виїхав або залишився. Тут не потрібно доводити, що вам «достатньо важко».</p>
          <ul className={styles.bullets}><li>Психологиня, сертифікована коучиня (ICF)</li><li>Досвід супроводу родин військових та людей у вимушеній міграції</li><li>Онлайн-формат: сесії українською з будь-якої точки світу</li><li>Конфіденційність і анонімність на всіх етапах роботи</li></ul>
        </div>
      </section>

      <section className={styles.practices} id="practices">
        <div className={styles.wrap}>
          <SectionTitle label="Практики, які можна спробувати вже зараз" title="Кілька інструментів для щоденної опори" />
          <div className={styles.practiceGrid}>
            <article><span>Заземлення</span><h3>Техніка 5–4–3–2–1</h3><p>Коли тривога забирає відчуття «тут і зараз» — це швидкий спосіб повернути увагу до тіла й простору.</p><CheckList items={["5 речей, які бачите навколо", "4 речі, яких торкаєтесь", "3 звуки, які чуєте", "2 запахи, які відчуваєте", "1 глибокий видих"]} /></article>
            <article><span>Дихання за квадратом</span><h3>Box breathing 4×4</h3><p>Рівномірний ритм заспокоює нервову систему за кілька хвилин: вдих, пауза, видих, пауза — по чотири рахунки.</p><div className={styles.breathingFrame}><Image className={styles.breathing} src="/images/photos/breathing-exercise-steps-cutout@2x.png" alt="Вдих — вправа дихання за квадратом" width={384} height={256} /></div></article>
            <article><span>Для батьків</span><h3>Підтримка дитини при тривозі</h3><p>Дитина зчитує стан дорослого швидше за слова. Кілька простих опор для гострого моменту.</p><CheckList items={["Спершу — власний спокійний видих, потім слова", "Назвіть почуття дитини вголос: «Тобі страшно, я поруч»", "Дихайте разом — рахунок або пальці замість пояснень", "Після — коротка звична дія: казка, гра, обійми"]} /></article>
          </div>
        </div>
      </section>

      <section className={`${styles.sos} ${styles.wrap}`} id="sos">
        <div className={styles.sosInner}>
          <div><SectionTitle label="SOS-підтримка" title="Потрібна підтримка просто зараз?" /><p>Якщо гостра тривога, паніка чи важкий момент — не чекайте запланованої сесії. Напишіть одним повідомленням, і я відповім, щойно зможу.</p><div className={styles.actions}><Button>Telegram — написати зараз</Button><Button secondary>WhatsApp</Button></div><small>Якщо йдеться про загрозу життю — це не по моїй лінії. Зателефонуйте на національну гарячу лінію Lifeline Ukraine — <b>7333</b>, вона працює цілодобово та безкоштовно.</small></div>
          <aside><strong>7333</strong><p>Lifeline Ukraine — цілодобова лінія з питань психічного здоров&apos;я та кризових станів</p></aside>
        </div>
      </section>

      <section className={`${styles.section} ${styles.wrap}`} id="format">
        <SectionTitle label="Формат роботи" title="Просто, конфіденційно, у вашому темпі" />
        <div className={styles.steps}>{formatSteps.map(([number, title, text]) => <article key={number}><div><span>{number}</span><h3>{title}</h3></div><p>{text}</p></article>)}</div>
      </section>

      <section className={`${styles.testimonials} ${styles.wrap}`}>
        <SectionTitle label="Відгуки" title="Що кажуть після кількох сесій" />
        <div className={styles.testimonialsRow}><blockquote>«Довго вважав, що звертатись по допомогу — це ніби визнати, що я слабший за інших. Виявилось навпаки: стало легше саме допомагати далі.»<cite>— А., волонтер</cite></blockquote><blockquote>«Вперше за довгий час хтось запитав, як почуваюсь я, а не тільки “як там на фронті у чоловіка”. Це було саме те, чого не вистачало.»<cite>— К., мама двох дітей</cite></blockquote></div>
      </section>

      <section className={`${styles.contact} ${styles.wrap}`} id="contact"><div><SectionTitle label="Контакт" title="Один крок — коротке повідомлення" /><p>Не потрібно формулювати ідеально чи пояснювати «чому саме зараз». Досить написати те, що є.</p><div className={styles.actions}><Button>Написати в Telegram</Button><Button secondary>Написати в WhatsApp</Button></div></div></section>

      <footer className={`${styles.footer} ${styles.wrap}`}><p>© Марина Гнатюк — психологиня-коучиня. Онлайн-підтримка українською.</p><p>Якщо ви чи хтось поруч у гострій небезпеці або має думки про самогубство: <strong>Lifeline Ukraine — 7333</strong> (цілодобово, безкоштовно) або зверніться до найближчої служби екстреної допомоги.</p></footer>
    </main>
  );
}
