// =====================================================================
//  批量提示词工具 — 主逻辑 (优化版)
// =====================================================================

// ===================== Reference Images =====================
const REFERENCE_IMAGES = [
    { id: 'ref-1', label: '中式烤鸭-园林', src: 'images/ref-1.png', color: '#D4A373' },
    { id: 'ref-2', label: '日式寿司-木盘', src: 'images/ref-2.jpeg', color: '#CCD5AE' },
    { id: 'ref-3', label: '甜点-午后阳光', src: 'images/ref-3.jpeg', color: '#F2D0C6' },
    { id: 'ref-4', label: '咖啡-天台夜景', src: 'images/ref-4.jpeg', color: '#A68A7A' },
    { id: 'ref-5', label: '汉服-古典庭院', emoji: '👘', color: '#B8C5D6' },
    { id: 'ref-6', label: '面食-烟火气', emoji: '🍜', color: '#E8B88A' },
    { id: 'ref-7', label: '水果-清新夏日', emoji: '🍉', color: '#A8D5BA' },
    { id: 'ref-8', label: '海鲜-宴会', emoji: '🦐', color: '#F0C8C8' },
    { id: 'ref-9', label: '茶道-禅意', emoji: '🍵', color: '#B5C4B1' },
];

let selectedImageId = null;
let generatedImageDataUrl = null;

// ===================== History =====================
let historyData = [];
try {
    const saved = localStorage.getItem('prompt_history');
    if (saved) historyData = JSON.parse(saved);
} catch (e) {}

// ===================== Auto-generate slogan =====================
function updateSlogan() {
    const mainTitle = document.getElementById('adMainTitle').value.trim() || '限时领券';
    const subtitle  = document.getElementById('adSubtitle').value.trim()  || '';
    const price     = document.getElementById('adPrice').value.trim()     || '';
    const button    = document.getElementById('adButton').value.trim()    || '马上抢';

    const parts = [mainTitle, subtitle, price].filter(Boolean);
    const slogan = parts.join(' ') + '；' + button;
    document.getElementById('adSlogan').value = slogan;
}

// Bind ad field changes
['adMainTitle', 'adSubtitle', 'adPrice', 'adButton'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateSlogan);
});

// Bind changes for auto-generate
['subject', 'scene', 'style', 'composition', 'quality'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', generatePrompt);
});

// Custom option handlers - when users select "自定义", make the field editable
['subject', 'scene', 'style', 'composition', 'quality'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', function() {
        if (this.value.includes('自定义')) {
            const customVal = prompt('请输入自定义' + this.previousElementSibling.textContent + '：');
            if (customVal && customVal.trim()) {
                // Add a temporary custom option
                const opt = document.createElement('option');
                opt.value = customVal;
                opt.text = '✏️ ' + customVal.slice(0, 30) + (customVal.length > 30 ? '...' : '');
                opt.selected = true;
                this.appendChild(opt);
            } else {
                // Reset to first option
                this.selectedIndex = 0;
            }
            generatePrompt();
        }
    });
});

// Initial slogan & prompt
updateSlogan();

// ===================== Inspiration Modal (找灵感) =====================
function openInspirationModal() {
    const overlay = document.getElementById('inspirationModal');
    const grid = document.getElementById('imageGrid');

    // Build image grid
    grid.innerHTML = REFERENCE_IMAGES.map(img => {
        const isSelected = selectedImageId === img.id;
        // Generate a simple gradient placeholder with the theme color
        const content = img.src
            ? `<img src="${img.src}" alt="${img.label}" style="width:100%;height:100%;object-fit:cover;display:block;">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, ${img.color}, ${adjustColor(img.color, -30)});font-size:48px;">${img.emoji || '🖼️'}</div>`;
        return `
            <div class="image-grid-item ${isSelected ? 'selected' : ''}" data-id="${img.id}" onclick="selectImage('${img.id}')">
                ${content}
                <div class="item-label">${img.label}</div>
                <div class="check-mark">✓</div>
            </div>
        `;
    }).join('');

    // Update footer info
    updateModalFooterInfo();

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeInspirationModal() {
    document.getElementById('inspirationModal').classList.remove('active');
    document.body.style.overflow = '';
}

function selectImage(id) {
    selectedImageId = id;
    // Update UI
    document.querySelectorAll('.image-grid-item').forEach(el => {
        el.classList.toggle('selected', el.dataset.id === id);
    });
    updateModalFooterInfo();
}

function updateModalFooterInfo() {
    const info = document.getElementById('selectedImageInfo');
    if (selectedImageId) {
        const img = REFERENCE_IMAGES.find(i => i.id === selectedImageId);
        info.textContent = '已选择：' + (img ? img.label : selectedImageId);
        info.style.color = 'var(--color-primary)';
    } else {
        info.textContent = '尚未选择图片';
        info.style.color = '';
    }
}

function confirmImageSelection() {
    if (!selectedImageId) {
        showToast('请先选择一张参考图片', 'error');
        return;
    }
    const img = REFERENCE_IMAGES.find(i => i.id === selectedImageId);
    if (!img) return;

    // Update preview in left panel
    const preview = document.getElementById('refImagePreview');
    preview.classList.add('has-image');
    if (img.src) {
        preview.innerHTML = `<img src="${img.src}" alt="${img.label}">`;
    } else {
        preview.innerHTML = `
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, ${img.color}, ${adjustColor(img.color, -30)});border-radius:4px;font-size:48px;min-height:70px;">
                ${img.emoji || '🖼️'}
            </div>
        `;
    }

    // Enable extract button
    document.getElementById('extractBtn').disabled = false;

    closeInspirationModal();
    showToast('✅ 已选择参考图片：' + img.label);
}

// Helper to adjust color brightness
function adjustColor(hex, amount) {
    const num = parseInt(hex.slice(1), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

// Close modal on overlay click
document.getElementById('inspirationModal').addEventListener('click', function(e) {
    if (e.target === this) closeInspirationModal();
});

// Close modal on Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('inspirationModal');
        if (modal.classList.contains('active')) closeInspirationModal();
    }
});

// ===================== Extract Content (提取内容) =====================
function extractContent() {
    if (!selectedImageId) {
        showToast('请先选择参考图片', 'error');
        return;
    }

    const img = REFERENCE_IMAGES.find(i => i.id === selectedImageId);
    if (!img) return;

    showToast('🔍 正在分析图片内容...', 'info');

    // Simulate AI extraction with a delay
    setTimeout(() => {
        // Extract based on reference image type
        const extracted = getExtractedContent(img.id);
        if (!extracted) return;

        // Populate the fields
        document.getElementById('subject').value = extracted.subject;
        triggerChange(document.getElementById('subject'));

        if (extracted.scene) {
            document.getElementById('scene').value = extracted.scene;
            triggerChange(document.getElementById('scene'));
        }
        if (extracted.style) {
            document.getElementById('style').value = extracted.style;
            triggerChange(document.getElementById('style'));
        }
        if (extracted.composition) {
            document.getElementById('composition').value = extracted.composition;
            triggerChange(document.getElementById('composition'));
        }
        if (extracted.quality) {
            document.getElementById('quality').value = extracted.quality;
            triggerChange(document.getElementById('quality'));
        }

        showToast('✅ 内容提取完成，已填充到各字段');
    }, 800);
}

function triggerChange(el) {
    if (el) {
        const event = new Event('change', { bubbles: true });
        el.dispatchEvent(event);
    }
}

function getExtractedContent(refId) {
    // Simulated extraction results based on reference image type
    const extractions = {
        'ref-1': {
            subject: '食物：一盘切片的北京烤鸭，鸭皮呈琥珀焦糖色，表面油亮有光泽，纹理清晰酥脆；鸭肉粉嫩多汁，层次分明；搭配翠绿的黄瓜条、洁白的葱丝，一小碟深褐色甜面酱，盛放在温润的白色圆形瓷盘中。辅助元素：瓷盘放置在园林天然石台上，石台旁点缀一片绿色荷叶；画面角落加入美团 IP 小黄鸡、古风毛笔元素，增加品牌辨识度与活泼感',
            scene: '背景：江南苏州古典园林庭院，白墙黛瓦的中式亭台楼阁，搭配太湖石假山、池塘与翠绿竹林，阳光透过竹叶洒下斑驳光影，水面泛着细碎波光，整体清幽雅致，充满中式意境。前景：带青苔质感的粗糙天然石面，呼应园林场景，让画面更具真实感。',
            style: '风格：商业美食摄影风，写实主义，高食欲感，明亮清新的国风商业广告风格，色彩鲜亮但不刺眼，契合外卖平台的活泼调性。色调：暖金色调为主，突出烤鸭的诱人色泽；背景的竹林绿与建筑白中和暖调，让画面平衡舒适。',
            composition: '光影：柔和的自然光，顺光+侧光结合，重点突出鸭皮的油亮高光；背景竹林加入丁达尔光效，营造午后庭院的温暖氛围，光影柔和不生硬。构图：烤鸭主体位于画面右侧黄金分割点，背景园林做浅景深虚化处理，突出前景食物；采用平视偏微俯视的美食摄影视角，完整呈现整盘烤鸭与配菜，同时带入环境氛围。',
            quality: '画质：8K超高清，商业广告级渲染，细节拉满，鸭皮的油光、葱丝的纹理、瓷盘的温润感、竹林叶片都清晰可见。质感：食物的酥脆/水润感、瓷盘的温润感、石头的粗糙感、竹林的清新感，所有材质表现真实自然。其他：画面干净无杂物，色彩通透，食欲感强'
        },
        'ref-5': {
            subject: '人物：一位身着水墨风格汉服的年轻女子，手持团扇，站在古典庭院中，长发飘逸，眼神温柔含蓄，衣袂随风轻扬。辅助元素：发簪、玉佩、团扇上的墨竹图案',
            scene: '背景：江南古典园林的月亮门旁，白墙黛瓦，墙角几株翠竹，地面铺着青石板，偶有落叶点缀。前景：青石台阶和几片飘落的竹叶',
            style: '风格：新中式人像摄影风，写实与意境结合，柔和清雅的色调，突出人物的古典气质和文化韵味。色调：水墨般的灰度基调，点缀朱红与翠绿，整体雅致不张扬',
            composition: '光影：柔和的散射光透过竹林洒下，在人物面部形成柔和的光影过渡，背景稍暗突出主体。构图：人物位于画面中央偏左，遵循黄金分割，留白处加入题字空间',
            quality: '画质：4K高清，人物皮肤质感真实自然，服饰细节清晰可见，背景虚化柔美。质感：丝绸的顺滑感、团扇的纸质感、发丝的光泽感'
        },
        'ref-3': {
            subject: '甜点：一块精致的草莓奶油蛋糕，多层松软的蛋糕体夹着洁白轻盈的奶油和鲜红欲滴的草莓切片，顶部装饰着整颗草莓和薄荷叶，撒上糖霜。辅助元素：银质叉子、白色餐巾、几朵小花点缀',
            scene: '背景：午后阳光洒在木质餐桌上，窗边挂着白色纱帘，窗外是模糊的绿色花园。前景：浅色木质桌面，带有自然的木纹肌理',
            style: '风格：日系清新甜点摄影风，柔和温暖，画面干净通透充满治愈感。色调：浅粉、乳白和暖黄为主色调，少量点缀薄荷绿',
            composition: '光影：柔和的侧逆光从窗户射入，在蛋糕表面形成美丽的光晕，奶油的高光柔和自然。构图：蛋糕位于画面中心偏下，俯拍45度角，完整呈现蛋糕的层次和细节',
            quality: '画质：高清细腻，奶油的顺滑感、草莓的鲜嫩感、蛋糕的蓬松感都真实呈现。质感：强调食物的柔软细腻质地，色彩柔和温暖'
        }
    };

    // If we don't have a specific extraction for this ID, provide a generic one
    if (!extractions[refId]) {
        const ref = REFERENCE_IMAGES.find(i => i.id === refId);
        showToast('已根据参考图「' + (ref ? ref.label : '') + '」提取内容', 'info');
        return {
            subject: '主体：根据参考图「' + (ref ? ref.label : '') + '」自动提取的主体描述',
            scene: '场景：根据参考图类型推荐的匹配场景描述',
            style: '风格：根据参考图风格匹配的推荐风格描述',
            composition: '构图：根据参考图构图特点匹配的推荐构图方案',
            quality: '画质：推荐的高质量画质参数设置'
        };
    }

    return extractions[refId];
}

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
    if (subject) basicParts.push(subject);
    if (scene)   basicParts.push(scene);
    if (style)   basicParts.push(style);
    if (comp)    basicParts.push(comp);
    if (quality) basicParts.push(quality);
    if (basicParts.length) {
        parts.push('【基本信息】');
        parts.push(basicParts.join('\n\n'));
    }

    // Ad info
    const adParts = [];
    if (adMainTitle) adParts.push('主标题：' + adMainTitle);
    if (adSubtitle)  adParts.push('副标题：' + adSubtitle);
    if (price)       adParts.push('价格：' + price);
    if (button)      adParts.push('按钮：' + button);
    if (slogan)      adParts.push('完整标语：' + slogan);
    if (font)        adParts.push('字体：' + font);
    if (adParts.length) {
        parts.push('\n【广告信息】');
        parts.push(adParts.join('\n'));
    }

    // Negative words
    if (negative) {
        parts.push('\n【否定词】');
        parts.push(negative);
    }

    const result = parts.join('\n\n');
    const output = document.getElementById('keywordOutput');
    output.value = result;
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
    } catch (e) {}
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

        return [
            '<div class="history-item" data-id="' + item.id + '">',
            '    <div class="time">🕐 ' + escapeHtml(item.time) + '</div>',
            '    <div class="content" data-full=\'' + dataFull + '\'>',
            '        ' + escapedContent,
            '    </div>',
            isLong ? '<button class="btn-expand" onclick="toggleHistoryExpand(this)">展开全部</button>' : '',
            '    <div class="item-actions">',
            '        <button class="btn btn-outline" onclick="copyHistoryContent(' + dataFull + ')">📋 复制</button>',
            '        <button class="btn btn-outline" onclick="loadHistory(' + item.id + ')">📥 载入</button>',
            '        <button class="btn btn-outline" onclick="deleteHistory(' + item.id + ')" style="color:#D44A4A;border-color:#f0d0d0;">🗑️ 删除</button>',
            '    </div>',
            '</div>'
        ].join('');
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

// ===================== 文生图 (Text-to-Image) =====================
function generateImage() {
    const prompt = document.getElementById('keywordOutput').value.trim();
    if (!prompt) {
        showToast('请先生成或输入提示词', 'error');
        return;
    }

    const model = document.getElementById('modelSelector').value;
    const displayArea = document.getElementById('imageDisplayArea');
    const placeholder = document.getElementById('imagePlaceholder');
    const dualDiv = document.getElementById('imageDual');
    const dualRef = document.getElementById('dualRef');
    const loadingDiv = document.getElementById('imageLoading');

    // Show loading
    placeholder.style.display = 'none';
    dualDiv.style.display = 'none';
    loadingDiv.style.display = 'flex';
    displayArea.classList.add('has-image');

    // Update model label
    document.getElementById('imageResultModel').textContent = model;

    // Hide generated result panel, only show reference image
    document.getElementById('dualGen').style.display = 'none';

    // Show reference image if selected
    if (selectedImageId) {
        const refImg = REFERENCE_IMAGES.find(i => i.id === selectedImageId);
        if (refImg && refImg.src) {
            dualRef.style.display = 'flex';
            document.getElementById('refDisplayImage').src = refImg.src;
        } else {
            dualRef.style.display = 'none';
        }
    } else {
        dualRef.style.display = 'none';
    }

    // Show the reference image immediately (生成结果已隐藏)
    loadingDiv.style.display = 'none';
    if (dualRef.style.display === 'flex') {
        dualDiv.style.display = 'flex';
    } else {
        showToast('请先通过「找灵感」选择参考图片', 'info');
        placeholder.style.display = 'flex';
        displayArea.classList.remove('has-image');
    }
}

// ===================== Download Image =====================
function downloadImage() {
    if (!generatedImageDataUrl) {
        showToast('没有可下载的图片', 'error');
        return;
    }
    const link = document.createElement('a');
    link.download = 'generated_prompt_image.png';
    link.href = generatedImageDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('✅ 图片已下载');
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
    priceInput.value = '最高立减15元';
}

generatePrompt();
renderHistory();

console.log('📋 批量提示词工具已加载 (优化版)');
console.log('💡 主要功能：找灵感 | 提取内容 | 文生图 | 历史记录');
