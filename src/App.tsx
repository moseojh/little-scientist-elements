"use client";

import { useMemo, useState } from "react";
import { elements, type ElementInfo } from "./elements";

const featured: ElementInfo[] = [1,2,6,7,8,11,13,14,17,26,29,79].map(n => elements[n-1]);

const quizzes = [
  { q: "우리가 숨 쉴 때 꼭 필요한 원소는?", choices: ["산소", "금", "헬륨"], answer: "산소" },
  { q: "풍선을 둥실 띄워 주는 원소는?", choices: ["철", "헬륨", "탄소"], answer: "헬륨" },
  { q: "연필심과 다이아몬드에 모두 있는 원소는?", choices: ["탄소", "구리", "염소"], answer: "탄소" },
];

export default function Home() {
  const [selected, setSelected] = useState<ElementInfo>(elements[0]);
  const [filter, setFilter] = useState("모두");
  const [query, setQuery] = useState("");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizResult, setQuizResult] = useState("");
  const visible = useMemo(() => featured.filter(e => filter === "모두" || e.group === filter), [filter]);
  const allVisible = useMemo(() => elements.filter(e => {
    const q = query.trim().toLowerCase();
    return (filter === "모두" || e.group === filter) && (!q || e.name.includes(q) || e.symbol.toLowerCase().includes(q) || String(e.n) === q);
  }), [filter, query]);
  const randomElement = () => {
    const next = elements[Math.floor(Math.random() * elements.length)];
    setSelected(next);
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <nav className="nav shell" aria-label="주요 메뉴">
        <a href="#top" className="brand"><span className="brand-orbit">⚛</span><span>꼬마 <b>원소 탐험대</b></span></a>
        <div className="nav-links"><a href="#friends">원소 친구들</a><a href="#lab">우주 실험실</a><a href="#guide">부모님 가이드</a></div>
      </nav>

      <section id="top" className="hero shell">
        <div className="hero-copy">
          <div className="question-pill">⭐ 오늘의 우주 질문</div>
          <h1>우주는 무엇으로<br/><em>만들어졌을까?</em></h1>
          <p>별도, 물도, 우리 몸도<br/>작은 <strong>원소 친구들</strong>로 이루어져 있어요.</p>
          <div className="hero-actions">
            <button onClick={randomElement} className="primary">🚀 오늘의 원소 뽑기 <span>›</span></button>
            <a href="#friends" className="text-link">🪐 원소 친구 만나기 ↓</a>
          </div>
          <div className="quick-cards">
            {featured.slice(0,4).map(e => <button key={e.symbol} className={`quick ${e.color}`} onClick={() => {setSelected(e); document.getElementById("explore")?.scrollIntoView({behavior:"smooth"})}}><small>{e.n}</small><b>{e.symbol}</b><span>{e.name}</span></button>)}
          </div>
        </div>
        <div className="hero-visual" aria-label="우주를 탐험하는 꼬마 우주인">
          <div className="planet planet-one">🪐</div><div className="planet planet-two">✦</div>
          <div className="astronaut"><div className="helmet">👦🏻</div><div className="body">★</div><div className="arm">☞</div></div>
          <div className="hero-element"><span>수소</span><strong>H</strong><div className="atom">●</div><small>1</small><p>우주에서 가장 많은 원소</p></div>
        </div>
      </section>

      <section id="friends" className="section shell">
        <div className="eyebrow">ELEMENT FRIENDS</div>
        <h2>먼저 만날 원소 친구들</h2>
        <p className="section-lead">118개를 한꺼번에 외우지 않아도 괜찮아요. 우리 주변에서 자주 만나는 친구부터 시작해요.</p>
        <div className="filters" role="group" aria-label="원소 분류">
          {["모두","비금속","금속","비활성 기체","알칼리 금속","준금속","할로젠"].map(g => <button className={filter===g?"active":""} key={g} onClick={()=>setFilter(g)}>{g}</button>)}
        </div>
        <div className="element-list">
          {visible.map(e => <button key={e.symbol} className={`element-card ${e.color}`} onClick={()=>{setSelected(e); document.getElementById("explore")?.scrollIntoView({behavior:"smooth"})}}><small>{e.n}</small><strong>{e.symbol}</strong><span>{e.name}</span><i>{e.emoji}</i></button>)}
        </div>
      </section>

      <section id="explore" className="detail-wrap">
        <div className="detail shell">
          <div className={`big-tile ${selected.color}`}><small>{selected.n}</small><strong>{selected.symbol}</strong><span>{selected.name}</span><i>{selected.emoji}</i></div>
          <div className="detail-copy"><div className="eyebrow">원자번호 {selected.n} · {selected.group} · {selected.state}</div><h2>{selected.catch}</h2><p>{selected.fact}</p><div className="found"><span>🔭 어디에서 만날까요?</span><b>{selected.seen}</b></div><div className="detail-actions"><button className="shuffle" disabled={selected.n===1} onClick={()=>setSelected(elements[selected.n-2])}>← 이전 원소</button><button className="shuffle" onClick={randomElement}>🎲 무작위 원소</button><button className="shuffle" disabled={selected.n===118} onClick={()=>setSelected(elements[selected.n])}>다음 원소 →</button></div></div>
        </div>
      </section>

      <section id="lab" className="section shell lab">
        <div><div className="eyebrow">SPACE LAB</div><h2>3초 원소 퀴즈</h2><p className="section-lead">정답을 몰라도 괜찮아요. 누르면서 하나씩 발견해요!</p></div>
        <div className="quiz-card">
          <div className="quiz-num">질문 {quizIndex+1} / {quizzes.length}</div><h3>{quizzes[quizIndex].q}</h3>
          <div className="choices">{quizzes[quizIndex].choices.map(c=><button key={c} onClick={()=>setQuizResult(c===quizzes[quizIndex].answer?"정답이에요! 우주 박사님 최고! 🌟":"아깝다! 다른 친구를 눌러볼까요? 🛸")}>{c}</button>)}</div>
          {quizResult && <p className="result" aria-live="polite">{quizResult}</p>}
          <button className="next" onClick={()=>{setQuizIndex((quizIndex+1)%quizzes.length);setQuizResult("")}}>다음 질문 →</button>
        </div>
      </section>

      <section className="periodic shell" aria-label="118개 원소 탐색기">
        <div><div className="eyebrow">ALL 118 ELEMENTS</div><h2>118개 원소를 모두 열어보세요</h2><p>원소 기호를 누르면 바로 설명이 열려요. 이름·기호·원자번호로도 찾을 수 있어요.</p></div>
        <label className="element-search"><span>🔎</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="예: 산소, O, 8" aria-label="원소 검색"/><b>{allVisible.length}개</b></label>
        <div className="filters all-filters" role="group" aria-label="전체 원소 분류">
          {["모두","비금속","금속","비활성 기체","알칼리 금속","알칼리 토금속","준금속","할로젠","란타넘족","악티늄족"].map(g => <button className={filter===g?"active":""} key={g} onClick={()=>setFilter(g)}>{g}</button>)}
        </div>
        <div className="symbol-grid">{allVisible.map(e=><button key={e.symbol} className={`${e.color} ${selected.n===e.n?"selected":""}`} onClick={()=>{setSelected(e); document.getElementById("explore")?.scrollIntoView({behavior:"smooth"})}} aria-label={`${e.n}번 ${e.name}`}><small>{e.n}</small><strong>{e.symbol}</strong><span>{e.name}</span></button>)}</div>
        {!allVisible.length && <p className="empty">찾는 원소가 없어요. 이름이나 기호를 다시 확인해 주세요. 🛸</p>}
      </section>

      <section id="guide" className="guide"><div className="shell guide-inner"><div><span>👨‍👩‍👧 함께 보는 어른께</span><h2>외우기보다 “어디에 있을까?”를 물어보세요.</h2></div><p>집 안에서 철, 알루미늄, 탄소가 들어간 물건을 찾아보는 것만으로도 훌륭한 과학 놀이가 됩니다. 한 번에 2~3개 원소만 천천히 만나보세요.</p></div></section>
      <footer className="shell">별 · 물 · 사람, 모두 원소로 이어진 하나의 우주예요. <span>✦</span></footer>
    </main>
  );
}
