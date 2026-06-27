"use strict";

const scenes = [
  {
    id: "01",
    chapter: "第一幕",
    title: "肉眼看完全同步",
    line: "两个玩家站在同一个平台上，位置对得上，动作也对得上。",
    visual: "sync",
    answered: "先建立观众共识：这确实像一个已经同步的游戏。",
    nextQuestion: "画面同步，为什么我还不放心？",
    minutes: "0:00 - 1:00",
    detail: "从一个肉眼完全同步的项目开始，让所有人先相信：这看起来确实没有问题。"
  },
  {
    id: "02",
    chapter: "第一幕",
    title: "透明叠加后，缝开始露出来",
    line: "画面同步，不代表底层数据真的一致。",
    visual: "syncOverlay",
    answered: "回应“为什么不放心”：肉眼只能看见表现，不一定能看见底层数据差异。",
    nextQuestion: "这点差异是真问题，还是可以忽略的显示误差？",
    minutes: "1:00 - 2:00",
    detail: "通过透明叠加和差异放大，让观众看到：表现层重合，不等于底层数据完全一致。"
  },
  {
    id: "03",
    chapter: "第一幕",
    title: "接入工具，两分钟后日志开始狂爆",
    line: "不是我主观怀疑，是不同步检测工具开始报警。",
    visual: "logs",
    answered: "证明“不是肉眼误差那么简单”。",
    nextQuestion: "画面还没穿帮，工具凭什么说它不同步？",
    minutes: "2:00 - 4:00",
    detail: "接入检测工具之后，画面仍然没穿帮，但底层状态开始连续报警。"
  },
  {
    id: "04",
    chapter: "第二幕",
    title: "画面是一层，数据是另一层",
    line: "工具看的不是画面，而是每一帧关键状态是否一致。",
    visual: "data",
    answered: "回答工具凭什么报警：它对比的是底层关键数据。",
    nextQuestion: "底层数据差异从哪来？",
    minutes: "4:00 - 5:30",
    detail: "把画面和底层数据拆开看：工具关心的是每一帧关键状态是否真的一致。"
  },
  {
    id: "05",
    chapter: "第二幕",
    title: "动画驱动，是一扇暗门",
    line: "你以为核心逻辑已经定点数化，但动画背后仍然可能是 Unity 的 float。",
    visual: "dataLeak",
    answered: "点出真实根因线索：动画驱动逻辑没有被定点数约束。",
    nextQuestion: "这么小的漏口，为什么会变成世界报警？",
    minutes: "5:30 - 7:00",
    detail: "平台跳跃射击项目里，一部分逻辑由动画驱动，而动画背后仍然受 float 影响。"
  },
  {
    id: "06",
    chapter: "第二幕",
    title: "工具不是修复，它是眼睛",
    line: "看不见不同步，就谈不上解释不同步，更谈不上解决不同步。",
    visual: "toolValue",
    answered: "把工具价值拔高为企业级门槛：先看见，再定位。",
    nextQuestion: "看见不同步后，下一步最难的是什么？",
    minutes: "7:00 - 9:00",
    detail: "企业级工程不能靠盯屏幕判断同步状态，必须把“感觉”变成“可证明”。"
  },
  {
    id: "07",
    chapter: "第二幕",
    title: "真正难的是找到第一帧",
    line: "日志告诉你世界已经不一样，但它不会自动告诉你第一刀切在哪里。",
    visual: "traceFrame",
    answered: "说明工具只是开始，不是终点。",
    nextQuestion: "一帧里的小差异，凭什么能滚成整个世界对不上？",
    minutes: "9:00 - 10:00",
    detail: "从报警回到根因追溯：同步问题要找到最早分叉的那一帧。"
  },
  {
    id: "08",
    chapter: "第三幕",
    title: "手机射击 MOBA 登场",
    line: "双线、防御塔、小兵、敌人，一个普通场景就足够让世界分叉。",
    visual: "mobaMap",
    answered: "切入手机射击 MOBA 的真实踩坑案例。",
    nextQuestion: "普通 MOBA 场景里，分叉最早发生在哪？",
    minutes: "10:00 - 11:30",
    detail: "这个案例使用 Unity float、物理引擎和寻路，却硬走了帧同步路线。"
  },
  {
    id: "09",
    chapter: "第三幕",
    title: "帧同步真正同步的不是操作",
    line: "输入一样，不代表结果一定一样；每一帧状态都一致，才是帧同步的隐藏条件。",
    visual: "frameCondition",
    answered: "解释为什么底层数据差异不能忽略。",
    nextQuestion: "哪个普通逻辑会成为分叉起点？",
    minutes: "11:30 - 13:00",
    detail: "帧同步最难的是让多个客户端在每一帧都算出同一个世界。"
  },
  {
    id: "10",
    chapter: "第三幕",
    title: "小兵会打哪座塔？",
    line: "AI 规则很简单：选最近的防御塔。问题是，两个客户端眼里的“最近”可能不一样。",
    visual: "minionGuess",
    answered: "把确定性问题落到一个具体判断上。",
    nextQuestion: "如果两个客户端算出不同结果，会怎样？",
    minutes: "13:00 - 14:30",
    detail: "小兵站在两座防御塔之间，让观众先参与判断：它会选哪边。"
  },
  {
    id: "11",
    chapter: "第三幕",
    title: "A 往左，B 往右",
    line: "最早的分叉，可能只是小兵选左塔还是右塔。",
    visual: "minionResult",
    answered: "展示世界分叉第一瞬间。",
    nextQuestion: "只是小兵走向不同，为什么影响整个世界？",
    minutes: "14:30 - 16:00",
    detail: "A 客户端判定左塔更近，B 客户端判定右塔更近，后续状态从这里开始分叉。"
  },
  {
    id: "12",
    chapter: "第三幕",
    title: "分叉会成为下一帧的起点",
    line: "状态不是突然爆炸的，它是在每一帧继续拿错误起点往下算。",
    visual: "chain",
    answered: "完成“小差异变大问题”的核心解释。",
    nextQuestion: "客户端算一致这么难，能不能别让客户端算？",
    minutes: "16:00 - 18:00",
    detail: "朝向、寻路、攻击目标都会成为后续计算的输入，于是偏差逐帧放大。"
  },
  {
    id: "13",
    chapter: "第三幕",
    title: "帧同步是在和整个模拟层较劲",
    line: "你不是只修一个 bug，而是在要求整套模拟永远不漂。",
    visual: "frameSyncPressure",
    answered: "把案例升级成工程判断。",
    nextQuestion: "服务器能不能接管这个压力？",
    minutes: "18:00 - 20:00",
    detail: "定点数、物理、寻路、动画、工具链，每一层都可能成为确定性风险。"
  },
  {
    id: "14",
    chapter: "第四幕",
    title: "那就让服务器算？",
    line: "最自然的逃路，是把结果交给服务器决定。",
    visual: "serverCalc",
    answered: "让状态同步作为帧同步困境后的自然答案登场。",
    nextQuestion: "这招这么自然，为什么不直接用？",
    minutes: "20:00 - 21:30",
    detail: "观众会自然想到：既然客户端很难算一致，那就让服务器成为权威。"
  },
  {
    id: "15",
    chapter: "第四幕",
    title: "状态同步确实有价值",
    line: "它绕开了一部分客户端确定性压力，让客户端接收权威状态。",
    visual: "stateValue",
    answered: "先承认状态同步有用，不把它打成靶子。",
    nextQuestion: "它把压力转移到哪里？",
    minutes: "21:30 - 23:00",
    detail: "状态同步的价值是真实存在的：服务器决定关键结果，客户端负责表现和修正。"
  },
  {
    id: "16",
    chapter: "第四幕",
    title: "服务器会变成另一个客户端",
    line: "只要游戏世界足够复杂，服务器就要理解并运行足够完整的世界。",
    visual: "serverHeavy",
    answered: "揭示状态同步的工程代价。",
    nextQuestion: "两条路的本质区别是什么？",
    minutes: "23:00 - 25:00",
    detail: "如果包含物理、AI、战斗和对象交互，服务器模拟会迅速变重。"
  },
  {
    id: "17",
    chapter: "第四幕",
    title: "复杂度没有消失，只是换了位置",
    line: "帧同步把复杂度压在客户端确定性上，状态同步把复杂度压在服务器模拟上。",
    visual: "routes",
    answered: "把两种同步升成架构取舍。",
    nextQuestion: "有没有第三种复杂度分配方式？",
    minutes: "25:00 - 27:00",
    detail: "这不是“哪个方案更高级”，而是复杂度放在哪里、谁来承担。"
  },
  {
    id: "18",
    chapter: "第五幕",
    title: "第三种方式：重新分配复杂度",
    line: "不追求所有客户端永远一致，也不把完整世界都压给服务器。",
    visual: "complexityShift",
    answered: "让自研框架作为两难之后的答案登场。",
    nextQuestion: "这套框架一句话怎么说？",
    minutes: "27:00 - 29:00",
    detail: "框架的价值不是消灭复杂度，而是重新分配复杂度。"
  },
  {
    id: "19",
    chapter: "第五幕",
    title: "一句话框架",
    line: "拟真驱动整个世界每一帧运行，再以状态同步的方式做权威修正。",
    visual: "framework",
    answered: "给出框架总定义。",
    nextQuestion: "拟真驱动意味着什么？",
    minutes: "29:00 - 31:00",
    detail: "这句话先立住全局：本地持续运行，权威持续拉回。"
  },
  {
    id: "20",
    chapter: "第五幕",
    title: "拟真驱动：世界先跑起来",
    line: "相同输入大概率得到相同输出，但框架不承诺每一帧绝对一致。",
    visual: "simDrive",
    answered: "解释本地仍然推进世界。",
    nextQuestion: "既然不绝对一致，偏了怎么办？",
    minutes: "31:00 - 33:00",
    detail: "拟真驱动保证体验连续性，让玩家先看到一个可用的世界。"
  },
  {
    id: "21",
    chapter: "第五幕",
    title: "偏了，就拉回",
    line: "漂移允许发生，但不能失控；权威状态负责把它拉回正确轨道。",
    visual: "correction",
    answered: "解释偏差如何被控制。",
    nextQuestion: "权威从哪里来？",
    minutes: "33:00 - 35:00",
    detail: "框架不追求“永不出错”，而是让偏差可观测、可修正、可收敛。"
  },
  {
    id: "22",
    chapter: "第五幕",
    title: "分布式权威，不是分布式服务器",
    line: "权威不是集中在一台中心服务器，而是分散在玩家和对象持有者身上。",
    visual: "authorityMap",
    answered: "澄清分布式权威的含义。",
    nextQuestion: "玩家和非玩家对象分别谁负责？",
    minutes: "35:00 - 37:00",
    detail: "每个玩家是自己的权威，非玩家实体由持有者负责广播和修正。"
  },
  {
    id: "23",
    chapter: "第五幕",
    title: "每个对象都要有持有者",
    line: "AI、车、道具这些非玩家实体，也需要有人负责它们的权威状态。",
    visual: "holders",
    answered: "解释权威如何落到对象上。",
    nextQuestion: "持有者固定吗？",
    minutes: "37:00 - 39:00",
    detail: "持有者是对象权威的承载者，它决定谁负责广播、谁负责修正。"
  },
  {
    id: "24",
    chapter: "第五幕",
    title: "权威像接力棒一样转移",
    line: "对象离谁更近、谁更适合负责，权威就可以动态交给谁。",
    visual: "handoff",
    answered: "解释权威动态性。",
    nextQuestion: "框架追求永不出错，还是出错后可控？",
    minutes: "39:00 - 41:00",
    detail: "权威转移让框架能适配对象移动、玩家靠近和场景变化。"
  },
  {
    id: "25",
    chapter: "第五幕",
    title: "成熟框架不是永不出错",
    line: "真正成熟的是：偏差发生后，能看见、能拉回、能解释。",
    visual: "manageError",
    answered: "提炼框架哲学。",
    nextQuestion: "玩家自己有权威，会不会作弊？",
    minutes: "41:00 - 43:00",
    detail: "这一步把框架从机制解释提升到工程哲学。"
  },
  {
    id: "26",
    chapter: "第五幕",
    title: "客户端有权威，PvP 怎么办？",
    line: "这是这套框架最容易被质疑的地方，也是必须正面回答的问题。",
    visual: "cheatQuestion",
    answered: "主动提出最大的信任质疑。",
    nextQuestion: "客户端权威是不是等于相信客户端？",
    minutes: "43:00 - 44:00",
    detail: "这里适合做现场抢答：如果玩家能改自己数据，这套框架还能做 PvP 吗？"
  },
  {
    id: "27",
    chapter: "第五幕",
    title: "不是相信客户端，是让它留下证据",
    line: "可回放，才有资格谈审计；可审计，才有资格谈 PvP。",
    visual: "cheat",
    answered: "回应客户端权威信任问题。",
    nextQuestion: "回放成本会不会太高？",
    minutes: "44:00 - 46:00",
    detail: "拟真数据可以用于帧完美回放，异常行为会在回放里暴露。"
  },
  {
    id: "28",
    chapter: "第五幕",
    title: "成本分级，不是一刀切",
    line: "普通局异步抽样，高风险加频，严重时让专门服务器实时模拟。",
    visual: "costLevels",
    answered: "回应回放审计成本。",
    nextQuestion: "这套框架真正管理的是什么？",
    minutes: "46:00 - 49:00",
    detail: "防作弊不是本场主线，但它必须证明这套架构不是无条件信任客户端。"
  },
  {
    id: "29",
    chapter: "第六幕",
    title: "四个判断问题",
    line: "看见偏差、处理偏差、分配复杂度、管理信任。",
    visual: "judgment",
    answered: "把全场技术点收成判断框架。",
    nextQuestion: "能不能用一句话收住？",
    minutes: "49:00 - 51:00",
    detail: "把复杂内容收束成听众带得走的判断方法。"
  },
  {
    id: "30",
    chapter: "第六幕",
    title: "回到开场那一幕",
    line: "你以为同步了，其实只是还没有看见；你以为防不住，其实是还没有证据链。",
    visual: "callback",
    answered: "用开场画面做最终呼应。",
    nextQuestion: "真正要回答的问题是什么？",
    minutes: "51:00 - 53:00",
    detail: "回收开场、检测工具、权威修正和回放审计，让结构闭环。"
  },
  {
    id: "31",
    chapter: "第六幕",
    title: "同步框架管理的是偏差、复杂度和信任",
    line: "它不承诺世界永远不裂，但它要知道裂在哪里、怎么拉回、怎么复盘。",
    visual: "close",
    answered: "完成全场大兑现。",
    nextQuestion: "无",
    minutes: "53:00 - 55:00",
    detail: "最后不再加新概念，只留下可观测、可修正、可回放、可审计四个词。"
  }
];

const chapters = Array.from(new Set(scenes.map((scene) => scene.chapter)));

function getInitialSceneIndex() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("scene") || window.location.hash.replace("#", "");
  const index = scenes.findIndex((scene) => scene.id === requested.padStart(2, "0"));
  return index >= 0 ? index : 0;
}

const state = {
  index: getInitialSceneIndex(),
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
  answeredText: document.getElementById("answeredText"),
  questionText: document.getElementById("questionText"),
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
  el.answeredText.textContent = scene.answered;
  el.questionText.textContent = scene.nextQuestion;
  el.counter.textContent = `${state.index + 1} / ${scenes.length}`;
  el.sceneDetail.textContent = scene.detail;
  el.timeHint.textContent = scene.minutes;
  el.visualFrame.innerHTML = renderVisual(scene);

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

function renderVisual(scene) {
  const type = scene.visual;

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
          <div class="log-line">不同步检测工具已接入</div>
          <div class="log-line">连续帧 / 校验通过</div>
          <div class="log-line error">连续帧 / 位置不一致</div>
          <div class="log-line error">连续帧 / 朝向不一致</div>
          <div class="log-line error">连续帧 / 动画驱动值不一致</div>
          <div class="log-line error">连续帧 / 世界状态不一致</div>
        </div>
      </div>
    `;
  }

  if (type === "data") {
    return renderDataSplit([
      ["角色位置", "看起来一致"],
      ["动作帧", "看起来一致"],
      ["平台关系", "看起来一致"]
    ], [
      ["位置", "出现偏移"],
      ["朝向", "出现偏移"],
      ["动画驱动值", "出现偏移"]
    ]);
  }

  if (type === "dataLeak") {
    return renderDataSplit([
      ["核心战斗", "定点数"],
      ["预计算数据", "已约束"],
      ["表现画面", "看起来稳定"]
    ], [
      ["动画驱动", "仍受 float 影响"],
      ["逻辑入口", "从旁边漏出"],
      ["检测结果", "状态分叉"]
    ]);
  }

  if (type === "minionGuess" || type === "minionResult") {
    return renderMinionChoice(type === "minionResult");
  }

  if (type === "mobaMap") {
    return `
      <div class="visual-moba-map">
        <div class="moba-field">
          <div class="moba-lane top-lane"></div>
          <div class="moba-lane bottom-lane"></div>
          <div class="moba-base left-base">我方</div>
          <div class="moba-base right-base">敌方</div>
          <div class="moba-dot minion-dot">小兵</div>
          <div class="moba-dot player-dot">玩家</div>
          <div class="moba-dot enemy-dot">敌人</div>
          <div class="moba-tower left-tower">塔</div>
          <div class="moba-tower right-tower">塔</div>
        </div>
      </div>
    `;
  }

  if (type === "frameCondition") {
    return renderTwinSim("同一份输入", "客户端 A", "客户端 B", "输入同步只是开始", "每一帧状态必须一致");
  }

  if (type === "chain") {
    return renderChain(["小兵选塔", "朝向变化", "攻击目标变化", "位置继续偏", "世界分叉"]);
  }

  if (type === "frameSyncPressure") {
    return renderConcept(["定点数", "物理", "寻路", "动画", "工具链"], "帧同步压力来自整个模拟层");
  }

  if (type === "serverCalc") {
    return renderTwinSim("服务器接管结果", "客户端表现", "服务器权威", "自然的逃路", "让中心决定世界结果");
  }

  if (type === "stateValue") {
    return renderConcept(["权威状态", "客户端接收", "表现修正"], "状态同步确实能绕开一部分确定性压力");
  }

  if (type === "serverHeavy") {
    return renderConcept(["物理系统", "AI 决策", "战斗结算", "对象交互"], "服务器必须理解并运行足够完整的游戏世界");
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

  if (type === "complexityShift") {
    return renderConcept(["本地拟真", "分散权威", "状态修正"], "第三种方式不是消灭复杂度，而是重新分配复杂度");
  }

  if (type === "framework" || type === "authorityMap") {
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
          <div class="node center">${type === "framework" ? "拟真驱动" : "分布式权威"}</div>
        </div>
      </div>
    `;
  }

  if (type === "simDrive") {
    return renderChain(["输入", "本地拟真", "预测状态", "连续体验"], "sim");
  }

  if (type === "correction") {
    return renderCorrection();
  }

  if (type === "holders") {
    return renderConcept(["玩家自己", "AI 持有者", "车辆持有者", "道具持有者"], "每个对象都要有一个负责权威状态的人");
  }

  if (type === "handoff") {
    return renderChain(["持有者 A", "对象移动", "接力判断", "持有者 B"], "handoff");
  }

  if (type === "manageError") {
    return renderConcept(["可观测", "可修正", "可收敛"], "不追求永不出错，而是追求出错后可控");
  }

  if (type === "cheatQuestion") {
    return renderConcept(["客户端有权威", "玩家能改数据？", "PvP 怎么办？"], "最大的质疑必须正面回答");
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

  if (type === "costLevels") {
    return renderConcept(["异步抽样", "高风险加频", "严重时实时模拟"], "防作弊成本按风险分级");
  }

  if (type === "judgment") {
    return renderConcept(["看见偏差", "处理偏差", "分配复杂度", "管理信任"], "以后看同步方案，就问这四件事");
  }

  if (type === "callback") {
    return renderConcept(["开场报警", "权威修正", "回放审计"], "你以为同步了其实没有，你以为防不住其实跑不掉");
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

function renderDataSplit(leftRows, rightRows) {
  return `
    <div class="visual-data">
      <div class="data-layer">
        <h3>表现层 / 已约束部分</h3>
        ${leftRows.map(([key, value]) => `<div class="data-row"><span>${key}</span><span>${value}</span></div>`).join("")}
      </div>
      <div class="data-layer">
        <h3>底层数据 / 漏口</h3>
        ${rightRows.map(([key, value]) => `<div class="data-row"><span>${key}</span><b>${value}</b></div>`).join("")}
      </div>
    </div>
  `;
}

function renderMinionChoice(showResult) {
  return `
    <div class="visual-minion-choice ${showResult ? "result-mode" : ""}">
      <div class="lane-scene">
        <div class="tower tower-left">
          <span>左防御塔</span>
        </div>
        <div class="minion">
          <span>小兵</span>
        </div>
        <div class="tower tower-right">
          <span>右防御塔</span>
        </div>
        <div class="choice-rule">AI 规则：攻击最近的防御塔</div>
        <div class="choice-question">${showResult ? "同一规则，两端结果分叉" : "猜一猜：它会打哪边？"}</div>
      </div>

      <div class="client-split ${showResult ? "" : "muted-result"}">
        <div class="client-result left-result">
          <strong>A 客户端</strong>
          <span>小兵判定左塔更近</span>
          <b>${showResult ? "选择左边" : "等待揭晓"}</b>
        </div>
        <div class="client-result right-result">
          <strong>B 客户端</strong>
          <span>小兵判定右塔更近</span>
          <b>${showResult ? "选择右边" : "等待揭晓"}</b>
        </div>
      </div>
    </div>
  `;
}

function renderConcept(items, title) {
  return `
    <div class="visual-concept">
      <div class="concept-title">${title}</div>
      <div class="concept-grid">
        ${items.map((item, index) => `
          <div class="concept-card">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${item}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderChain(items, variant = "") {
  return `
    <div class="visual-chain ${variant}">
      ${items.map((item, index) => `
        <div class="chain-node">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${item}</strong>
        </div>
      `).join('<div class="chain-arrow">→</div>')}
    </div>
  `;
}

function renderTwinSim(label, left, right, caption, outcome) {
  return `
    <div class="visual-twin-sim">
      <div class="sim-label">${label}</div>
      <div class="sim-columns">
        <div class="sim-card"><strong>${left}</strong><span>本地运行</span></div>
        <div class="sim-card"><strong>${right}</strong><span>权威判断</span></div>
      </div>
      <div class="sim-caption">
        <strong>${caption}</strong>
        <span>${outcome}</span>
      </div>
    </div>
  `;
}

function renderCorrection() {
  return `
    <div class="visual-correction">
      <div class="drift-line">
        <span class="local-state">本地拟真</span>
        <span class="authority-state">权威状态</span>
        <span class="correction-pulse">拉回</span>
      </div>
      <div class="correction-copy">允许偏差发生，但不允许偏差失控。</div>
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
