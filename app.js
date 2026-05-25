// =====================================================================
//  批量提示词工具 — 主逻辑
// =====================================================================

// ===================== Data =====================
let historyData = [];

// Load from localStorage
try {
    const saved = localStorage.getItem('prompt_history');
    if (saved) historyData = JSON.parse(saved);
} catch (e) {}

// ===================== Auto-generate slogan =====================
function updateSlogan() {
    const mainTitle = document.getElementById('adMainTitle').value.trim() || '限时领券';
    const subtitle  = document.getElementById('adSubtitle').value.trim()  || '最高立减15元';
    const price     = document.getElementById('adPrice').value.trim()     || '新人专享';
    const button    = document.getElementById('adButton').value.trim()    || '马上抢';

    const parts = [mainTitle, subtitle, price].filter(Boolean);
    const slogan = parts.join(' ') + '；' + button;
    document.getElementById('adSlogan').value = slogan;
}

// Bind ad field changes
['adMainTitle', 'adSubtitle', 'adPrice', 'adButton'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateSlogan);
});

// Bind dropdown / textarea changes to auto-generate (exclude text areas that have manual confirm)
['subject', 'scene', 'style', 'composition', 'quality'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('change', generatePrompt);
    }
});

// Initial slogan & prompt
updateSlogan();

// ===================== Generate Prompt =====================
function generatePrompt() {
    const subject  = document.getElementById('subject').value;
    const scene    = document.getElementById('scene').value;
    const style    = document.getElementById('style').value;
    const comp     = document.getElementById('composition').value;
    const quality  = document.getElementById('quality').value;
    const adMainTitle = document.getElementById('adMainTitle').value.trim();
    const adSubtitle  = document.getElementById('adSubtitle').value.trim();
    const price       = document.getElementById('adPrice').value.trim();
    const button      = document.getElementById('adButton').value.trim();
    const slogan      = document.getElementById('adSlogan').value.trim();
    const font        = document.getElementById('adFont').value.trim();
    const negative    = document.getElementById('negativeWords').value.trim();

    const parts = [];

    // Basic info
    const basicParts = [];
    if (subject) basicParts.push(`主体：${subject}`);
    if (scene)   basicParts.push(`场景：${scene}`);
    if (style)   basicParts.push(`风格：${style}`);
    if (comp)    basicParts.push(`构图：${comp}`);
    if (quality) basicParts.push(`画质：${quality}`);
    if (basicParts.length) {
        parts.push('【基本信息】');
        parts.push(basicParts.join('，'));
    }

    // Ad info
    const adParts = [];
    if (adMainTitle) adParts.push(`主标题：${adMainTitle}`);
    if (adSubtitle)  adParts.push(`副标题：${adSubtitle}`);
    if (price)       adParts.push(`价格：${price}`);
    if (button)      adParts.push(`按钮：${button}`);
    if (slogan)      adParts.push(`标语：${slogan}`);
    if (font)        adParts.push(`字体：${font}`);
    if (adParts.length) {
        parts.push('\n【广告信息】');
        parts.push(adParts.join('；'));
    }

    // Negative words
    if (negative) {
        parts.push('\n【否定词】');
        parts.push(negative);
    }

    const result = parts.join('\n');
    document.getElementById('keywordOutput').value = result;
    return result;
}

// ===================== Copy Prompt =====================
function copyPrompt() {
    const textarea = document.getElementById('keywordOutput');
    const text = textarea.value.trim();
    if (!text) {
        showToast('没有内容可复制', 'info');
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ 已复制到剪贴板');
    }).catch(() => {
        // Fallback for older browsers
        textarea.select();
        document.execCommand('copy');
        showToast('✅ 已复制到剪贴板');
    });
}

// ===================== Clear Prompt =====================
function clearPrompt() {
    document.getElementById('keywordOutput').value = '';
    showToast('已清空', 'info');
}

// ===================== Save to History =====================
function saveToHistory() {
    const content = document.getElementById('keywordOutput').value.trim();
    if (!content) {
        showToast('没有内容可保存，请先生成提示词', 'error');
        return;
    }

    const now = new Date();
    const timeStr = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');

    const entry = {
        id: Date.now(),
        time: timeStr,
        content: content
    };

    historyData.unshift(entry);
    saveHistoryToStorage();
    renderHistory();
    showToast('✅ 已保存到历史记录');
}

function deleteHistory(id) {
    historyData = historyData.filter(item => item.id !== id);
    saveHistoryToStorage();
    renderHistory();
    showToast('已删除', 'info');
}

function clearAllHistory() {
    if (!historyData.length) return;
    if (!confirm('确定清空所有历史记录吗？')) return;
    historyData = [];
    saveHistoryToStorage();
    renderHistory();
    showToast('已清空所有历史记录', 'info');
}

function saveHistoryToStorage() {
    try {
        localStorage.setItem('prompt_history', JSON.stringify(historyData));
    } catch (e) { /* quota exceeded or unavailable */ }
}

function copyHistoryContent(content) {
    navigator.clipboard.writeText(content).then(() => {
        showToast('✅ 已复制');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = content;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('✅ 已复制');
    });
}

// ===================== Render History =====================
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function renderHistory() {
    const list  = document.getElementById('historyList');
    const empty = document.getElementById('historyEmpty');
    const count = document.getElementById('historyCount');

    count.textContent = historyData.length + ' 条';

    if (!historyData.length) {
        empty.style.display = 'block';
        list.innerHTML = '';
        return;
    }
    empty.style.display = 'none';

    list.innerHTML = historyData.map(item => {
        const isLong = item.content.length > 120;
        const escapedContent = escapeHtml(item.content);
        const dataFull = JSON.stringify(item.content);

        return `
            <div class="history-item" data-id="${item.id}">
                <div class="time">🕐 ${escapeHtml(item.time)}</div>
                <div class="content" data-full='${dataFull}'>
                    ${escapedContent}
                </div>
                ${isLong ? `<button class="btn-expand" onclick="toggleHistoryExpand(this)">展开全部</button>` : ''}
                <div class="item-actions">
                    <button class="btn btn-outline" onclick="copyHistoryContent(${dataFull})">📋 复制</button>
                    <button class="btn btn-outline" onclick="loadHistory(${item.id})">📥 载入</button>
                    <button class="btn btn-outline" onclick="deleteHistory(${item.id})" style="color:#D44A4A;border-color:#f0d0d0;">🗑️ 删除</button>
                </div>
            </div>
        `;
    }).join('');
}

function toggleHistoryExpand(btn) {
    const itemElem = btn.closest('.history-item');
    const content  = itemElem.querySelector('.content');
    const full     = JSON.parse(content.getAttribute('data-full'));

    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        content.textContent = full.slice(0, 120) + '…';
        btn.textContent = '展开全部';
    } else {
        content.classList.add('expanded');
        content.textContent = full;
        btn.textContent = '收起';
    }
}

function loadHistory(id) {
    const entry = historyData.find(item => item.id === id);
    if (!entry) return;
    document.getElementById('keywordOutput').value = entry.content;
    showToast('✅ 已载入到编辑区');
}

// ===================== Toast Notification =====================
function showToast(message, type) {
    type = type || 'success';
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'error') toast.classList.add('error');
    if (type === 'info')  toast.classList.add('info');
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ===================== Init =====================
// Ensure price field always has visible default value
const priceInput = document.getElementById('adPrice');
if (priceInput && !priceInput.value.trim()) {
    priceInput.value = '新人专享';
}

generatePrompt();
renderHistory();
