import './style.css';

// ── State ──────────────────────────────────────────────────────────────────
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filter = 'all'; // all | active | done
let editingId = null;
let dragSrcId = null;

const PRIORITIES = {
  high:   { label: '🔥 High',   cls: 'pri-high'   },
  medium: { label: '⚡ Medium', cls: 'pri-medium'  },
  low:    { label: '🍃 Low',    cls: 'pri-low'     },
};

const CATEGORIES = ['Work', 'Personal', 'Health', 'Learning', 'Other'];

// ── Helpers ─────────────────────────────────────────────────────────────────
const save = () => localStorage.setItem('todos', JSON.stringify(todos));
const uid  = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const esc  = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function getFiltered() {
  if (filter === 'active') return todos.filter(t => !t.done);
  if (filter === 'done')   return todos.filter(t =>  t.done);
  return todos;
}

// ── Confetti ─────────────────────────────────────────────────────────────────
function spawnConfetti(x, y) {
  const colors = ['#a78bfa','#f472b6','#34d399','#60a5fa','#fbbf24','#fb7185'];
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const angle = Math.random() * 360;
    const dist  = 60 + Math.random() * 80;
    const dx    = Math.cos(angle * Math.PI / 180) * dist;
    const dy    = Math.sin(angle * Math.PI / 180) * dist - 60;
    el.style.cssText = `
      left:${x}px; top:${y}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --dx:${dx}px; --dy:${dy}px;
      width:${4+Math.random()*6}px; height:${4+Math.random()*6}px;
      border-radius:${Math.random()>0.5?'50%':'2px'};
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  const filtered  = getFiltered();
  const total     = todos.length;
  const doneCount = todos.filter(t => t.done).length;
  const pct       = total ? Math.round((doneCount / total) * 100) : 0;

  document.querySelector('#app').innerHTML = `
  <div class="app-shell">

    <!-- ── Ambient blobs ── -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>
    <div class="blob blob-3"></div>

    <!-- ── Header ── -->
    <header class="app-header">
      <div class="header-top">
        <div class="logo-mark">
          <span class="logo-icon">✦</span>
          <span class="logo-text">NEXTTASK</span>
        </div>
        <div class="date-badge">${new Date().toLocaleDateString('ko-KR',{weekday:'long',month:'long',day:'numeric'})}</div>
      </div>

      <div class="progress-section">
        <div class="progress-meta">
          <span class="prog-label">오늘의 진행률</span>
          <span class="prog-nums"><b>${doneCount}</b> / ${total} 완료</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%">
            <div class="progress-glow"></div>
          </div>
        </div>
        <div class="prog-pct">${pct}%</div>
      </div>
    </header>

    <!-- ── Input Area ── -->
    <div class="input-card glass">
      <div class="input-row">
        <div class="input-wrapper">
          <span class="input-icon">＋</span>
          <input
            id="todo-input"
            type="text"
            class="todo-input"
            placeholder="새로운 할 일을 입력하세요..."
            autocomplete="off"
            maxlength="120"
          />
        </div>
        <button id="add-btn" class="add-btn" title="추가">
          <span class="add-btn-icon">→</span>
        </button>
      </div>
      <div class="input-meta-row">
        <select id="priority-sel" class="meta-sel" title="우선순위">
          <option value="medium">⚡ Medium</option>
          <option value="high">🔥 High</option>
          <option value="low">🍃 Low</option>
        </select>
        <select id="category-sel" class="meta-sel" title="카테고리">
          ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
      </div>
    </div>

    <!-- ── Filter Tabs ── -->
    <div class="filter-tabs">
      ${['all','active','done'].map(f => `
        <button class="filter-tab ${filter===f?'active':''}" data-filter="${f}">
          ${f==='all'?'전체':f==='active'?'진행 중':'완료'}
          <span class="tab-count">${
            f==='all'   ? total :
            f==='active'? todos.filter(t=>!t.done).length :
                          doneCount
          }</span>
        </button>`).join('')}
      <div class="tab-slider" style="transform: translateX(${['all','active','done'].indexOf(filter)*100}%)"></div>
    </div>

    <!-- ── Todo List ── -->
    <ul class="todo-list" id="todo-list">
      ${filtered.length === 0 ? `
        <li class="empty-state">
          <div class="empty-icon">${filter==='done'?'🎉':filter==='active'?'✨':'📋'}</div>
          <p class="empty-title">${filter==='done'?'아직 완료된 항목이 없어요':filter==='active'?'모두 완료했어요! 🎊':'할 일을 추가해 보세요'}</p>
          <p class="empty-sub">위 입력창에서 새 할 일을 추가하세요</p>
        </li>
      ` : filtered.map(todo => renderTodo(todo)).join('')}
    </ul>

    <!-- ── Footer ── -->
    ${todos.some(t=>t.done) ? `
    <div class="app-footer">
      <button id="clear-done" class="clear-btn">
        <span>🗑</span> 완료 항목 삭제
      </button>
    </div>` : ''}

  </div>`;

  bindEvents();
}

function renderTodo(todo) {
  const isEditing = editingId === todo.id;
  const pri = PRIORITIES[todo.priority] || PRIORITIES.medium;
  return `
  <li
    class="todo-item ${todo.done?'done':''} ${pri.cls} ${isEditing?'editing':''}"
    data-id="${todo.id}"
    draggable="true"
  >
    <div class="todo-drag-handle">⠿</div>

    <button class="check-btn ${todo.done?'checked':''}" data-toggle="${todo.id}" title="완료 토글">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </button>

    <div class="todo-content">
      ${isEditing ? `
        <input
          id="edit-input-${todo.id}"
          class="edit-input"
          type="text"
          value="${esc(todo.text)}"
          maxlength="120"
          autofocus
        />
      ` : `
        <span class="todo-text">${esc(todo.text)}</span>
        <div class="todo-badges">
          <span class="badge badge-pri ${pri.cls}">${pri.label}</span>
          <span class="badge badge-cat">${todo.category||'Other'}</span>
          ${todo.createdAt?`<span class="badge badge-time">${formatDate(todo.createdAt)}</span>`:''}
        </div>
      `}
    </div>

    <div class="todo-actions">
      ${isEditing ? `
        <button class="action-btn save-btn" data-save="${todo.id}" title="저장">✓</button>
        <button class="action-btn cancel-btn" data-cancel="${todo.id}" title="취소">✕</button>
      ` : `
        <button class="action-btn edit-btn" data-edit="${todo.id}" title="수정">✏</button>
        <button class="action-btn del-btn" data-del="${todo.id}" title="삭제">✕</button>
      `}
    </div>

    <div class="todo-priority-bar"></div>
  </li>`;
}

function formatDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diff = Math.floor((now - d) / 60000);
  if (diff < 1)   return '방금 전';
  if (diff < 60)  return `${diff}분 전`;
  if (diff < 1440)return `${Math.floor(diff/60)}시간 전`;
  return d.toLocaleDateString('ko-KR',{month:'short',day:'numeric'});
}

// ── Event Binding ─────────────────────────────────────────────────────────────
function bindEvents() {

  // Add todo
  const addBtn  = document.querySelector('#add-btn');
  const input   = document.querySelector('#todo-input');
  const priSel  = document.querySelector('#priority-sel');
  const catSel  = document.querySelector('#category-sel');

  function addTodo() {
    const text = input.value.trim();
    if (!text) { input.classList.add('shake'); setTimeout(()=>input.classList.remove('shake'),500); return; }
    todos.unshift({ id: uid(), text, done: false, priority: priSel.value, category: catSel.value, createdAt: Date.now() });
    save();
    input.value = '';
    input.focus();
    render();
  }

  addBtn.addEventListener('click', addTodo);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      filter = btn.dataset.filter;
      render();
    });
  });

  // Toggle done
  document.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = btn.dataset.toggle;
      const t  = todos.find(x => x.id === id);
      if (!t) return;
      t.done = !t.done;
      save();
      if (t.done) {
        const rect = btn.getBoundingClientRect();
        spawnConfetti(rect.left + rect.width/2, rect.top + rect.height/2);
      }
      render();
    });
  });

  // Edit
  document.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      editingId = btn.dataset.edit;
      render();
      const ei = document.querySelector(`#edit-input-${editingId}`);
      if (ei) { ei.focus(); ei.select(); }
    });
  });

  // Save edit
  document.querySelectorAll('[data-save]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id  = btn.dataset.save;
      const ei  = document.querySelector(`#edit-input-${id}`);
      const val = ei ? ei.value.trim() : '';
      if (!val) return;
      const t = todos.find(x => x.id === id);
      if (t) t.text = val;
      editingId = null;
      save();
      render();
    });
  });

  // Cancel edit
  document.querySelectorAll('[data-cancel]').forEach(btn => {
    btn.addEventListener('click', () => {
      editingId = null;
      render();
    });
  });

  // Edit input enter / escape
  document.querySelectorAll('.edit-input').forEach(inp => {
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const id = inp.id.replace('edit-input-','');
        const val = inp.value.trim();
        if (!val) return;
        const t = todos.find(x => x.id === id);
        if (t) t.text = val;
        editingId = null;
        save();
        render();
      }
      if (e.key === 'Escape') {
        editingId = null;
        render();
      }
    });
  });

  // Delete
  document.querySelectorAll('[data-del]').forEach(btn => {
    btn.addEventListener('click', () => {
      const li = btn.closest('.todo-item');
      li.classList.add('removing');
      setTimeout(() => {
        todos = todos.filter(x => x.id !== btn.dataset.del);
        save();
        render();
      }, 350);
    });
  });

  // Clear done
  const clearBtn = document.querySelector('#clear-done');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      todos = todos.filter(t => !t.done);
      save();
      render();
    });
  }

  // Drag & Drop reorder
  const list = document.querySelector('#todo-list');
  if (!list) return;

  list.querySelectorAll('.todo-item[draggable]').forEach(item => {
    item.addEventListener('dragstart', e => {
      dragSrcId = item.dataset.id;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      list.querySelectorAll('.todo-item').forEach(i => i.classList.remove('drag-over'));
    });
    item.addEventListener('dragover', e => {
      e.preventDefault();
      list.querySelectorAll('.todo-item').forEach(i => i.classList.remove('drag-over'));
      item.classList.add('drag-over');
    });
    item.addEventListener('drop', e => {
      e.preventDefault();
      if (dragSrcId === item.dataset.id) return;
      const srcIdx = todos.findIndex(t => t.id === dragSrcId);
      const dstIdx = todos.findIndex(t => t.id === item.dataset.id);
      if (srcIdx < 0 || dstIdx < 0) return;
      const [moved] = todos.splice(srcIdx, 1);
      todos.splice(dstIdx, 0, moved);
      save();
      render();
    });
  });
}

// ── Boot ──────────────────────────────────────────────────────────────────────
render();
