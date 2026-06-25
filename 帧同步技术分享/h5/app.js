"use strict";

const scenes = [
  {
    id: "01",
    chapter: "第一幕",
    title: "肉眼看完全同步",
    line: "两个玩家站在同一个平台上，位置对得上，动作也对得上。",
    visual: "sync",
    payoff: "先建立观众共识：这确实像一个已经同步的游戏。",
    hook: "如果画面完全同步，为什么我还是不放心？",
    minutes: "0:00 - 1:00",
    detail: "从一个肉眼完全同步的项目开始，让所有人先相信：这看起来确实没有问题。"
  },
  {
    id: "02",
    chapter: "第一幕",
    title: "透明叠加后，缝开始露出来",
    line: "画面同步，不代表底层数据真的一致。",
    visual: "syncOverlay",
    payoff: "回应“为什么不放心”：肉眼只能看见表现，不一定能看见底层数据差异。",
    hook: "这点差异是真问题，还是可以忽略的显示误差？",
    minutes: "1:00 - 2:00",
    detail: "通过透明叠加和差异放大，让观众看到：表现层重合，不等于底层数据完全一致。"
  },
  {
    id: "03",
    chapter: "第一幕",
    title: "接入工具，两分钟后日志开始狂爆",
    line: "不是我主观怀疑，是不同步检测工具开始报警。",
    visual: "logs",
    payoff: "证明“不是肉眼误差那么简单”。",
    hook: "画面还没穿帮，工具凭什么说它不同步？",
    minutes: "2:00 - 4:00",
    detail: "接入检测工具之后，画面仍然没穿帮，但底层状态开始连续报警。"
  },
  {
    id: "04",
    chapter: "第二幕",
    title: "画面是一层，底层数据是另一层",
    line: "工具看的不是画面，而是每一帧关键状态是否一致。",
    visual: "data",
    payoff: "回答工具凭什么报警：它对比的是底层关键数据。",
    hook: "如果只是一个极小差异，为什么最后会变成整个世界分叉？",
    minutes: "4:00 - 8:00",
    detail: "把画面和底层数据拆开看：工具关心的是每一帧关键状态是否真的一致。"
  },
  {
    id: "05",
    chapter: "第三幕",
    title: "小兵往左还是往右，世界从这里分叉",
    line: "同步问题最可怕的地方，不是第一次误差，而是误差会成为下一帧的起点。",
    visual: "avalanche",
    payoff: "展开小误差如何逐帧放大，回收“为什么小差异会变严重”。",
    hook: "既然让每个客户端算出完全一样这么难，能不能让服务器来算？",
    minutes: "8:00 - 18:00",
    detail: "小兵寻路里的微小差异，会变成下一帧计算的起点，最后把整个世界带向不同结果。"
  },
  {
    id: "06",
    chapter: "第四幕",
    title: "逃离帧同步：让服务器算，是答案吗？",
    line: "状态同步没有消灭复杂度，只是把复杂度换了位置。",
    visual: "routes",
    payoff: "解释状态同步为什么自然登场，也为什么仍然昂贵。",
    hook: "帧同步和状态同步都贵，小团队怎么办？",
    minutes: "18:00 - 25:00",
    detail: "当帧同步太难扛，状态同步自然成为候选答案；但它只是把复杂度转移到了服务器模拟。"
  },
  {
    id: "07",
    chapter: "第五幕",
    title: "第三种复杂度分配方式",
    line: "拟真驱动整个世界每一帧运行，再以状态同步的方式做权威修正。",
    visual: "framework",
    payoff: "回应“有没有第三种方式”：本地拟真负责连续性，分布式权威负责拉回正确状态。",
    hook: "如果每个人都是自己的权威，那 PvP 怎么办？",
    minutes: "25:00 - 43:00",
    detail: "自研框架的核心登场：本地拟真维持连续体验，分布式权威持续把状态拉回正确轨道。"
  },
  {
    id: "08",
    chapter: "第五幕",
    title: "不是让坏事不发生，而是让坏事无处可藏",
    line: "可回放，才有资格谈审计；可审计，才有资格谈 PvP。",
    visual: "cheat",
    payoff: "回应客户端权威带来的防作弊质疑。",
    hook: "所以这套框架真正管理的到底是什么？",
    minutes: "43:00 - 49:00",
    detail: "客户端拥有权威之后，防作弊不靠口头承诺，而靠可回放、可审计的确定性数据。"
  },
  {
    id: "09",
    chapter: "第六幕",
    title: "企业级同步框架，管理的是偏差、复杂度和信任",
    line: "它不承诺世界永远不裂，但它要知道裂在哪里、怎么拉回、怎么复盘。",
    visual: "close",
    payoff: "回收全场：可观测、可修正、可回放、可审计。",
    hook: "无",
    minutes: "49:00 - 55:00",
    detail: "最终落点：成熟同步框架管理的不是 API，而是偏差、复杂度和信任。"
  }
];

const chapters = Array.from(new Set(scenes.map((scene) => scene.chapter)));
const state = {
  index: 0,
  overviewOpen: false
};

const el = {
  chapterNav: document.getElementById("chapterNav"),
  overview: document.getElementById("overview"),
  overviewGrid: document.getElementById("overviewGrid"),
  progressBar: document.getElementById("progressBar"),
  sceneKicker: document.getElementById("sceneKicker"),
  sceneTitle: document.getElementById("sceneTitle"),
  sceneLine: document.getElementById("sceneLine"),
  visualFrame: document.getElementById("visualFrame"),
  payoffText: document.getElementById("payoffText"),
  hookText: document.getElementById("hookText"),
  counter: document.getElementById("counter"),
  sceneDetail: document.getElementById("sceneDetail"),
  timeHint: document.getElementById("timeHint"),
  prevButton: document.getElementById("prevButton"),
  nextButton: document.getElementById("nextButton"),
  overviewButton: document.getElementById("overviewButton"),
  fullscreenButton: document.getElementById("fullscreenButton")
};

function render() {
  const scene = scenes[state.index];
  const progress = ((state.index + 1) / scenes.length) * 100;

  el.progressBar.style.width = `${progress}%`;
  el.sceneKicker.textContent = `${scene.chapter} · 镜头 ${scene.id}`;
  el.sceneTitle.textContent = scene.title;
  el.sceneLine.textContent = scene.line;
  el.payoffText.textContent = scene.payoff;
  el.hookText.textContent = scene.hook;
  el.counter.textContent = `${state.index + 1} / ${scenes.length}`;
  el.sceneDetail.textContent = scene.detail;
  el.timeHint.textContent = scene.minutes;
  el.visualFrame.innerHTML = renderVisual(scene.visual);

  document.querySelectorAll("[data-scene-index]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.sceneIndex) === state.index);
  });

  document.querySelectorAll("[data-chapter]").forEach((button) => {
    button.classList.toggle("active", button.dataset.chapter === scene.chapter);
  });
}

function renderNavigation() {
  el.chapterNav.innerHTML = chapters.map((chapter) => {
    const firstScene = scenes.find((scene) => scene.chapter === chapter);
    return `
      <button class="chapter-item" type="button" data-chapter="${chapter}">
        <strong>${chapter}</strong>
        <span>${firstScene.title}</span>
      </button>
    `;
  }).join("");

  el.overviewGrid.innerHTML = scenes.map((scene, index) => `
    <button class="scene-card" type="button" data-scene-index="${index}">
      <strong>${scene.id} · ${scene.title}</strong>
      <span>${scene.chapter} / ${scene.minutes}</span>
    </button>
  `).join("");
}

function renderVisual(type) {
  if (type === "sync" || type === "syncOverlay") {
    const ghost = type === "syncOverlay" ? '<div class="avatar ghost" aria-hidden="true"></div><div class="magnifier">差异放大镜<br>脚底 + 朝向<br>轻微偏移</div>' : "";
    return `
      <div class="visual-sync">
        <div class="client-stage">
          <div class="avatar" aria-hidden="true"></div>
          ${ghost}
        </div>
      </div>
    `;
  }

  if (type === "logs") {
    return `
      <div class="visual-logs">
        <div class="log-world">
          <div class="client-stage">
            <div class="avatar" aria-hidden="true"></div>
            <div class="avatar ghost" aria-hidden="true"></div>
          </div>
        </div>
        <div class="log-panel">
          <span class="timer">T + 02:00</span>
          <div class="log-line">检测工具已接入</div>
          <div class="log-line">第 7012 帧 / 校验通过</div>
          <div class="log-line error">第 7136 帧 / 位置不一致</div>
          <div class="log-line error">第 7137 帧 / 朝向不一致</div>
          <div class="log-line error">第 7138 帧 / 动画驱动值不一致</div>
          <div class="log-line error">第 7139 帧 / 世界状态不一致</div>
        </div>
      </div>
    `;
  }

  if (type === "data") {
    return `
      <div class="visual-data">
        <div class="data-layer">
          <h3>表现层</h3>
          <div class="data-row"><span>角色位置</span><span>看起来一致</span></div>
          <div class="data-row"><span>动作帧</span><span>看起来一致</span></div>
          <div class="data-row"><span>平台关系</span><span>看起来一致</span></div>
        </div>
        <div class="data-layer">
          <h3>底层数据</h3>
          <div class="data-row"><span>位置</span><b>出现偏移</b></div>
          <div class="data-row"><span>朝向</span><b>出现偏移</b></div>
          <div class="data-row"><span>动画驱动值</span><b>出现偏移</b></div>
        </div>
      </div>
    `;
  }

  if (type === "avalanche") {
    return `
      <div class="visual-avalanche">
        ${[12, 18, 30, 54, 96, 168, 260].map((height, index) => `<div class="bar" style="height:${height}px" data-frame="F${index + 1}"></div>`).join("")}
      </div>
    `;
  }

  if (type === "routes") {
    return `
      <div class="visual-routes">
        <div class="route-card">
          <h3>帧同步</h3>
          <p>不让服务器跑完整逻辑，但要求每个客户端每一帧都算出完全一致的世界。</p>
          <div class="cost-meter"><span style="width:86%"></span></div>
        </div>
        <div class="route-card">
          <h3>状态同步</h3>
          <p>让服务器成为中心权威，但服务器要理解并运行足够完整的游戏世界。</p>
          <div class="cost-meter"><span style="width:82%"></span></div>
        </div>
      </div>
    `;
  }

  if (type === "framework") {
    return `
      <div class="visual-framework">
        <div class="authority-map">
          <div class="link" style="width:42%;left:18%;top:24%;transform:rotate(20deg)"></div>
          <div class="link" style="width:42%;left:42%;top:24%;transform:rotate(160deg)"></div>
          <div class="link" style="width:35%;left:24%;bottom:28%;transform:rotate(-24deg)"></div>
          <div class="link" style="width:35%;left:48%;bottom:28%;transform:rotate(24deg)"></div>
          <div class="node a">玩家 A</div>
          <div class="node b">玩家 B</div>
          <div class="node c">AI 持有者</div>
          <div class="node d">道具持有者</div>
          <div class="node center">拟真驱动</div>
        </div>
      </div>
    `;
  }

  if (type === "cheat") {
    return `
      <div class="visual-cheat">
        <div class="replay-lane">
          <h3>对局数据</h3>
          <div class="replay-frame">输入序列</div>
          <div class="replay-frame">移动、攻击、朝向</div>
          <div class="replay-frame">关键状态快照</div>
        </div>
        <div class="replay-lane">
          <h3>帧完美回放</h3>
          <div class="replay-frame">正常帧：可解释</div>
          <div class="replay-frame bad">异常帧：无法由输入推导</div>
          <div class="replay-frame">频繁异常：进入判定</div>
        </div>
      </div>
    `;
  }

  return `
    <div class="visual-close">
      <div class="closing-grid">
        <div><strong>可观测</strong><span>先看见裂缝</span></div>
        <div><strong>可修正</strong><span>再拉回状态</span></div>
        <div><strong>可回放</strong><span>复盘整局</span></div>
        <div><strong>可审计</strong><span>判断信任</span></div>
      </div>
    </div>
  `;
}

function go(delta) {
  const next = Math.min(Math.max(state.index + delta, 0), scenes.length - 1);
  if (next !== state.index) {
    state.index = next;
    render();
  }
}

function goTo(index) {
  state.index = Math.min(Math.max(index, 0), scenes.length - 1);
  render();
}

function toggleOverview() {
  state.overviewOpen = !state.overviewOpen;
  el.overview.classList.toggle("open", state.overviewOpen);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

function bindEvents() {
  el.prevButton.addEventListener("click", () => go(-1));
  el.nextButton.addEventListener("click", () => go(1));
  el.overviewButton.addEventListener("click", toggleOverview);
  el.fullscreenButton.addEventListener("click", toggleFullscreen);

  el.chapterNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-chapter]");
    if (!button) return;
    const index = scenes.findIndex((scene) => scene.chapter === button.dataset.chapter);
    goTo(index);
  });

  el.overviewGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scene-index]");
    if (!button) return;
    goTo(Number(button.dataset.sceneIndex));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === " ") {
      event.preventDefault();
      go(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
    if (event.key.toLowerCase() === "o") {
      toggleOverview();
    }
    if (event.key.toLowerCase() === "f") {
      toggleFullscreen();
    }
  });
}

renderNavigation();
bindEvents();
render();
